import { Component, OnInit } from '@angular/core';
import { SucursalService } from '../../services/sucursal.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';
import { Sucursal } from '../sucursal.model';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styles: [
  ]
})
export class SucursalesComponent implements OnInit {

  public cargando: boolean = false;
  public sucursales: any[] = [];
  public totalSucursales: number = 0;
  public desde: number = 0;
  public sucursales1: Sucursal[] = [];
  public sucursalesTemporales: Sucursal[] = [];

  constructor(
    private sucursalService: SucursalService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarSucursales();
  }

  cargarSucursales() {
    this.cargando = true;
    this.sucursalService.cargarSucursales()
      .subscribe( (resp: any) => {
        this.totalSucursales = resp.totalSucursales;
        this.sucursales = resp.data;
        this.sucursales1 = resp.data;
        this.sucursalesTemporales = resp.data;
        this.cargando = false;
      });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalSucursales) {
      this.desde -= valor;
    }
    this.cargarSucursales();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.sucursales = this.sucursalesTemporales;
    }
    return this.busquedaService.buscar('sucursales', busqueda).subscribe(
      (resp: any) => {
        this.sucursales = resp;
      }
    );
  }

  borrarSucursal(sucursal: any) {

    Swal.fire({
      title: 'Desea eliminar la sucursal ?',
      text: `Esta a punto de borrar a ${sucursal.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta sucursal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sucursalService.eliminarSucursal(sucursal).subscribe(resp => {
          this.cargarSucursales();
          Swal.fire(
            'Borrado!',
            `${sucursal.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });

      }
    })
  }





}
