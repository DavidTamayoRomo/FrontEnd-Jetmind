import { Component, OnInit } from '@angular/core';
import { Peea17chuk } from '../peea17chuk.model';
import { BusquedasService } from '../../../services/busquedas.service';
import { Peea17chukService } from '../../services/peea17chuk.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit {

  public cargando:boolean=false;
  public peeas:any [] = [];
  public totalPeeas:number=0;
  public desde:number = 0;
  public peeas1:Peea17chuk [] = [];
  public peeasTemporales:Peea17chuk [] = [];

  constructor(
    private peea17chukService:Peea17chukService,
    private busquedaService:BusquedasService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cargarPeeas();
  }

  cargarPeeas(){
    this.cargando=true;
    this.peea17chukService.cargarPeea17chuk(this.desde).subscribe((resp:any)=>{
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
    return this.busquedaService.buscar2('peeasch17',busqueda,['nombre']).subscribe(
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
        this.peea17chukService.eliminarPeea17chuk(peea).subscribe(resp => {
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

  reporte(pea: any) {
    this.router.navigate(['/reporte-peea-17-ch-uk/', pea._id]);
    setTimeout(() => {
      this.router.navigate(['/listapeea-17-ch-uk']);
    }, 10);
  }

}
