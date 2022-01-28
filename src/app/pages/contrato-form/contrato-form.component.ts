import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Contrato } from './contrato.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoService } from '../services/contrato.service';
import { formatDate } from '@angular/common'

import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

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

  public cambiarValor: any;

  //Valores de configuracion
  public configuracionPorcentaje: number = 1.15;
  public cuotaMinima: number = 75;

  public deuda: number = 0;
  public planCuotasMensuales: number;
  public mostrarCalculadora: boolean = false;
  
  public mostraModal: boolean = true;

  public mostraAbono: boolean = false;

  public abono: any = [];

  public editarAbono: boolean = false;
  public index1:any;


  @Input() executeNext: any;
  @Input() executeEnter: any;
  @Output() sendFormData: EventEmitter<any> = new EventEmitter();
  @Output() validForm: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('fechaAbono') fechaAbono: ElementRef;
  @ViewChild('valorAbono') valorAbono: ElementRef;



  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contratoService: ContratoService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarContratobyId(id);
      if (this.router.url == '/contrato1/nuevo' || this.router.url == `/contrato1/${id}`) {
        this.mostrarBoton = true;
      }
    });

    

    //llenar el campo fecha con la fecha actual
    const fecha = new Date();
    this.registerForm.get('fecha')?.setValue(formatDate(fecha, 'yyyy-MM-dd', 'en'));
    this.registerForm.get('fecha')?.disable();


  }

  ngOnChanges(): void {
    if (this.executeNext) {
      this.sendFormData.emit(this.registerForm.value);
    }
    if (this.executeEnter) {
      this.validForm.emit(this.registerForm.valid);
    }
    /* //detectar cambios en el formulario
    this.registerForm.valueChanges.subscribe(() => {
      console.log(this.registerForm.get('estadoVenta')?.value);
      if (this.registerForm.get('tipoPago')?.value == 'Plan') {
      }
      if (this.registerForm.get('tipoPago')?.value == 'Contado' && this.registerForm.get('estadoVenta')?.value == 'OK') {
        this.registerForm.get('valorMatricula')?.setValue("0");
      }
    }); */



  }
  habilitarCampos() {
    this.deuda = 0;

    if (this.registerForm.get('tipoPago')?.value == 'Contado' && this.registerForm.get('estadoVenta')?.value == 'OK') {
      this.registerForm.get('valorMatricula')?.setValue("0");
      //this.registerForm.get('abono')?.setValue("0");
      this.registerForm.get('numeroCuotas')?.setValue("0");
      this.registerForm.get('valorMatricula')?.disable();
      //this.registerForm.get('abono')?.disable();
      this.registerForm.get('numeroCuotas')?.disable();
      this.mostrarCalculadora = false;
      this.mostraAbono = false;
      this.abono = [];
    
    }
    if (this.registerForm.get('tipoPago')?.value == 'Contado' &&
      (this.registerForm.get('estadoVenta')?.value == 'Abono' || this.registerForm.get('estadoVenta')?.value == 'Saldo')) {
      this.registerForm.get('valorMatricula')?.setValue("0");
      this.registerForm.get('numeroCuotas')?.setValue("0");
      //this.registerForm.get('abono')?.setValue("0");
      this.registerForm.get('valorMatricula')?.disable();
      this.registerForm.get('numeroCuotas')?.disable();
      //this.registerForm.get('abono')?.enable();
      this.mostraAbono = true;
    }

    if (this.registerForm.get('tipoPago')?.value == 'Plan' && this.registerForm.get('estadoVenta')?.value == 'OK') {
      this.registerForm.get('valorMatricula')?.disable();
      this.registerForm.get('valorMatricula')?.setValue("0");
      this.registerForm.get('numeroCuotas')?.enable();
     // this.registerForm.get('abono')?.setValue("0");
     // this.registerForm.get('abono')?.disable();
      this.mostraAbono = false;
      this.abono = [];
    }

    if (this.registerForm.get('tipoPago')?.value == 'Plan' &&
      (this.registerForm.get('estadoVenta')?.value == 'Abono')) {
      //this.registerForm.get('abono')?.enable();
      this.registerForm.get('valorMatricula')?.enable();
      this.registerForm.get('numeroCuotas')?.enable();
      this.mostraAbono = true;
    }

    if (this.registerForm.get('tipoPago')?.value == 'Plan' &&
      (this.registerForm.get('estadoVenta')?.value == 'Saldo')) {

      this.registerForm.get('valorMatricula')?.enable();
      //this.registerForm.get('abono')?.disable();
      //this.registerForm.get('abono')?.setValue("0");
      this.registerForm.get('numeroCuotas')?.enable();
      this.mostraAbono = true;
    }

  }

  calculadora() {
    //calcular la deuda existente, deuda de contado y plan 
    if (this.registerForm.get('tipoPago')?.value == 'Contado') {
      setTimeout(() => {
        if (this.registerForm.get('estadoVenta')?.value != 'OK') {
          //TODO:cambiar abono
          let sumatoria = 0;
          this.abono.map((item:any) => {
            sumatoria += Number(item.monto);
          });
          /* this.deuda = this.registerForm.get('valorTotal')?.value - this.registerForm.get('abono')?.value; */
          this.deuda = this.registerForm.get('valorTotal')?.value - sumatoria;
          this.mostrarCalculadora = true;
        }

      }, 100);
    }
    if (this.registerForm.get('tipoPago')?.value == 'Plan') {
      setTimeout(() => {
        if (this.registerForm.get('numeroCuotas')?.value != 0) {
          let valorTotal = this.registerForm.get('valorTotal')?.value;
          let valorMatricula = this.registerForm.get('valorMatricula')?.value;
          let numeroCuotas = this.registerForm.get('numeroCuotas')?.value;


          //this.deuda = ((valorTotal - valorMatricula) * this.configuracionPorcentaje) / numeroCuotas;
          this.deuda = (( valorTotal  * this.configuracionPorcentaje) - valorMatricula) / numeroCuotas ;
          this.mostrarCalculadora = true;
          this.deuda = Math.round(this.deuda * 100) / 100;
          setTimeout(() => {
            if (this.deuda < 75) {
              Swal.fire(
                'La cuota minima es de $75',
                `La cuota actual es ${this.deuda}, por favor reduzca el numero de cuotas del contrato`,
                'warning'
              )
            }
          }, 100);

        }
      }, 100);
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
        //console.log(resp);
      });

  }

  LlenarForm(resp: any) {
    const {
      
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
    
    let abono2:any=[];
    abono.map((item: any) => {
        abono2.push({
          monto:item.monto,
          fechaPago:formatDate(item.fechaPago, 'yyyy-MM-dd', 'en-US'),
          estado:item.estado,
        })
    });
      
    this.abono=abono2;

    this.registerForm.setValue({
      
      fecha,
      estado,
      idRepresentante,
      tipoPago,
      estadoVenta,
      //abono:Number(abono[0].monto),
      valorMatricula,
      valorTotal,
      numeroCuotas,
      formaPago,
      comentario,
      directorAsignado,
      estadoPrograma,
      fechaAprobacion
    });
    this.habilitarCampos();
  }


  public registerForm = this.fb.group({
    fecha: [null],
    estado: ['Espera', Validators.required],
    idRepresentante: [null],
    tipoPago: [null, Validators.required],
    estadoVenta: [null, Validators.required],
    //abono: [0],
    valorMatricula: [0],
    valorTotal: [0, Validators.required],
    numeroCuotas: [0],
    formaPago: [null, Validators.required],
    comentario: [null],
    directorAsignado: [null],
    estadoPrograma: [null],
    fechaAprobacion: [null]
  });


  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  crearContrato() {

    if (this.contratoSeleccionado) {
      //actualizar
      console.log(this.contratoSeleccionado);
      
      this.ContratoModel = this.registerForm.value;

      let objetoAbono = {
        monto:"0",
        fechaPago:new Date(),
        estado:"Pagado"
      };
      let objetoAbono1 = [{
        monto:this.registerForm.value.abono,
        fechaPago:this.registerForm.value.fecha,
        estado:"Pagado"
      }];

      if (this.registerForm.value.abono == null) {  
        this.ContratoModel.abono?.push(objetoAbono);
      }else{
        this.ContratoModel.abono=this.abono;
      }
      if (this.registerForm.value.valorMatricula == null) {
        this.ContratoModel.valorMatricula = "0";
      }
      if (this.registerForm.value.numeroCuotas == null) {
        this.ContratoModel.numeroCuotas = "0";
      }
      this.ContratoModel.estado=this.registerForm.value.estado;
      console.log(this.registerForm.value.estado);
      console.log( this.ContratoModel.estado);
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
        setTimeout(() => {
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
        }, 100);


      }
    } else {
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
      } else {
        this.ContratoModel = this.registerForm.value;
        let objetoAbono = this.abono;
       /*  const objetoAbono2 = {
          fechaPago:new Date(),
          monto:this.registerForm.value.abono,
          estado:"Pagado"
        } */

        if (this.registerForm.value.tipoPago == "Plan" && this.registerForm.value.estadoVenta == "OK") {
          /* objetoAbono = {
            fechaPago:new Date(),
            monto:0,
            estado:"Pagado"
          } */
          objetoAbono = this.abono;
          this.ContratoModel.valorMatricula = "0";
          this.ContratoModel.abono = [];  
          //this.ContratoModel.abono.push(objetoAbono);
          this.ContratoModel.abono=objetoAbono;
        }
        if (this.registerForm.value.tipoPago == "Plan" && this.registerForm.value.estadoVenta == "Abono") {
          objetoAbono = this.abono;
          /* objetoAbono = {
            fechaPago:new Date(),
            monto:this.registerForm.value.abono,
            estado:"Pagado"
          } */
          this.ContratoModel.abono = []; 
          this.ContratoModel.abono=objetoAbono;
        }
        if (this.registerForm.value.tipoPago == "Plan" && this.registerForm.value.estadoVenta == "Saldo") {
          objetoAbono = this.abono;
          /* objetoAbono = {
            fechaPago:new Date(),
            monto:this.registerForm.value.valorMatricula,
            estado:"Pagado"
          } */
          this.ContratoModel.abono = [];
          this.ContratoModel.abono=objetoAbono;
        }
        if (this.registerForm.value.tipoPago == "Contado" && this.registerForm.value.estadoVenta == "OK") {
          objetoAbono = this.abono;
          /* objetoAbono = {
            fechaPago:new Date(),
            monto:0,
            estado:"Pagado"
          } */
          this.ContratoModel.valorMatricula = "0";
          this.ContratoModel.numeroCuotas= "0";
          this.ContratoModel.abono = [];  
          this.ContratoModel.abono=objetoAbono;
        }
        if (this.registerForm.value.tipoPago == "Contado" && this.registerForm.value.estadoVenta == "Abono") {
          objetoAbono = this.abono;
          /* objetoAbono = {
            fechaPago:new Date(),
            monto:this.registerForm.value.abono,
            estado:"Pagado"
          } */
          this.ContratoModel.valorMatricula = "0";
          this.ContratoModel.numeroCuotas= "0";
          this.ContratoModel.abono = []; 
          this.ContratoModel.abono=objetoAbono;
        }
        if (this.registerForm.value.tipoPago == "Contado" && this.registerForm.value.estadoVenta == "Saldo") {
          objetoAbono = this.abono;
          /* objetoAbono = {
            fechaPago:new Date(),
            monto:this.registerForm.value.abono,
            estado:"Pagado"
          } */
          this.ContratoModel.valorMatricula = "0";
          this.ContratoModel.numeroCuotas= "0";
          this.ContratoModel.abono = []; 
          this.ContratoModel.abono=objetoAbono;
        }
        
        this.ContratoModel.estadoPrograma = "Cliente no atendido";
        
        /*
        if (this.registerForm.value.abono == null) {
          this.ContratoModel.abono = [];  
          this.ContratoModel.abono.push(objetoAbono);
        }else{
          this.ContratoModel.abono = [];
          this.ContratoModel.abono.push(objetoAbono2);
        }
        if (this.registerForm.value.valorMatricula == null) {
          this.ContratoModel.valorMatricula = "0";
        }
        if (this.registerForm.value.numeroCuotas == null) {
          this.ContratoModel.numeroCuotas = "0";
        } */
        
        

        setTimeout(() => {
          console.log(this.ContratoModel);
          this.contratoService.crearContrato(this.ContratoModel).subscribe((resp) => {
            console.log(resp);
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
        }, 100);


      }

    }


  }

  cancelarGuardado() {
    this.router.navigateByUrl('/listamarcas')
  }


  abrirModal(){
    this.mostraModal = false;
  }

  cerrarModal() {
    this.mostraModal = true;
    this.editarAbono = false;
  }

  agregarAbono(){
    this.editarAbono = false;
    if (this.abono.length == 0) {
      this.abono.push(
        {
          fechaPago:this.fechaAbono.nativeElement.value,
          monto:this.valorAbono.nativeElement.value,
          estado:"Pagado",
        }
      );
    }else{
      this.abono.push(
        {
          fechaPago:this.fechaAbono.nativeElement.value,
          monto:this.valorAbono.nativeElement.value,
          estado:"No pagado",
        }
      );
    }
    localStorage.setItem(
      'contratoAbono',
      JSON.stringify(this.abono)
    );
    this.cerrarModal();
  }

  cargar(index:any){
    this.editarAbono = true;
    this.abrirModal();
    this.index1 = index;
    this.fechaAbono.nativeElement.value = this.abono[index].fechaPago;
    this.valorAbono.nativeElement.value = this.abono[index].monto;
  }

  eliminar(index:any){
    console.log(index);
    this.abono.splice(index, 1);
    this.calculadora();
  }

  editarAbono1(){
    this.abono[this.index1].fechaPago = this.fechaAbono.nativeElement.value;
    this.abono[this.index1].monto = this.valorAbono.nativeElement.value;
    this.calculadora();
    this.cerrarModal();
    localStorage.setItem(
      'contratoAbono',
      JSON.stringify(this.abono)
    );
  }



}
