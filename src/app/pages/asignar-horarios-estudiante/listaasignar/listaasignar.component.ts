import { Component, OnInit } from '@angular/core';
import { AsignarHorarioEstudiante } from '../asignar-horarios-estudiante.model';
import { AsignarHorariosEstudianteService } from '../../services/asignar-horarios-estudiante.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-listaasignar',
  templateUrl: './listaasignar.component.html',
  styles: [
  ]
})
export class ListaasignarComponent implements OnInit {

  public cargando:boolean=false;
  public asignarHorariosEstudiantes:any [] = [];
  public totalAsignar:number=0;
  public desde:number = 0;
  public asignar1:AsignarHorarioEstudiante [] = [];
  public asignarTemporales:AsignarHorarioEstudiante [] = [];

  constructor(
    private asignarHorarioEstudianteService:AsignarHorariosEstudianteService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarAsignar();
  }

  cargarAsignar(){
    this.cargando=true;
    this.asignarHorarioEstudianteService.cargarAsignarHorariosEstudiantes(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.asignarHorariosEstudiantes = resp.data;
      this.asignar1 = resp.data;
      this.asignarTemporales = resp.data;
      this.totalAsignar = resp.totalAsignar;
      console.log(resp.data);
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalAsignar){
      this.desde -= valor;  
    }
    this.cargarAsignar();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.asignarHorariosEstudiantes = this.asignarTemporales;
    }
    return this.busquedaService.buscar2('asignarhorario',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.asignarHorariosEstudiantes = resp;
      }
    );
  }

  borrarAsignar(asignar:any){
    
    Swal.fire({
      title: 'Desea eliminar la asignar ?',
      text: `Esta a punto de borrar a ${asignar.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta asignar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignarHorarioEstudianteService.eliminarasignarhorarioestudiante(asignar).subscribe(resp => {
          this.cargarAsignar();
          Swal.fire(
            'Borrado!',
            `${asignar.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });
        
      }
    })
  }


  actualizarEstado(asignar:any){
    if (asignar.estado) {
      asignar.estado = false;
    }else{
      asignar.estado = true;
    }
    this.asignarHorarioEstudianteService.updateasignarhorarioestudiante(asignar._id,asignar).subscribe(resp=>{
      Swal.fire(
        'Actualizado!',
        `Asignar horario actualizado con éxito.`,
        'success'
      )
    });
  }

}
