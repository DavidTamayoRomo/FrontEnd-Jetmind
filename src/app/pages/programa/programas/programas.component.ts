import { Component, OnInit } from '@angular/core';
import { ProgramaService } from '../../services/programa.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';
import { Programa } from '../programa.model';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styles: [
  ]
})
export class ProgramasComponent implements OnInit {

  public cargando: boolean = false;
  public programas: any[] = [];
  public totalProgramas: number = 0;
  public desde: number = 0;
  public programas1: Programa[] = [];
  public programasTemporales: Programa[] = [];

  constructor(
    private programaService:ProgramaService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarPrograma();
  }

  cargarPrograma() {
    this.cargando = true;
    this.programaService.cargarPrograma(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.programas = resp.data;
      this.programas1 = resp.data;
      this.programasTemporales = resp.data;
      this.totalProgramas = resp.totalPrograma;
      console.log(resp.data);
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalProgramas) {
      this.desde -= valor;
    }
    this.cargarPrograma();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.programas = this.programasTemporales;
    }
    return this.busquedaService.buscar2('programas', busqueda,['nombre']).subscribe(
      (resp: any) => {
        this.programas = resp;
        console.log(this.programas);
      }
    );
  }

  borrarPrograma(programa: any) {

    Swal.fire({
      title: 'Desea eliminar la programa ?',
      text: `Esta a punto de borrar`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar este programa'
    }).then((result) => {
      if (result.isConfirmed) {
        this.programaService.eliminarPrograma(programa).subscribe(resp => {
          this.cargarPrograma();
          Swal.fire(
            'Borrado!',
            `Eliminada con éxito.`,
            'success'
          )
        });
      }
    })
  }


}
