import { Component, OnInit } from '@angular/core';
import { CitaTelemarketing } from '../citaTelemarketing.model';
import { CitasTelemarketingService } from '../../services/citas-telemarketing.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styles: [
  ]
})
export class ListaCitasComponent implements OnInit {

  public cargando: boolean = false;
  public citas: any[] = [];
  public totalCitas: number = 0;
  public desde: number = 0;
  public citas1: CitaTelemarketing[] = [];
  public citasTemporales: CitaTelemarketing[] = [];
  public mostraModal: boolean = true;
  public atributostablaCita: any = {};
  public citaSeleccionado: any;

  constructor(
    private citasTelemarketingService: CitasTelemarketingService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarCitas();
  }

  cargarCitas() {
    this.cargando = true;
    this.citasTelemarketingService.cargarCitasTelemarketing(this.desde).subscribe((resp: any) => {
      console.log(resp);
      this.cargando = false;
      this.citas = resp.data;
      this.citas1 = resp.data;
      this.citasTemporales = resp.data;
      this.totalCitas = resp.totalCitas;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalCitas) {
      this.desde -= valor;
    }
    this.cargarCitas();
  }



  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.citas = this.citasTemporales;
    }
    return this.busquedaService.buscar2('citas', busqueda, ['nombreApellidoRepresentante']).subscribe(
      (resp: any) => {
        console.log(resp);
        this.citas = resp;
      }
    );
  }

  borrarCita(cita: any) {

    Swal.fire({
      title: 'Desea eliminar la cita ?',
      text: `Esta a punto de borrar a ${cita.nombreApellidoRepresentante}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta cita'
    }).then((result) => {
      if (result.isConfirmed) {
        this.citasTelemarketingService.eliminartelemarketing(cita).subscribe(resp => {
          this.cargarCitas();
          Swal.fire(
            'Borrado!',
            `${cita.nombreApellidoRepresentante} a sido eliminada con éxito.`,
            'success'
          )
        });
      }
    })
  }


  cerrarModal() {
    this.mostraModal = true;
  }

  mostrarDatosModal(cita: any) {
    this.mostraModal = false;
    this.citaSeleccionado = cita;

    //transformar fecha a formato dd/mm/yyyy HH:mm
    let fecha = new Date(cita.fechaCita);
    let fechacitaString;
    if (fecha.getMinutes()<10) {
      fechacitaString = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":0" + fecha.getMinutes();
    }else{
      fechacitaString = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    }
    



    this.atributostablaCita = {
      'nombreAtributos': ['Estado', 'Telemercadista', 'Fecha cita', 'Fomra', 'Asesor asignado'
        , 'Programa', 'Observaciones', 'Representante', 'Telefono', 'Ciudad', 'Actividad Economica', 'Tarjeta de credito',
        'Tarjeta', 'Direccion Cita', 'Sucursal', 'Zoom', 'Fecha', 'Observaciones Asesor', 'Correo', 'Codigo Lead'],

      'idAtributos': [cita?.estado, cita?.addedUser, fechacitaString, cita?.forma, cita?.asignado[0]?.nombresApellidos
        , cita?.idMarca?.map((resp: any) => resp.nombre), cita?.observaciones, cita?.nombreApellidoRepresentante, cita?.telefono, cita?.ciudad, cita?.actividadEconomica, cita?.tarjeraCredito
        , cita?.tarjeta, cita?.terreno, cita?.idSucursal[0]?.nombre, cita?.zoom, cita?.fecha, cita?.observacionesAsesor, cita?.email, cita?.codigoLead]
    };



  }

}
