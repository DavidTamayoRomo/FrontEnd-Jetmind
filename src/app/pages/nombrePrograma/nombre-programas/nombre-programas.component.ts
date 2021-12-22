import { Component, OnInit } from '@angular/core';
import { NombreProgramaService } from '../../services/nombre-programa.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { NombrePrograma } from '../../nombre-programa/nombre-programa.model';

@Component({
  selector: 'app-nombre-programas',
  templateUrl: './nombre-programas.component.html',
  styles: [
  ]
})
export class NombreProgramasComponent implements OnInit {


  public cargando: boolean = false;
  public nombreProgramas: any[] = [];
  public totalnombreProgramas: number = 0;
  public desde: number = 0;
  public nombreProgramas1: NombrePrograma[] = [];
  public nombreProgramasTemporales: NombrePrograma[] = [];

  constructor(
    private nombreProgramaService: NombreProgramaService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarnombreProgramas();
  }

  cargarnombreProgramas() {
    this.cargando = true;
    this.nombreProgramaService.cargarnombrePrograma(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.nombreProgramas = resp.data;
      this.nombreProgramas1 = resp.data;
      this.nombreProgramasTemporales = resp.data;
      this.totalnombreProgramas = resp.totalnombreProgramas;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalnombreProgramas) {
      this.desde -= valor;
    }
    this.cargarnombreProgramas();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.nombreProgramas = this.nombreProgramasTemporales;
    }
    return this.busquedaService.buscar2('nombreProgramas', busqueda,['nombre']).subscribe(
      (resp: any) => {
        this.nombreProgramas = resp;
      }
    );
  }

  borrarNombrePrograma(nombrePrograma: any) {

    Swal.fire({
      title: 'Desea eliminar la nombrePrograma ?',
      text: `Esta a punto de borrar a ${nombrePrograma.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta nombrePrograma'
    }).then((result) => {
      if (result.isConfirmed) {
        this.nombreProgramaService.eliminarnombrePrograma(nombrePrograma).subscribe(resp => {
          this.cargarnombreProgramas();
          Swal.fire(
            'Borrado!',
            `${nombrePrograma.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });

      }
    })
  }

}
