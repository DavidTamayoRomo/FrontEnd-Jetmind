import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { EncuestaPadresService } from 'src/app/services/encuesta-padres.service';
import { EncuestaPadres } from '../encuesta-padres.model';

@Component({
  selector: 'app-lista-encuesta-padres',
  templateUrl: './lista-encuesta-padres.component.html',
  styles: [
  ]
})
export class ListaEncuestaPadresComponent implements OnInit {

  public cargando:boolean=false;
  public encuestas:any [] = [];
  public totalencuestas:number=0;
  public desde:number = 0;
  public encuestas1:EncuestaPadres [] = [];
  public encuestasTemporales:EncuestaPadres [] = [];

  constructor(
    private encuestaService:EncuestaPadresService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarEncuestas();
  }

  cargarEncuestas(){
    this.cargando=true;
    this.encuestaService.cargarEncuestas(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.encuestas = resp.data;
      this.encuestas1 = resp.data;
      this.encuestasTemporales = resp.data;
      this.totalencuestas = resp.totalencuestas;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalencuestas){
      this.desde -= valor;  
    }
    this.cargarEncuestas();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.encuestas = this.encuestasTemporales;
    }
    return this.busquedaService.buscar2('encuestapadres',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.encuestas = resp;
      }
    );
  }

  

}
