import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Asistencia } from '../asistencia.model';
import { AsistenciaService } from '../../services/asistencia.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-lista-asistencia',
  templateUrl: './lista-asistencia.component.html',
  styles: [
  ]
})
export class ListaAsistenciaComponent implements OnInit {

  public cargando:boolean=false;
  public asistencias:any [] = [];
  public totalAsistencias:number=0;
  public desde:number = 0;
  public asistencias1:Asistencia [] = [];
  public asistenciasTemporales:Asistencia [] = [];

  constructor(
    private asistenciaService:AsistenciaService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarAsistencias();
  }

  cargarAsistencias(){
    this.cargando=true;
    this.asistenciaService.cargarAsistencias(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.asistencias = resp.data;
      this.asistencias1 = resp.data;
      this.asistenciasTemporales = resp.data;
      this.totalAsistencias = resp.totalAsistencias;
      console.log(resp.data)
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalAsistencias){
      this.desde -= valor;  
    }
    this.cargarAsistencias();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.asistencias = this.asistenciasTemporales;
    }
    return this.busquedaService.buscar2('asistencias',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.asistencias = resp;
      }
    );
  }


  borrarAsistencia(asistencia:any){
    
    Swal.fire({
      title: 'Desea eliminar la Asistencia ?',
      text: `Esta a punto de borrar a ${asistencia.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta Asistencia'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asistenciaService.eliminarAsistencia(asistencia).subscribe(resp => {
          this.cargarAsistencias();
          Swal.fire(
            'Borrado!',
            `${asistencia.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });
        
      }
    })
  }

}
