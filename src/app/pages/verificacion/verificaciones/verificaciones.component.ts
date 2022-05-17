import { Component, OnInit } from '@angular/core';
import { Verificacion } from '../verificacion.model';
import { VerificacionService } from '../../services/verificacion.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verificaciones',
  templateUrl: './verificaciones.component.html',
  styles: [
  ]
})
export class VerificacionesComponent implements OnInit {

  public cargando:boolean=false;
  public verificaciones:any [] = [];
  public totalVerificaciones:number=0;
  public desde:number = 0;
  public verificaciones1:Verificacion [] = [];
  public verificacionesTemporales:Verificacion [] = [];

  constructor(
    private verificacionService:VerificacionService,
    private busquedaService:BusquedasService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cargarVerificaciones();
  }

  cargarVerificaciones(){
    this.cargando=true;
    this.verificacionService.cargarVerificaciones(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.verificaciones = resp.data;
      this.verificaciones1 = resp.data;
      this.verificacionesTemporales = resp.data;
      this.totalVerificaciones = resp.totalVerificaciones;
      console.log(resp.data);
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalVerificaciones){
      this.desde -= valor;  
    }
    this.cargarVerificaciones();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.verificaciones = this.verificacionesTemporales;
    }
    return this.busquedaService.buscar2('verificaciones',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.verificaciones = resp;
        console.log(this.verificaciones);
      }
    );
  }

  borrarVerificacion(verificacion:any){
    
    Swal.fire({
      title: 'Desea eliminar la verificacion ?',
      text: `Esta a punto de borrar `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta verificacion'
    }).then((result) => {
      if (result.isConfirmed) {
        this.verificacionService.eliminarVerificacion(verificacion).subscribe(resp => {
          this.cargarVerificaciones();
          Swal.fire(
            'Borrado!',
            `A sido eliminada con éxito.`,
            'success'
          )
        });
        
      }
    })
  }


  abrirVistaVerificacion(verificacion:any){
    this.router.navigate([`/verificacion/${verificacion._id}`]);
  }

  enviarAceptacion(verificacion:any){
    this.router.navigate([`/aceptacionverificacion/${verificacion._id}`]);
  }

}
