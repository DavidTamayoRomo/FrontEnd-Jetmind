import { Component, OnInit } from '@angular/core';

import { Peea18chuk } from '../peea18chuk.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { Peea18chukService } from '../../services/peea18chuk.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listapeea18chuk',
  templateUrl: './listapeea18chuk.component.html',
  styles: [
  ]
})
export class Listapeea18chukComponent implements OnInit {

  public cargando:boolean=false;
  public peeas:any [] = [];
  public totalPeeas:number=0;
  public desde:number = 0;
  public peeas1:Peea18chuk [] = [];
  public peeasTemporales:Peea18chuk [] = [];

  constructor(
    private peea18chukService:Peea18chukService,
    private busquedaService:BusquedasService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cargarPeeas();
  }

  cargarPeeas(){
    this.cargando=true;
    this.peea18chukService.cargarPeea18chuk(this.desde).subscribe((resp:any)=>{
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
    return this.busquedaService.buscar2('peeasch18',busqueda,['nombre']).subscribe(
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
        this.peea18chukService.eliminarPeea18chuk(peea).subscribe(resp => {
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

  reporte(pea: any) {
    this.router.navigate(['/reporte-peea-18-ch-uk/', pea._id]);
    setTimeout(() => {
      this.router.navigate(['/listapeea-18-ch-uk']);
    }, 10);
  }

}
