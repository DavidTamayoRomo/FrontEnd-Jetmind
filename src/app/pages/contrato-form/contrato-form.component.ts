import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contrato } from './contrato.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoService } from '../services/contrato.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-contrato-form',
  templateUrl: './contrato-form.component.html',
  styles: [
  ]
})
export class ContratoFormComponent implements OnInit, OnChanges {

  public mostrarBoton: boolean = false;

  public contratoSeleccionado: any;
  ContratoModel = new Contrato();


  @Input() executeNext: any;
  @Input() executeEnter: any;
  @Output() sendFormData: EventEmitter<any> = new EventEmitter();
  @Output() validForm: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contratoService: ContratoService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarContratobyId(id);
    });

    if (this.router.url == '/contrato1/nuevo') {
      this.mostrarBoton = true;
    }
  }

  ngOnChanges(): void {
    if (this.executeNext) {
      this.sendFormData.emit(this.registerForm.value);
    }
    if (this.executeEnter) {
      this.validForm.emit(this.registerForm.valid);
    }
  }

  async cargarContratobyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.contratoService.obtenerContratoById(id)
      .subscribe((resp: any) => {
        this.contratoSeleccionado = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp: any) {
    const {
      _id,
      fecha,
      estado,
      idRepresentante,
      tipoPago,
      estadoVenta,
      abono,
      valorMatricula,
      valorTotal,
      numeroCuotas,
      formaPago,
      comentario,
      directorAsignado,
      estadoPrograma,
      fechaAprobacion
    } = resp.data;
    this.contratoSeleccionado = resp.data;
    this.registerForm.setValue({
      _id,
      fecha,
      estado,
      idRepresentante,
      tipoPago,
      estadoVenta,
      abono,
      valorMatricula,
      valorTotal,
      numeroCuotas,
      formaPago,
      comentario,
      directorAsignado,
      estadoPrograma,
      fechaAprobacion
    });
  }


  public registerForm = this.fb.group({
    fecha:[null, Validators.required],
    estado:['Activo'],
    idRepresentante:[null],
    tipoPago:[null],
    estadoVenta:[null],
    abono:[null],
    valorMatricula:[null],
    valorTotal:[null],
    numeroCuotas:[null],
    formaPago:[null],
    comentario:[null],
    directorAsignado:[null],
    estadoPrograma:[null],
    fechaAprobacion:[null]
  });


  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid  && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  crearContrato(){

    if (this.contratoSeleccionado) {
      //actualizar
      this.ContratoModel = this.registerForm.value;
      if (this.registerForm.invalid) {
        //Formulario invalido
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: 'Verificar campos invalidos \n Indicados con el color rojo'
        })
        return;
      } else {
        
        this.contratoService.updatecontrato(this.contratoSeleccionado._id, this.ContratoModel).subscribe((resp: any) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Se actualizo correctamente'
          })
          this.router.navigateByUrl('/listacontratos');
        }, (err: any) => {

          console.warn(err.error.message);

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          //TODO: Mostrar error cuando es administrador. Dato que muestra el error completo=  err.error.message
          Toast.fire({
            icon: 'error',
            title: 'ERROR: ' + err.error.statusCode + '\nContactese con su proveedor de software '
          })
        });
      }
    }else{
      //crear
      if (this.registerForm.invalid) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: '- Campos con asterisco son obligatorios\n - Verificar campos invalidos, \n indicados con el color rojo  '
        })
        return;
      }else{
        this.contratoService.crearContrato(this.registerForm.value).subscribe((resp) => {
          
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Guardado correctamente'
          })

          this.router.navigateByUrl('/listacontratos');
        }, (err: any) => {

          console.warn(err.error.message);

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          //TODO: Mostrar error cuando es administrador. Dato que muestra el error completo=  err.error.message
          Toast.fire({
            icon: 'error',
            title: 'ERROR: ' + err.error.statusCode + '\nContactese con su proveedor de software '
          })
        });
      }
      
    }

    
  }

  cancelarGuardado(){
    this.router.navigateByUrl('/listamarcas')
  }


}
