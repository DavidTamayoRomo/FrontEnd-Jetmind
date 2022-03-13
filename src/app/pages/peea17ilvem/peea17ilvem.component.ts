import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Peea17ilvem } from './peea17ilvem.model';
import { Peea17ilvemService } from '../services/peea17ilvem.service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-peea17ilvem',
  templateUrl: './peea17ilvem.component.html',
  styles: [
  ]
})
export class Peea17ilvemComponent implements OnInit {

  public peeas: any = [];

  public mostraModal: boolean = true;

  public pea17ilvemSeleccionada: any;

  Peea17ilvemModel = new Peea17ilvem();

  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('edad') edad: ElementRef;
  @ViewChild('ocupacion') ocupacion: ElementRef;
  @ViewChild('parentesco') parentesco: ElementRef;

  @ViewChild('supletorios') supletorios: ElementRef;
  @ViewChild('Planificado') planificado: ElementRef;
  @ViewChild('embarazo') embarazo: ElementRef;
  @ViewChild('Complicaciones') Complicaciones: ElementRef;
  @ViewChild('incubadora') incubadora: ElementRef;
  @ViewChild('Lactancia') Lactancia: ElementRef;
  @ViewChild('Succion') Succion: ElementRef;
  @ViewChild('Enfermedades') Enfermedades: ElementRef;
  @ViewChild('Separaciones') Separaciones: ElementRef;
  @ViewChild('Gateo') Gateo: ElementRef;
  @ViewChild('Camino') Camino: ElementRef;
  @ViewChild('palabras') palabras: ElementRef;
  @ViewChild('esfínteres') esfínteres: ElementRef;
  @ViewChild('medicamento') medicamento: ElementRef;
  @ViewChild('condicionMedica') condicionMedica: ElementRef;
  @ViewChild('Cirugias') Cirugias: ElementRef;
  @ViewChild('terapia') terapia: ElementRef;
  @ViewChild('actualmenteterapia') actualmenteterapia: ElementRef;

