import { Component, OnInit } from '@angular/core';
import { EntrevistaInicialCHUK } from '../entrevista-inicial-chuk.model';
import { EntrevistaInicialCHUKService } from '../../services/entrevista-inicial-chuk.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-entrevista-chuk',
  templateUrl: './lista-entrevista-chuk.component.html',
  styles: [
  ]
})
export class ListaEntrevistaCHUKComponent implements OnInit {

  public cargando: boolean = false;
  public entrevistasIniciales: any[] = [];
  public totalEntrevistas: number = 0;
  public desde: number = 0;
  public entrevistas1: EntrevistaInicialCHUK[] = [];
  public entrevistasTemporales: EntrevistaInicialCHUK[] = [];

  constructor(
    private entrevistaInicialService: EntrevistaInicialCHUKService,
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
      console.log(this.entrevistasIniciales);
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
    return this.busquedaService.buscar2('entrevistasch', busqueda, ['nombre']).subscribe(
      (resp: any) => {
        console.log(resp);
        this.entrevistasIniciales = resp;
        console.log(this.entrevistasIniciales);
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

  reporte(entrevistainicialchuk: any) {
    this.router.navigate(['/reporte-entrevistainicialchuk/', entrevistainicialchuk._id]);
    setTimeout(() => {
      this.router.navigate(['/listaentrevistainicialchuk']);
    }, 10); 
  }


}
