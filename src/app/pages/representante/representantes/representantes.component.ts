import { Component, OnInit } from '@angular/core';
import { RepresentanteService } from '../../services/representante.service';
import { BusquedasService } from '../../../services/busquedas.service';

import Swal from 'sweetalert2';
import { Representante } from '../representante.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-representantes',
  templateUrl: './representantes.component.html',
  styles: [
  ]
})
export class RepresentantesComponent implements OnInit {

  public cargando: boolean = false;
  public representantes: any[] = [];
  public totalRepresentantes: number = 0;
  public desde: number = 0;
  public representantes1: Representante[] = [];
  public representantesTemporales: Representante[] = [];
  public mostraModal: boolean = true;
  public representanteSeleccionado: Representante;
  public atributostablaRepresentante: any = {};

  constructor(
    private representanteService: RepresentanteService,
    private busquedaService: BusquedasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarRepresentantes();
  }

  cargarRepresentantes() {
    this.cargando = true;
    this.representanteService.cargarRepresentantes(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.representantes = resp.data;
      this.representantes1 = resp.data;
      this.representantesTemporales = resp.data;
      this.totalRepresentantes = resp.totalRepresentantes;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalRepresentantes) {
      this.desde -= valor;
    }
    this.cargarRepresentantes();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.representantes = this.representantesTemporales;
    }
    return this.busquedaService.buscar2('representantes', busqueda,['nombresApellidos']).subscribe(
      (resp: any) => {
        this.representantes = resp;
      }
    );
  }

  borrarRepresentantes(representante: any) {
    this.cerrarModal();
    Swal.fire({
      title: 'Desea eliminar representante ?',
      text: `Esta a punto de borrar a ${representante.nombresApellidos}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta representante'
    }).then((result) => {
      if (result.isConfirmed) {
        this.representanteService.eliminarRepresentante(representante).subscribe(resp => {
          this.cargarRepresentantes();
          Swal.fire(
            'Borrado!',
            `${representante.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });
      }
    })
  }


  cerrarModal() {
    this.mostraModal = true;
  }

  editarRepresentante(){
    //navegar a editar contrato
    this.router.navigate(['/representante/', this.representanteSeleccionado._id]);
  }

  mostrarDatosModal(representante: any) {
    this.mostraModal = false;
    this.representanteSeleccionado = representante;

    this.atributostablaRepresentante = {
      'nombreAtributos': ['Estado', 'Nombres y Apellidos ', 'Email address', 'Cedula ', 'Telefono '
        , 'Telefono Domicilio', 'Tlf emergencia', 'Telefono de oficina', 'Direccion', 'Lugar de trabajo', 'Genero'],

      'idAtributos': [representante?.estado, representante?.nombresApellidos, representante?.email, representante?.cedula, representante?.telefono,
        representante?.telefonoDomicilio, representante?.numeroEmergencia, representante?.telefonoOficina, representante?.direccion, 
        representante?.lugarTrabajo, representante?.genero]
    };

  }

}
