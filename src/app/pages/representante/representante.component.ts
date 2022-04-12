import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Representante } from './representante.model';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
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
  @Input() executeEnter: any;
  @Output() sendFormData: EventEmitter<any> = new EventEmitter();
  @Output() validForm: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private representanteService: RepresentanteService,
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarRepresentantebyId(id);
      if (this.router.url == '/representante/nuevo' || this.router.url == `/representante/${id}`) {
        this.mostrarBoton = true;
      }
    });

    


    this.registerForm.statusChanges.subscribe((res) => {
      if (res === 'INVALID') {
        this.validForm.emit(false);
      } else {
        this.validForm.emit(true);
      }
    });
  }

  ngOnChanges(): void {
    if (this.executeNext) {
      this.sendFormData.emit(this.registerForm.value);
    }
    if (this.executeEnter) {
      this.validForm.emit(this.registerForm.valid);
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
    email: [null, [Validators.required, Validators.email]],
    cedula: [null, Validators.required, this.verificarCedula],
    telefono: [null, Validators.required],
    fechaNacimiento: [null, Validators.required],
    direccion: [null],
    genero: [null],
    estado: ['Espera'],
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
    this.router.navigateByUrl('/listarepresentantes');
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


  verificarCedula(control:AbstractControl) {
    const cedula = control.value;

    //Preguntamos si la cedula consta de 10 digitos
    if (cedula.length == 10) {

      //Obtenemos el digito de la region que sonlos dos primeros digitos
      var digito_region:any = cedula.substring(0, 2);

      //Pregunto si la region existe ecuador se divide en 24 regiones
      if (digito_region >= 1 && digito_region <= 24) {

        // Extraigo el ultimo digito
        var ultimo_digito = cedula.substring(9, 10);

        //Agrupo todos los pares y los sumo
        var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

        //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
        var numero1:any = cedula.substring(0, 1);
        numero1 = (numero1 * 2);
        if (numero1 > 9) { 
          numero1 = (numero1 - 9); 
        }

        var numero3:any = cedula.substring(2, 3);
        numero3 = (numero3 * 2);
        if (numero3 > 9) {  numero3 = (numero3 - 9); }

        var numero5:any = cedula.substring(4, 5);
         numero5 = (numero5 * 2);
        if (numero5 > 9) {  numero5 = (numero5 - 9); }

        var numero7:any = cedula.substring(6, 7);
         numero7 = (numero7 * 2);
        if (numero7 > 9) {  numero7 = (numero7 - 9); }

        var numero9:any = cedula.substring(8, 9);
         numero9 = (numero9 * 2);
        if (numero9 > 9) {  numero9 = (numero9 - 9); }

        var impares = numero1 + numero3 + numero5 + numero7 + numero9;

        //Suma total
        var suma_total = (pares + impares);

        //extraemos el primero digito
        var primer_digito_suma = String(suma_total).substring(0, 1);

        //Obtenemos la decena inmediata
        var decena = (parseInt(primer_digito_suma) + 1) * 10;

        //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
        var digito_validador:any = decena - suma_total;

        //Si el digito validador es = a 10 toma el valor de 0
        if (digito_validador == 10)
          digito_validador = 0;

        //Validamos que el digito validador sea igual al de la cedula
        if (digito_validador == ultimo_digito) {
          console.log('la cedula:' + cedula + ' es correcta');
          return true;
        } else {
          console.log('la cedula:' + cedula + ' es incorrecta');
          return false;
        }

      } else {
        // imprimimos en consola si la region no pertenece
        console.log('Esta cedula no pertenece a ninguna region');
        return false;
      }
    } else {
      //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
      console.log('Esta cedula tiene menos de 10 Digitos');
      return false;
    }
  }
}
