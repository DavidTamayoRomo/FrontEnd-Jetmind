import { Component, OnInit } from '@angular/core';
import { RegistroLlamadasService } from '../../services/registro-llamadas.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';
import { RegistroLlamadas } from '../registro-llamadas.model';

@Component({
  selector: 'app-lista-registro-llamadas',
  templateUrl: './lista-registro-llamadas.component.html',
  styles: [
  ]
})
export class ListaRegistroLlamadasComponent implements OnInit {

  public cargando:boolean=false;
  public resgistros:any [] = [];
  public totalResgistros:number=0;
  public desde:number = 0;
  public resgistros1:RegistroLlamadas [] = [];
  public resgistrosTemporales:RegistroLlamadas [] = [];

  constructor(
    private registroService:RegistroLlamadasService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarResgistros();
  }

  cargarResgistros(){
    this.cargando=true;
    this.registroService.cargarregistros(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.resgistros = resp.data;
      this.resgistros1 = resp.data;
      this.resgistrosTemporales = resp.data;
      this.totalResgistros = resp.totalResgistros;
      console.log(resp.data);
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalResgistros){
      this.desde -= valor;  
    }
    this.cargarResgistros();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.resgistros = this.resgistrosTemporales;
    }
    return this.busquedaService.buscar2('resgistros',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.resgistros = resp;
      }
    );
  }

  borrar(registro:any){
    
    Swal.fire({
      title: 'Desea eliminar la ciudad ?',
      text: `Esta a punto de borrar`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.registroService.eliminarregistro(registro).subscribe(resp => {
          this.cargarResgistros();
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
