import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { Peea17ilvemService } from '../../services/peea17ilvem.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Peea17ilvem } from '../peea17ilvem.model';

@Component({
  selector: 'app-listapeea17ilvem',
  templateUrl: './listapeea17ilvem.component.html',
  styles: []
})
export class Listapeea17ilvemComponent implements OnInit {
  
  public cargando:boolean=false;
  public peeas:any [] = [];
  public totalPeeas:number=0;
  public desde:number = 0;
  public peeas1:Peea17ilvem [] = [];
  public peeasTemporales:Peea17ilvem [] = [];

  constructor(
    private peea17ilvemService:Peea17ilvemService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarPeeas();
  }


  cargarPeeas(){
    this.cargando=true;
    this.peea17ilvemService.cargarPeea17ilvem(this.desde).subscribe((resp:any)=>{
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
    return this.busquedaService.buscar2('peeas',busqueda,['nombre']).subscribe(
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
        this.peea17ilvemService.eliminarPeea17ilvem(peea).subscribe(resp => {
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



}
