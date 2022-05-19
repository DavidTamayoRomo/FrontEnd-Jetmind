import { Component, OnInit } from '@angular/core';
import { Peea18ilvemService } from '../../services/peea18ilvem.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Peea18ilvem } from '../peea18ilvem.model';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listapeea18ilvem',
  templateUrl: './listapeea18ilvem.component.html',
  styles: [
  ]
})
export class Listapeea18ilvemComponent implements OnInit {

  public cargando: boolean = false;
  public peeas: any[] = [];
  public totalPeeas: number = 0;
  public desde: number = 0;
  public peeas1: Peea18ilvem[] = [];
  public peeasTemporales: Peea18ilvem[] = [];

  constructor(
    private peea18ilvemService: Peea18ilvemService,
    private busquedaService: BusquedasService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.cargarPeeas();
  }

  cargarPeeas() {
    this.cargando = true;
    this.peea18ilvemService.cargarPeea18ilvem(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.peeas = resp.data;
      this.peeas1 = resp.data;
      this.peeasTemporales = resp.data;
      this.totalPeeas = resp.totalPeeas;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalPeeas) {
      this.desde -= valor;
    }
    this.cargarPeeas();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.peeas = this.peeasTemporales;
    }
    return this.busquedaService.buscar2('peeasil18', busqueda, ['nombre']).subscribe(
      (resp: any) => {
        console.log(resp);
        this.peeas = resp;
      }
    );
  }

  borrar(peea: any) {

    Swal.fire({
      title: 'Desea eliminar la peea ?',
      text: `Esta a punto de borrar a ${peea.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta peea'
    }).then((result) => {
      if (result.isConfirmed) {
        this.peea18ilvemService.eliminarPeea18ilvem(peea).subscribe(resp => {
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
    this.router.navigate(['/reporte-peea-18-ilvem/', pea._id]);
    setTimeout(() => {
      this.router.navigate(['/lista-peea-18-ilvem']);
    }, 10);
  }

}
