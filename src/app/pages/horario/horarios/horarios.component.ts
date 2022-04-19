import { Component, OnInit } from '@angular/core';
import { BusquedasService } from '../../../services/busquedas.service';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../horario.model';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styles: [
  ]
})
export class HorariosComponent implements OnInit {

  public horarios:any [] = [];
  public totalHorarios:number=0;
  public desde:number = 0;
  public horarios1:Horario [] = [];
  public horariosTemporales:Horario [] = [];
  public imagen:any = [];
  public cargando:boolean=false;

  constructor(
    private busquedaService:BusquedasService,
    private horarioService:HorarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarHorarios();
    
  }

  

  cargarHorarios(){
    this.cargando=true;
    this.horarioService.cargarHorario(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.horarios = resp.data;
      this.horarios1 = resp.data;
      this.horariosTemporales = resp.data;
      this.totalHorarios = resp.totalHorarios;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalHorarios){
      this.desde -= valor;  
    }
    this.cargarHorarios();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.horarios = this.horariosTemporales;
    }
    return this.busquedaService.buscar2('horarios',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.horarios = resp;
      }
    );
  }


  borrarHorario(horario:any){
    
    Swal.fire({
      title: 'Desea eliminar la Horario ?',
      text: `Esta a punto de borrar a ${horario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta Horario'
    }).then((result) => {
      if (result.isConfirmed) {
        this.horarioService.eliminarHorario(horario).subscribe(resp => {
          this.cargarHorarios();
          Swal.fire(
            'Borrado!',
            `${horario.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });
        
      }
    })
  }


  actualizarEstado(horario:any){
    if (horario.estado) {
      horario.estado = false;
    }else{
      horario.estado = true;
    }
    this.horarioService.updateHorario(horario._id,horario).subscribe(resp=>{
      Swal.fire(
        'Actualizado!',
        `Horario actualizado con éxito.`,
        'success'
      )
    });
  }


}
