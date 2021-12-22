import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MarcaService } from '../../services/marca.service';
import { Marca } from '../marca.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styles: [
  ]
})
export class MarcasComponent implements OnInit {

  public cargando: boolean = false;
  public marcas: any[] = [];
  public totalMarcas: number = 0;
  public desde: number = 0;
  public marcas1: Marca[] = [];
  public marcasTemporales: Marca[] = [];

  constructor(
    private marcaService: MarcaService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.cargando = true;
    this.marcaService.cargarMarcas(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.marcas = resp.data;
      this.marcas1 = resp.data;
      this.marcasTemporales = resp.data;
      this.totalMarcas = resp.totalMarcas;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalMarcas) {
      this.desde -= valor;
    }
    this.cargarMarcas();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.marcas = this.marcasTemporales;
    }
    return this.busquedaService.buscar2('marcas', busqueda,['nombre']).subscribe(
      (resp: any) => {
        this.marcas = resp;
      }
    );
  }

  borrarMarca(marca: any) {

    Swal.fire({
      title: 'Desea eliminar la marca ?',
      text: `Esta a punto de borrar a ${marca.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta marca'
    }).then((result) => {
      if (result.isConfirmed) {
        this.marcaService.eliminarMarca(marca).subscribe(resp => {
          this.cargarMarcas();
          Swal.fire(
            'Borrado!',
            `${marca.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });

      }
    })
  }



}
