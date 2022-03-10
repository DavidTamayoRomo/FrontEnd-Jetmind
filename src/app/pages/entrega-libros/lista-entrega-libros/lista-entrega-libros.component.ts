import { Component, OnInit } from '@angular/core';
import { EntregaLibros } from '../entrega-libros.model';
import { EntregaLibrosService } from '../../services/entrega-libros.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-entrega-libros',
  templateUrl: './lista-entrega-libros.component.html',
  styles: [
  ]
})
export class ListaEntregaLibrosComponent implements OnInit {

  public cargando:boolean=false;
  public entregalibros:any [] = [];
  public totalEntregaLibros:number=0;
  public desde:number = 0;
  public entregalibros1:EntregaLibros [] = [];
  public entregalibrosTemporales:EntregaLibros [] = [];

  constructor(
    private entregaLibrosService:EntregaLibrosService,
    private busquedaService:BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarEntregaLibros();
  }

  cargarEntregaLibros(){
    this.cargando=true;
    this.entregaLibrosService.cargarEntregaLibros(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.entregalibros = resp.data;
      this.entregalibros1 = resp.data;
      this.entregalibrosTemporales = resp.data;
      this.totalEntregaLibros = resp.totalEntregaLibros;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalEntregaLibros){
      this.desde -= valor;  
    }
    this.cargarEntregaLibros();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.entregalibros = this.entregalibrosTemporales;
    }
    return this.busquedaService.buscar2('entregalibros',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.entregalibros = resp;
      }
    );
  }

  borrar(entregaLibro:any){
    
    Swal.fire({
      title: 'Desea eliminar ?',
      text: `Esta a punto de borrar`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entregaLibrosService.eliminarentregalibro(entregaLibro).subscribe(resp => {
          this.cargarEntregaLibros();
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
