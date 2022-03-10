import { Component, OnInit } from '@angular/core';
import { PlataformaCharlotteService } from '../../services/plataforma-charlotte.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';
import { PlataformaCharlotte } from '../plataforma-charlotte.model';

@Component({
  selector: 'app-lista-plataforma-charlotte',
  templateUrl: './lista-plataforma-charlotte.component.html',
  styles: [
  ]
})
export class ListaPlataformaCharlotteComponent implements OnInit {

  public cargando: boolean = false;
  public plataformaCharlottes: any[] = [];
  public totalPlataformaCharlottes: number = 0;
  public desde: number = 0;
  public plataformaCharlottes1: PlataformaCharlotte[] = [];
  public plataformaCharlottesTemporales: PlataformaCharlotte[] = [];

  constructor(
    private plataformaCharlotteService: PlataformaCharlotteService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarPlataformaCharlotte();
  }

  cargarPlataformaCharlotte() {
    this.cargando = true;
    this.plataformaCharlotteService.cargarPlataformaCharlottes(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.plataformaCharlottes = resp.data;
      this.plataformaCharlottes1 = resp.data;
      this.plataformaCharlottesTemporales = resp.data;
      this.totalPlataformaCharlottes = resp.totalplataformaCharlottes;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalPlataformaCharlottes) {
      this.desde -= valor;
    }
    this.cargarPlataformaCharlotte();
  }


  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.plataformaCharlottes = this.plataformaCharlottesTemporales;
    }
    return this.busquedaService.buscar2('plataformaCharlottes', busqueda, ['nombre']).subscribe(
      (resp: any) => {
        console.log(resp);
        this.plataformaCharlottes = resp;
      }
    );

  }

  borrar(plataformaCharlotte:any){
    
    Swal.fire({
      title: 'Desea eliminar la ciudad ?',
      text: `Esta a punto de borrar`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta ciudad'
    }).then((result) => {
      if (result.isConfirmed) {
        this.plataformaCharlotteService.eliminarplataformaCharlotte(plataformaCharlotte).subscribe(resp => {
          this.cargarPlataformaCharlotte();
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
