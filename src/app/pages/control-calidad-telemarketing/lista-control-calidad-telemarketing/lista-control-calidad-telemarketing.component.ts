import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ControlCalidadTelemarketing } from '../control-calidad-telemarketing.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { ControlCalidadTelemarketingService } from '../../services/control-calidad-telemarketing.service';

@Component({
  selector: 'app-lista-control-calidad-telemarketing',
  templateUrl: './lista-control-calidad-telemarketing.component.html',
  styles: [
  ]
})
export class ListaControlCalidadTelemarketingComponent implements OnInit {

  public cargando:boolean=false;
  public listaControlCalidad:any [] = [];
  public totallistaControlCalidad:number=0;
  public desde:number = 0;
  public listaControlCalidad1:ControlCalidadTelemarketing [] = [];
  public listaControlCalidadTemporales:ControlCalidadTelemarketing [] = [];

  constructor(
    private controlCalidadTelemarketingService:ControlCalidadTelemarketingService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarlistaControlCalidad();
  }

  cargarlistaControlCalidad(){
    this.cargando=true;
    this.controlCalidadTelemarketingService.cargarcontrolCalidadTelemarketing(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.listaControlCalidad = resp.data;
      this.listaControlCalidad1 = resp.data;
      this.listaControlCalidadTemporales = resp.data;
      this.totallistaControlCalidad = resp.totallistaControlCalidad;
      console.log(this.listaControlCalidad);
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totallistaControlCalidad){
      this.desde -= valor;  
    }
    this.cargarlistaControlCalidad();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.listaControlCalidad = this.listaControlCalidadTemporales;
    }
    return this.busquedaService.buscar2('listaControlCalidad',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.listaControlCalidad = resp;
        console.log(this.listaControlCalidad);
      }
    );
  }


  borrarControlCalidad(controlcalidad:any){
    
    Swal.fire({
      title: 'Desea eliminar ?',
      text: `Esta a punto de borrar`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.controlCalidadTelemarketingService.eliminarcontrolCalidadTelemarketing(controlcalidad).subscribe(resp => {
          this.cargarlistaControlCalidad();
          Swal.fire(
            'Borrado!',
            `A sido eliminada con éxito.`,
            'success'
          )
        });
        
      }
    })
  }

}
