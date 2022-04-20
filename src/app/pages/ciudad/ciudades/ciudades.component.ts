import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { CiudadService } from '../../services/ciudad.service';
import { Ciudad } from '../ciudad.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styles: []
})
export class CiudadesComponent implements OnInit {

  public cargando:boolean=false;
  public ciudades:any [] = [];
  public totalCiudades:number=0;
  public desde:number = 0;
  public ciudades1:Ciudad [] = [];
  public ciudadesTemporales:Ciudad [] = [];

  constructor(
    private ciudadService:CiudadService,
    private busquedaService:BusquedasService
    ) { }

  ngOnInit(): void {
    this.cargarCiudades();
  }

  cargarCiudades(){
    this.cargando=true;
    this.ciudadService.cargarCiudades(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.ciudades = resp.data;
      this.ciudades1 = resp.data;
      this.ciudadesTemporales = resp.data;
      this.totalCiudades = resp.totalCiudades;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalCiudades){
      this.desde -= valor;  
    }
    this.cargarCiudades();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.ciudades = this.ciudadesTemporales;
    }
    return this.busquedaService.buscar2('ciudades',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.ciudades = resp;
      }
    );
  }


  borrarCiudad(ciudad:any){
    
    Swal.fire({
      title: 'Desea eliminar la ciudad ?',
      text: `Esta a punto de borrar a ${ciudad.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta ciudad'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ciudadService.eliminarCiudad(ciudad).subscribe(resp => {
          this.cargarCiudades();
          Swal.fire(
            'Borrado!',
            `${ciudad.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });
        
      }
    })
  }


  
  actualizarEstado(ciudad:any){
    if (ciudad.estado) {
      ciudad.estado = false;
    }else{
      ciudad.estado = true;
    }
    this.ciudadService.updateCiudad(ciudad._id,ciudad).subscribe(resp=>{
      Swal.fire(
        'Actualizado!',
        `Ciudad actualizada con éxito.`,
        'success'
      )
    });
  }

}
