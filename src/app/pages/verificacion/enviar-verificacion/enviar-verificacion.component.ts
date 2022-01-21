import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { VerificacionService } from '../../services/verificacion.service';
import { ContratoService } from '../../services/contrato.service';
import { RepresentanteService } from '../../services/representante.service';
import { EstudianteService } from '../../services/estudiante.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-enviar-verificacion',
  templateUrl: './enviar-verificacion.component.html',
  styles: [
  ]
})
export class EnviarVerificacionComponent implements OnInit {

  verificacionesSeleccionadas: any;
  estudiantes: any;
  repesentante: any;
  contrato: any;
  indexG: number;
  public totalPagado: any;
  public totalDeuda: any;

  public mostraModal: boolean = true;

  @ViewChild('numeroComprobante') numeroComprobante: ElementRef;
  @ViewChild('estado') estado: ElementRef;
  @ViewChild('fechaPago') fechaPago: ElementRef;

  constructor(
    private verificacionService: VerificacionService,
    private contratoService: ContratoService,
    private representanteService: RepresentanteService,
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarVerificacionbyId(id);
    });


  }

  cargarVerificacionbyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.verificacionService.obtenerVerificacionById(id)
      .subscribe((resp: any) => {
        if (resp.data.estado == "Pendiente") {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 10000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'info',
            title: 'Formulario para aceptar el valor economico acordado para el presente contrato'
          })
        }
        this.verificacionesSeleccionadas = resp.data;
        console.log(resp.data);
        let pagado = 0;
        let deuda = 0;
        resp.data.cobranza.map((item: any) => {
          console.log(item);
          if (item.estado == "Pagado") {

            pagado += (Number(item.valor));
          }
          if (item.estado == "No pagado") {
            deuda += (Number(item.valor));
          }

        });
        this.totalPagado = pagado;
        this.totalDeuda = deuda.toFixed(2);
        this.representanteService.obtenerRepresentanteById(this.verificacionesSeleccionadas.idContrato[0].idRepresentante)
          .subscribe((resp: any) => {
            console.log(resp.data);
            this.repesentante = resp.data;

          });
      });

  }

  cerrarModal() {
    this.mostraModal = true;

  }

  abrirModalEsatdoPago(index: any) {
    this.mostraModal = false;
    this.indexG = index;

  }

  agregarEstado() {
    this.verificacionesSeleccionadas.cobranza[this.indexG].numeroComprobante = this.numeroComprobante.nativeElement.value;
    this.verificacionesSeleccionadas.cobranza[this.indexG].estado = this.estado.nativeElement.value;
    this.verificacionesSeleccionadas.cobranza[this.indexG].fechaPago = this.fechaPago.nativeElement.value;
    this.verificacionService.updateVerificacion(this.verificacionesSeleccionadas._id, this.verificacionesSeleccionadas).subscribe((resp: any) => {
      this.cerrarModal();
      this.cargarVerificacionbyId(this.verificacionesSeleccionadas._id);
    }
    );
  }

  aceptarVerificacion() {
    Swal.fire({
      title: 'Presione aceptar para confirmar la verificacion',
      icon: 'info',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Rechazar`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Verificacion Aceptada', '', 'success');
        this.verificacionesSeleccionadas.estado = "Aprobado";
        this.verificacionService.updateVerificacion(this.verificacionesSeleccionadas._id, this.verificacionesSeleccionadas).subscribe((resp: any) => {
          this.cargarVerificacionbyId(this.verificacionesSeleccionadas._id);
        }
        );

      } else if (result.isDenied) {
        Swal.fire('Verificacion Rechazado', '', 'error');
        this.verificacionesSeleccionadas.estado = "Rechazado";
        this.verificacionService.updateVerificacion(this.verificacionesSeleccionadas._id, this.verificacionesSeleccionadas).subscribe((resp: any) => {
          this.cargarVerificacionbyId(this.verificacionesSeleccionadas._id);
        }
        );
      }
    })


  }

}
