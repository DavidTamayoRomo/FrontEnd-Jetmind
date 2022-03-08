import { Component, OnInit } from '@angular/core';
import { Campania } from '../campania.model';
import { CampaniaService } from '../../services/campania.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-campania',
  templateUrl: './lista-campania.component.html',
  styles: [
  ]
})
export class ListaCampaniaComponent implements OnInit {

  public cargando:boolean=false;
  public campanias:any [] = [];
  public totalCampanias:number=0;
  public desde:number = 0;
  public campanias1:Campania [] = [];
  public campaniasTemporales:Campania [] = [];

  constructor(
    private campaniaService:CampaniaService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarCampanias();
  }


  cargarCampanias(){
    this.cargando=true;
    this.campaniaService.cargarCampanias(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.campanias = resp.data;
      this.campanias1 = resp.data;
      this.campaniasTemporales = resp.data;
      this.totalCampanias = resp.totalCampanias;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalCampanias){
      this.desde -= valor;  
    }
    this.cargarCampanias();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.campanias = this.campaniasTemporales;
    }
    return this.busquedaService.buscar2('campanias',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.campanias = resp;
      }
    );
  }

  borrarCampania(campanias:any){
    
    Swal.fire({
      title: 'Desea eliminar ?',
      text: `Esta a punto de borrar`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.campaniaService.eliminarcampania(campanias).subscribe(resp => {
          this.cargarCampanias();
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
