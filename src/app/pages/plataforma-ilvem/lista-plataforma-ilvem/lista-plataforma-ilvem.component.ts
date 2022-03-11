import { Component, OnInit } from '@angular/core';
import { PlataformaIlvem } from '../plataforma-ilvem.model';
import { PlataformaIlvemService } from '../../services/plataforma-ilvem.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-plataforma-ilvem',
  templateUrl: './lista-plataforma-ilvem.component.html',
  styles: [
  ]
})
export class ListaPlataformaIlvemComponent implements OnInit {

  public cargando: boolean = false;
  public plataformaIlvems: any[] = [];
  public totalplataformaIlvems: number = 0;
  public desde: number = 0;
  public plataformaIlvems1: PlataformaIlvem[] = [];
  public plataformaIlvemsTemporales: PlataformaIlvem[] = [];

  constructor(
    private plataformaIlvemService: PlataformaIlvemService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarPlataformaIlvem();
  }

  cargarPlataformaIlvem() {
    this.cargando = true;
    this.plataformaIlvemService.cargarPlataformaIlvems(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.plataformaIlvems = resp.data;
      this.plataformaIlvems1 = resp.data;
      this.plataformaIlvemsTemporales = resp.data;
      this.totalplataformaIlvems = resp.totalplataformaIlvems;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalplataformaIlvems) {
      this.desde -= valor;
    }
    this.cargarPlataformaIlvem();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.plataformaIlvems = this.plataformaIlvemsTemporales;
    }
    return this.busquedaService.buscar2('plataformaIlvems', busqueda, ['nombre']).subscribe(
      (resp: any) => {
        console.log(resp);
        this.plataformaIlvems = resp;
      }
    );

  }

  borrar(plataformaIlvem:any){
    
    Swal.fire({
      title: 'Desea eliminar la ciudad ?',
      text: `Esta a punto de borrar`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta ciudad'
    }).then((result) => {
      if (result.isConfirmed) {
        this.plataformaIlvemService.eliminarPlataformaIlvem(plataformaIlvem).subscribe(resp => {
          this.cargarPlataformaIlvem();
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
