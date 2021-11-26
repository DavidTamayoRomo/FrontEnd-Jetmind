import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Representante } from './representante.model';
import { FormBuilder, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RepresentanteService } from '../services/representante.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-representante',
  templateUrl: './representante.component.html',
  styles: [],
})
export class RepresentanteComponent implements OnInit, OnChanges {
  public representanteSeleccionada: any;

  public mostrarBoton: boolean = false;

  RepresenteModel = new Representante();

  @Input() executeNext: any;
  @Output() sendFormData: EventEmitter<any> = new EventEmitter();
  @Output() sendFormValid: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private representanteService: RepresentanteService,
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarRepresentantebyId(id);
    });
    if (this.router.url == '/representante/nuevo') {
      this.mostrarBoton = true;
    }
    this.registerForm.valueChanges.subscribe((res) => {
      this.sendFormValid.emit(this.registerForm.valid);
    });
  }

  ngOnChanges() {
    if (this.executeNext) {
      this.sendFormData.emit(this.registerForm.value);
    }
  }

  LlenarForm(resp: any) {
    this.RepresenteModel = resp.data;
    const {
      nombresApellidos,
      email,
      cedula,
      telefono,
      fechaNacimiento,
      direccion,
      genero,
      estado,
      lugarTrabajo,
      numeroEmergencia,
      telefonoOficina,
      telefonoDomicilio,
    } = resp.data;

    this.registerForm.setValue({
      nombresApellidos,
      email,
      cedula,
      telefono,
      fechaNacimiento,
      direccion,
      genero,
      estado,
      lugarTrabajo,
      numeroEmergencia,
      telefonoOficina,
      telefonoDomicilio,
    });
  }

  public registerForm = this.fb.group({
    nombresApellidos: [null, Validators.required],
    email: [null, Validators.required],
    cedula: [null, Validators.required],
    telefono: [null, Validators.required],
    fechaNacimiento: [null, Validators.required],
    direccion: [null],
    genero: [null],
    estado: [null],
    lugarTrabajo: [null],
    numeroEmergencia: [null],
    telefonoOficina: [null],
    telefonoDomicilio: [null],
  });

  async cargarRepresentantebyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.representanteService
      .obtenerRepresentanteById(id)
      .subscribe((resp: any) => {
        this.representanteSeleccionada = resp.data;
        this.LlenarForm(resp);
      });
  }

  cancelarGuardado() {
    this.router.navigateByUrl('/listapersonas');
  }

  campoNoValido(campo: any): boolean {
    if (
      this.registerForm.get(campo)?.invalid &&
      (this.registerForm.get(campo)?.dirty ||
        this.registerForm.get(campo)?.touched)
    ) {
      return true;
    } else {
      return false;
    }
  }

  crearRepresentante() {
    if (this.representanteSeleccionada) {
      //actualizar
      this.RepresenteModel = this.registerForm.value;
      if (this.registerForm.invalid) {
        //Formulario invalido
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'error',
          title: 'Verificar campos invalidos \n Indicados con el color rojo',
        });
        return;
      } else {
        this.representanteService
          .updateRepresentante(
            this.representanteSeleccionada._id,
            this.RepresenteModel
          )
          .subscribe(
            (resp: any) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: 'success',
                title: 'Se actualizo correctamente',
              });
              this.router.navigateByUrl('/listarepresentantes');
            },
            (err: any) => {
              console.warn(err.error.message);

              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              //TODO: Mostrar error cuando es administrador. Dato que muestra el error completo=  err.error.message
              Toast.fire({
                icon: 'error',
                title:
                  'ERROR: ' +
                  err.error.statusCode +
                  '\nContactese con su proveedor de software ',
              });
            }
          );
      }
    } else {
      //crear
      if (this.registerForm.invalid) {
        console.log('Formulario invalido');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'error',
          title:
            '- Campos con asterisco son obligatorios\n - Verificar campos invalidos, \n indicados con el color rojo  ',
        });
        return;
      } else {
        this.representanteService
          .crearRepresentante(this.registerForm.value)
          .subscribe(
            (resp) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: 'success',
                title: 'Guardado correctamente',
              });

              this.router.navigateByUrl('/listarepresentantes');
            },
            (err: any) => {
              console.warn(err.error.message);

              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              //TODO: Mostrar error cuando es administrador. Dato que muestra el error completo=  err.error.message
              Toast.fire({
                icon: 'error',
                title:
                  'ERROR: ' +
                  err.error.statusCode +
                  '\nContactese con su proveedor de software ',
              });
            }
          );
      }
    }
  }
}