  constructor(
    private fb: FormBuilder,
    private peea17ilvemService:Peea17ilvemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id, idContrato }) => {
      this.cargaPeea17byId(id);
    });
  }

  async cargaPeea17byId(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.peea17ilvemService.obtenerPeea17ilvemById(id)
      .subscribe((resp: any) => {
        this.pea17ilvemSeleccionada = resp.data;
        console.log(this.pea17ilvemSeleccionada);
        //this.peeas = this.pea17ilvemSeleccionada.pregunta5;
        this.LlenarForm(resp);
      });
  }

  public registerForm = this.fb.group({
    idContrato: ['61fade25d11067056865a81f'],
    fecha: [new Date()],
    pregunta1: [''],
    pregunta2: [''],
    pregunta3: [''],
    pregunta4: [''],
    pregunta5: [''],
    pregunta6: [''],
    pregunta7: [''],
    pregunta8: [null],
    pregunta9: [null],
    pregunta10: [""],
    pregunta11: [null],
    pregunta12: [''],
    pregunta13: [''],
    pregunta14: [''],
    pregunta15: [''],
    pregunta16: [''],
    pregunta17: [''],
    pregunta18: [''],
    pregunta19: [''],
    pregunta20: [''],
    pregunta21: [''],
    //pregunta22: [''],
    pregunta23: [''],
    pregunta24: [''],
    pregunta25: [''],
    pregunta26: [''],
    pregunta27: [''],
    pregunta28: [''],
    pregunta29: [''],
    pregunta30: [''],
    pregunta31: [''],
    pregunta32: [''],
    pregunta33: [''],
    pregunta34: [''],
    pregunta35: [''],
    pregunta36: [''],
    pregunta37: [''],
    pregunta38: [''],
    pregunta39: [''],
    pregunta40: [''],
    pregunta41: [''],
    pregunta42: [''],
    pregunta43: [''],
    pregunta44: [''],
    pregunta45: [''],
    pregunta46: [''],
    pregunta47: [''],
    pregunta48: [''],
    pregunta49: [''],
    pregunta50: [''],
    pregunta51: [''],
    pregunta52: [''],
    pregunta53: [''],
    /* pregunta54: [''], */
    pregunta55: [''],
    pregunta56: [''],
    pregunta57: [''],
    pregunta58: [''],
    pregunta59: [''],
    pregunta60: [''],
    pregunta61: [''],
    pregunta62: [''],
    pregunta63: [''],
    pregunta64: [''],
    pregunta65: [''],
    pregunta66: [''],
    pregunta67: [''],
    pregunta68: [''],
    pregunta69: [''],
    pregunta70: [''],
    pregunta71: [''],
    pregunta72: [''],
    pregunta74: [''],
    pregunta75: [''],
    pregunta76: [''],
    pregunta77: [''],
    pregunta78: [''],
    pregunta79: [''],
    
  });


  LlenarForm(resp: any) {
    const {
      idContrato,
      fecha,
      pregunta1,
      pregunta2,
      pregunta3,
      pregunta4,
      pregunta5,
      pregunta6,
      pregunta7,
      pregunta8,
      pregunta9,
      pregunta10,
      pregunta11,
      pregunta12,
      pregunta13,
      pregunta14,
      pregunta15,
      pregunta16,
      pregunta17,
      pregunta18,
      pregunta19,
      pregunta20,
      pregunta21,
      pregunta23,
      pregunta24,
      pregunta25,
      pregunta26,
      pregunta27,
      pregunta28,
      pregunta29,
      pregunta30,
      pregunta31,
      pregunta32,
      pregunta33,
      pregunta34,
      pregunta35,
      pregunta36,
      pregunta37,
      pregunta38,
      pregunta39,
      pregunta40,
      pregunta41,
      pregunta42,
      pregunta43,
      pregunta44,
      pregunta45,
      pregunta46,
      pregunta47,
      pregunta48,
      pregunta49,
      pregunta50,
      pregunta51,
      pregunta52,
      pregunta53,
      pregunta55,
      pregunta56,
      pregunta57,
      pregunta58,
      pregunta59,
      pregunta60,
      pregunta61,
      pregunta62,
      pregunta63,
      pregunta64,
      pregunta65,
      pregunta66,
      pregunta67,
      pregunta68,
      pregunta69,
      pregunta70,
      pregunta71,
      pregunta72,
      pregunta73,
      pregunta74,
      pregunta75,
      pregunta76,
      pregunta77,
      pregunta78,
      pregunta79
    } = resp.data;

    console.log(pregunta73);
    this.peeas = pregunta73;

    this.pea17ilvemSeleccionada = resp.data;
    this.registerForm.setValue({
      idContrato,
      fecha,
      pregunta1,
      pregunta2,
      pregunta3,
      pregunta4,
      pregunta5,
      pregunta6,
      pregunta7,
      pregunta8,
      pregunta9,
      pregunta10:pregunta10?.respuesta,
      pregunta11,
      pregunta12,
      pregunta13:pregunta13?.respuesta,
      pregunta14:pregunta14?.respuesta,
      pregunta15:pregunta15?.respuesta,
      pregunta16,
      pregunta17,
      pregunta18,
      pregunta19,
      pregunta20,
      pregunta21,
      pregunta23,
      pregunta24:pregunta24?.respuesta,
      pregunta25:pregunta25?.respuesta,
      pregunta26:pregunta26?.respuesta,
      pregunta27:pregunta27?.respuesta,
      pregunta28:pregunta28?.respuesta,
      pregunta29:pregunta29?.respuesta,
      pregunta30:pregunta30?.respuesta,
      pregunta31:pregunta31?.respuesta,
      pregunta32,
      pregunta33,
      pregunta34,
      pregunta35,
      pregunta36,
      pregunta37,
      pregunta38,
      pregunta39,
      pregunta40,
      pregunta41,
      pregunta42,
      pregunta43,
      pregunta44,
      pregunta45,
      pregunta46,
      pregunta47,
      pregunta48,
      pregunta49,
      pregunta50,
      pregunta51,
      pregunta52,
      pregunta53,
      pregunta55:pregunta55?.respuesta,
      pregunta56:pregunta56?.respuesta,
      pregunta57,
      pregunta58,
      pregunta59,
      pregunta60,
      pregunta61,
      pregunta62,
      pregunta63,
      pregunta64,
      pregunta65:pregunta65?.respuesta,
      pregunta66:pregunta66?.respuesta,
      pregunta67:pregunta67?.respuesta,
      pregunta68,
      pregunta69,
      pregunta70,
      pregunta71,
      pregunta72,
      pregunta74,
      pregunta75,
      pregunta76,
      pregunta77,
      pregunta78,
      pregunta79
    });

    setTimeout(() => {
      if (pregunta10?.respuesta == "Si") {
        this.supletorios.nativeElement.value = pregunta10.observacion;
      }
      if (pregunta13?.respuesta == "Si") {
        this.planificado.nativeElement.value = pregunta13.observacion;
      }
      if (pregunta14?.respuesta == "Si") {
        this.embarazo.nativeElement.value = pregunta14.observacion;
      }
      if (pregunta15?.respuesta == "Si") {
        this.Complicaciones.nativeElement.value = pregunta15.observacion;
      }
      if (pregunta24?.respuesta == "Si") {
        this.Lactancia.nativeElement.value = pregunta24.observacion;
      }
      if (pregunta25?.respuesta == "Si") {
        this.Succion.nativeElement.value = pregunta25.observacion;
      }
      if (pregunta26?.respuesta == "Si") {
        this.Enfermedades.nativeElement.value = pregunta26.observacion;
      }
      if (pregunta27?.respuesta == "Si") {
        this.Separaciones.nativeElement.value  = pregunta27.observacion;
      }
      if (pregunta28?.respuesta == "Si") {
        this.Gateo.nativeElement.value = pregunta28.observacion;
      }
      if (pregunta29?.respuesta == "Si") {
        this.Camino.nativeElement.value = pregunta29.observacion;
      }
      if (pregunta30?.respuesta == "Si") {
        this.palabras.nativeElement.value  = pregunta30.observacion;
      }
      if (pregunta31?.respuesta == "Si") {
        this.esfínteres.nativeElement.value = pregunta31.observacion;
      }
      if (pregunta55?.respuesta == "Si") {
        this.medicamento.nativeElement.value = pregunta55.observacion;
      }
      if (pregunta56?.respuesta == "Si") {
        this.condicionMedica.nativeElement.value = pregunta56.observacion;
      }
      if (pregunta65?.respuesta == "Si") {
        this.Cirugias.nativeElement.value = pregunta65.observacion;
      }
      if (pregunta66?.respuesta == "Si") {
        this.terapia.nativeElement.value = pregunta66.observacion;
      }
      if (pregunta67?.respuesta == "Si") {
        this.actualmenteterapia.nativeElement.value  = pregunta67.observacion;
      }
    }, 500);
    
    
  }


  abrirModal(){
    this.mostraModal = false;
  }

  cerrarModal() {
    this.mostraModal = true;
  }

  agregar() {
    this.peeas.push({
      nombre: this.nombre.nativeElement.value,
      edad: this.edad.nativeElement.value,
      ocupacion: this.ocupacion.nativeElement.value,
      parentesco: this.parentesco.nativeElement.value 
    });
    this.cerrarModal();
  }

  crearPeea17(){
    if (this.pea17ilvemSeleccionada) {
      //actualizar
      this.Peea17ilvemModel = this.registerForm.value;

      this.Peea17ilvemModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();   


      this.Peea17ilvemModel.pregunta10={
        respuesta: this.registerForm.get('pregunta10')?.value,
        observacion: this.supletorios?.nativeElement.value
      }

      this.Peea17ilvemModel.pregunta13={
        respuesta: this.registerForm.get('pregunta13')?.value,
        observacion: this.planificado?.nativeElement.value
      }

      this.Peea17ilvemModel.pregunta14={
        respuesta: this.registerForm.get('pregunta14')?.value,
        observacion: this.embarazo?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta15={
        respuesta: this.registerForm.get('pregunta15')?.value,
        observacion: this.Complicaciones?.nativeElement.value
      }
      
      /* this.Peea17ilvemModel.pregunta22={
        respuesta: this.registerForm.get('pregunta22')?.value,
        observacion: this.incubadora?.nativeElement.value
      } */
      
      this.Peea17ilvemModel.pregunta24={
        respuesta: this.registerForm.get('pregunta24')?.value,
        observacion: this.Lactancia?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta25={
        respuesta: this.registerForm.get('pregunta25')?.value,
        observacion: this.Succion?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta26={
        respuesta: this.registerForm.get('pregunta26')?.value,
        observacion: this.Enfermedades?.nativeElement.value
      }

      this.Peea17ilvemModel.pregunta27={
        respuesta: this.registerForm.get('pregunta27')?.value,
        observacion: this.Separaciones?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta28={
        respuesta: this.registerForm.get('pregunta28')?.value,
        observacion: this.Gateo?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta29={
        respuesta: this.registerForm.get('pregunta29')?.value,
        observacion: this.Camino?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta30={
        respuesta: this.registerForm.get('pregunta30')?.value,
        observacion: this.palabras?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta31={
        respuesta: this.registerForm.get('pregunta31')?.value,
        observacion: this.esfínteres?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta55={
        respuesta: this.registerForm.get('pregunta55')?.value,
        observacion: this.medicamento?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta56={
        respuesta: this.registerForm.get('pregunta56')?.value,
        observacion: this.condicionMedica?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta56={
        respuesta: this.registerForm.get('pregunta56')?.value,
        observacion: this.condicionMedica?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta65={
        respuesta: this.registerForm.get('pregunta65')?.value,
        observacion: this.Cirugias?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta66={
        respuesta: this.registerForm.get('pregunta66')?.value,
        observacion: this.terapia?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta67={
        respuesta: this.registerForm.get('pregunta67')?.value,
        observacion: this.actualmenteterapia?.nativeElement.value
      }
      
      this.Peea17ilvemModel.pregunta73= this.peeas;

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

        this.peea17ilvemService.updatePeea17ilvem(this.pea17ilvemSeleccionada._id, this.Peea17ilvemModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/lista-peea-17-ilvem');
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
        this.Peea17ilvemModel = this.registerForm.value;
        this.Peea17ilvemModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();
        
        this.Peea17ilvemModel.pregunta10={
          respuesta: this.registerForm.get('pregunta10')?.value,
          observacion: this.supletorios?.nativeElement.value
        }

        this.Peea17ilvemModel.pregunta13={
          respuesta: this.registerForm.get('pregunta13')?.value,
          observacion: this.planificado?.nativeElement.value
        }

        this.Peea17ilvemModel.pregunta14={
          respuesta: this.registerForm.get('pregunta14')?.value,
          observacion: this.embarazo?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta15={
          respuesta: this.registerForm.get('pregunta15')?.value,
          observacion: this.Complicaciones?.nativeElement.value
        }
        
        /* this.Peea17ilvemModel.pregunta22={
          respuesta: this.registerForm.get('pregunta22')?.value,
          observacion: this.incubadora?.nativeElement.value
        } */
        
        this.Peea17ilvemModel.pregunta24={
          respuesta: this.registerForm.get('pregunta24')?.value,
          observacion: this.Lactancia?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta25={
          respuesta: this.registerForm.get('pregunta25')?.value,
          observacion: this.Succion?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta26={
          respuesta: this.registerForm.get('pregunta26')?.value,
          observacion: this.Enfermedades?.nativeElement.value
        }

        this.Peea17ilvemModel.pregunta27={
          respuesta: this.registerForm.get('pregunta27')?.value,
          observacion: this.Separaciones?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta28={
          respuesta: this.registerForm.get('pregunta28')?.value,
          observacion: this.Gateo?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta29={
          respuesta: this.registerForm.get('pregunta29')?.value,
          observacion: this.Camino?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta30={
          respuesta: this.registerForm.get('pregunta30')?.value,
          observacion: this.palabras?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta31={
          respuesta: this.registerForm.get('pregunta31')?.value,
          observacion: this.esfínteres?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta55={
          respuesta: this.registerForm.get('pregunta55')?.value,
          observacion: this.medicamento?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta56={
          respuesta: this.registerForm.get('pregunta56')?.value,
          observacion: this.condicionMedica?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta56={
          respuesta: this.registerForm.get('pregunta56')?.value,
          observacion: this.condicionMedica?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta65={
          respuesta: this.registerForm.get('pregunta65')?.value,
          observacion: this.Cirugias?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta66={
          respuesta: this.registerForm.get('pregunta66')?.value,
          observacion: this.terapia?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta67={
          respuesta: this.registerForm.get('pregunta67')?.value,
          observacion: this.actualmenteterapia?.nativeElement.value
        }
        
        this.Peea17ilvemModel.pregunta73= this.peeas;

        setTimeout(() => {
          this.peea17ilvemService.crearPeea17ilvem(this.Peea17ilvemModel).subscribe((resp) => {
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

            this.router.navigateByUrl('/lista-peea-17-ilvem');
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

  cancelarGuardado(){
    this.router.navigateByUrl('/lista-peea-17-ilvem');
  }

  habilitarCampos(campo1:any, campo2:any){
    
  }
}
