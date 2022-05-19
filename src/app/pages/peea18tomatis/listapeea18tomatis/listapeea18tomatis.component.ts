import { Component, OnInit } from '@angular/core';
import { Peea18tomatisService } from '../../services/peea18tomatis.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Peea18tomatis } from '../peea18tomatis.model';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listapeea18tomatis',
  templateUrl: './listapeea18tomatis.component.html',
  styles: [
  ]
})
export class Listapeea18tomatisComponent implements OnInit {

  public cargando:boolean=false;
  public peeas:any [] = [];
  public totalPeeas:number=0;
  public desde:number = 0;
  public peeas1:Peea18tomatis [] = [];
  public peeasTemporales:Peea18tomatis [] = [];

  constructor(
    private peea18tomatisService:Peea18tomatisService,
    private busquedaService:BusquedasService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cargarPeeas();
  }

  cargarPeeas(){
    this.cargando=true;
    this.peea18tomatisService.cargarPeea18tomatis(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.peeas = resp.data;
      this.peeas1 = resp.data;
      this.peeasTemporales = resp.data;
      this.totalPeeas = resp.totalPeeas;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalPeeas){
      this.desde -= valor;  
    }
    this.cargarPeeas();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.peeas = this.peeasTemporales;
    }
    return this.busquedaService.buscar2('peeastm18',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.peeas = resp;
      }
    );
  }

  borrar(peea:any){
    
    Swal.fire({
      title: 'Desea eliminar la peea ?',
      text: `Esta a punto de borrar a ${peea.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta peea'
    }).then((result) => {
      if (result.isConfirmed) {
        this.peea18tomatisService.eliminarPeea18tomatis(peea).subscribe(resp => {
          this.cargarPeeas();
          Swal.fire(
            'Borrado!',
            `${peea.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });
        
      }
    })
  }

  reporte(pea:any){
    this.router.navigate(['/reporte-peea-18-toamtis/',pea._id]);
    setTimeout(() => {
      this.router.navigate(['/lista-peea-18-tomatis']);
    }, 10);
  }

}
