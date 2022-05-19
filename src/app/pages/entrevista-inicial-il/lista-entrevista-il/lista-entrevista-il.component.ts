import { Component, OnInit } from '@angular/core';
import { EntrevistaInicialIL } from '../entrevista-inicial-il.model';
import { entrevistainicialilvemService } from '../../services/entrevista-inicial-il.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-entrevista-il',
  templateUrl: './lista-entrevista-il.component.html',
  styles: [
  ]
})
export class ListaEntrevistaILComponent implements OnInit {

  public cargando: boolean = false;
  public entrevistasIniciales: any[] = [];
  public totalEntrevistas: number = 0;
  public desde: number = 0;
  public entrevistas1: EntrevistaInicialIL[] = [];
  public entrevistasTemporales: EntrevistaInicialIL[] = [];

  constructor(
    private entrevistaInicialService: entrevistainicialilvemService,
    private busquedaService: BusquedasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarEntrevistas();
  }

  cargarEntrevistas() {
    this.cargando = true;
    this.entrevistaInicialService.cargarEntrevistas(this.desde).subscribe((resp: any) => {
      console.log(resp);
      this.cargando = false;
      this.entrevistasIniciales = resp.data;
      this.entrevistas1 = resp.data;
      this.entrevistasTemporales = resp.data;
      this.totalEntrevistas = resp.totalEntrevistas;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalEntrevistas) {
      this.desde -= valor;
    }
    this.cargarEntrevistas();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.entrevistasIniciales = this.entrevistasTemporales;
    }
    return this.busquedaService.buscar2('entrevistasil', busqueda, ['nombre']).subscribe(
      (resp: any) => {
        console.log(resp);
        this.entrevistasIniciales = resp;
      }
    );
  }

  borrar(entrevista: any) {

    Swal.fire({
      title: 'Desea eliminar la Entrevista ?',
      text: `Esta a punto de borrar `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entrevistaInicialService.eliminarEntrevista(entrevista).subscribe(resp => {
          this.cargarEntrevistas();
          Swal.fire(
            'Borrado!',
            `A sido eliminada con éxito.`,
            'success'
          )
        });

      }
    })
  }

  reporte(entrevistainicialchil: any) {
    this.router.navigate(['/reporte-entrevistainicialil/', entrevistainicialchil._id]);
    setTimeout(() => {
      this.router.navigate(['/listaentrevistainicialil']);
    }, 10);
  }

}
