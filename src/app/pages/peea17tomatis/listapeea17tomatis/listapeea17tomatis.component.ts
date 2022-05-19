import { Component, OnInit } from '@angular/core';
import { Peea17tomatisService } from '../../services/peea17tomatis.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';
import { Peea17tomatis } from '../peea17tomatis.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listapeea17tomatis',
  templateUrl: './listapeea17tomatis.component.html',
  styles: [
  ]
})
export class Listapeea17tomatisComponent implements OnInit {

  public cargando:boolean=false;
  public peeas:any [] = [];
  public totalPeeas:number=0;
  public desde:number = 0;
  public peeas1:Peea17tomatis [] = [];
  public peeasTemporales:Peea17tomatis [] = [];

  constructor(
    private peea17tomatisService:Peea17tomatisService,
    private busquedaService:BusquedasService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cargarPeeas();
  }

  cargarPeeas(){
    this.cargando=true;
    this.peea17tomatisService.cargarPeea17tomatis(this.desde).subscribe((resp:any)=>{
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
    return this.busquedaService.buscar2('peeas17tm',busqueda,['nombre']).subscribe(
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
        this.peea17tomatisService.eliminarPeea17tomatis(peea).subscribe(resp => {
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
    this.router.navigate(['/reporte-peea-17-toamtis/',pea._id]);
    setTimeout(() => {
      this.router.navigate(['/lista-peea-17-tomatis']);
    }, 10);
  }

}
