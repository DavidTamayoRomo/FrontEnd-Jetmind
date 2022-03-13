import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Peea17tomatisService } from '../services/peea17tomatis.service';
import { Peea17tomatis } from './peea17tomatis.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-peea17tomatis',
  templateUrl: './peea17tomatis.component.html',
  styles: [
  ]
})
export class Peea17tomatisComponent implements OnInit {

  public peeas: any = [];
  public mostraModal: boolean = true;
  public lista:any = [];

  public pea17tomatisSeleccionada: any;
  public Peea17tomatisModel: Peea17tomatis;

  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('edad') edad: ElementRef;
  @ViewChild('ocupacion') ocupacion: ElementRef;
  @ViewChild('parentesco') parentesco: ElementRef;

  @ViewChild('goza') goza: ElementRef;
  @ViewChild('medicamentos') medicamentos: ElementRef;

  @ViewChild('Otitis') Otitis: ElementRef;
  @ViewChild('Sinusitis') Sinusitis: ElementRef;
  @ViewChild('Rinitis') Rinitis: ElementRef;
  @ViewChild('Epilepsia') Epilepsia: ElementRef;
  @ViewChild('unias') unias: ElementRef;
  @ViewChild('Moja') Moja: ElementRef;
  @ViewChild('Estres') Estres: ElementRef;
  @ViewChild('Operaciones') Operaciones: ElementRef;
  @ViewChild('Pesadillas') Pesadillas: ElementRef;
  @ViewChild('Convulsiones') Convulsiones: ElementRef;
  @ViewChild('irregular') irregular: ElementRef;
  @ViewChild('Depresion') Depresion: ElementRef;
  @ViewChild('Estrenimiento') Estrenimiento: ElementRef;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private peea17tomatisService: Peea17tomatisService
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
    this.peea17tomatisService.obtenerPeea17tomatisById(id)
      .subscribe((resp: any) => {
        this.pea17tomatisSeleccionada = resp.data;
        console.log(this.pea17tomatisSeleccionada);
        //this.peeas = this.pea17ilvemSeleccionada.pregunta5;
        this.LlenarForm(resp);
      });
  }

  public registerForm = this.fb.group({
    idContrato: [],
    fecha: [new Date()],
    pregunta1: [''],
    pregunta2: [''],
    pregunta3: [''],
    pregunta4: [''],
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
    pregunta22: [''],
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
 
    pregunta45: [''],
    pregunta46: [''],
    pregunta47: [''],
    pregunta48: [''],
    pregunta49: [''],
    pregunta50: [''],
    pregunta51: [''],
    pregunta52: [''],
    pregunta53: [''],
    pregunta54: [''],
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
    pregunta73: [''],
    pregunta74: [''],
    pregunta75: [''],
    pregunta76: [''],
    pregunta77: [''],
    pregunta78: [''],
    pregunta79: [''],
    pregunta80: [''],
    pregunta81: [''],
    pregunta82: [''],
    pregunta83: [''],
    pregunta84: [''],
    pregunta85: [''],
    pregunta86: [''],
    pregunta87: [''],
    pregunta88: [''],
    pregunta89: [''],
    pregunta90: [''],
    pregunta91: [''],
    pregunta92: [''],
    pregunta93: [''],
    pregunta94: [''],
    pregunta95: [''],
    pregunta96: [''],
    pregunta97: [''],
    pregunta98: [''],
    pregunta99: [''],
    pregunta100: ['']

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
      pregunta22,
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
      pregunta45,
      pregunta46,
      pregunta47,
      pregunta48,
      pregunta49,
      pregunta50,
      pregunta51,
      pregunta52,
      pregunta53,
      pregunta54,
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
      pregunta79,
      pregunta80,
      pregunta81,
      pregunta82,
      pregunta83,
      pregunta84,
      pregunta85,
      pregunta86,
      pregunta87,
      pregunta88,
      pregunta89,
      pregunta90,
      pregunta91,
      pregunta92,
      pregunta93,
      pregunta94,
      pregunta95,
      pregunta96,
      pregunta97,
      pregunta98,
      pregunta99,
      pregunta100
    } = resp.data;

    this.peeas = pregunta5;

    this.pea17tomatisSeleccionada = resp.data;
    this.registerForm.setValue({
      idContrato,
      fecha,
      pregunta1,
      pregunta2,
      pregunta3,
      pregunta4,
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
      pregunta22,
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
      pregunta45,
      pregunta46,
      pregunta47,
      pregunta48,
      pregunta49,
      pregunta50,
      pregunta51,
      pregunta52,
      pregunta53,
      pregunta54,
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
      pregunta79,
      pregunta80,
      pregunta81,
      pregunta82,
      pregunta83,
      pregunta84,
      pregunta85,
      pregunta86,
      pregunta87,
      pregunta88,
      pregunta89,
      pregunta90,
      pregunta91,
      pregunta92,
      pregunta93,
      pregunta94,
      pregunta95,
      pregunta96,
      pregunta97,
      pregunta98,
      pregunta99,
      pregunta100
    });

  }



  crearPeea17() {
    if (this.pea17tomatisSeleccionada) {
      //actualizar
      this.Peea17tomatisModel = this.registerForm.value;

      this.Peea17tomatisModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();


      this.Peea17tomatisModel.pregunta33 = {
        respuesta: this.registerForm.get('pregunta33')?.value,
        observacion: this.goza?.nativeElement.value
      };
      
      this.Peea17tomatisModel.pregunta34 = {
        respuesta: this.registerForm.get('pregunta34')?.value,
        observacion: this.medicamentos?.nativeElement.value
      };

      
      if (this.Otitis?.nativeElement.checked) {
        this.lista.push("Otitis");
      }

      if (this.Sinusitis?.nativeElement.checked) {
        this.lista.push("Sinusitis");
      }
      if (this.Rinitis?.nativeElement.checked) {
        this.lista.push("Rinitis");
      }
      if (this.Epilepsia?.nativeElement.checked) {
        this.lista.push("Epilepsia");
      }
      if (this.unias?.nativeElement.checked) {
        this.lista.push("unias");
      }
      if (this.Moja?.nativeElement.checked) {
        this.lista.push("Moja");
      }
      if (this.Estres?.nativeElement.checked) {
        this.lista.push("Estres");
      }
      if (this.Operaciones?.nativeElement.checked) {
        this.lista.push("Operaciones");
      }
      if (this.Pesadillas?.nativeElement.checked) {
        this.lista.push("Pesadillas");
      }
      if (this.irregular?.nativeElement.checked) {
        this.lista.push("irregular");
      }
      if (this.Convulsiones?.nativeElement.checked) {
        this.lista.push("Convulsiones");
      }
      if (this.irregular?.nativeElement.checked) {
        this.lista.push("irregular");
      }
      if (this.Depresion?.nativeElement.checked) {
        this.lista.push("Depresion");
      }
      if (this.Estrenimiento?.nativeElement.checked) {
        this.lista.push("Estrenimiento");
      }

      this.Peea17tomatisModel.pregunta36 = this.lista;

      this.Peea17tomatisModel.pregunta5 = this.peeas;

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

        this.peea17tomatisService.updatePeea17tomatis(this.pea17tomatisSeleccionada._id, this.Peea17tomatisModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/lista-peea-17-tomatis');
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
        this.Peea17tomatisModel = this.registerForm.value;
        this.Peea17tomatisModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();

        this.Peea17tomatisModel.pregunta33 = {
          respuesta: this.registerForm.get('pregunta33')?.value,
          observacion: this.goza?.nativeElement.value
        };
        
        this.Peea17tomatisModel.pregunta34 = {
          respuesta: this.registerForm.get('pregunta34')?.value,
          observacion: this.medicamentos?.nativeElement.value
        };
  
        if (this.Otitis?.nativeElement.checked) {
          this.lista.push("Otitis");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
  
        if (this.Sinusitis?.nativeElement.checked) {
          this.lista.push("Sinusitis");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.Rinitis?.nativeElement.checked) {
          this.lista.push("Rinitis");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.Epilepsia?.nativeElement.checked) {
          this.lista.push("Epilepsia");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.unias?.nativeElement.checked) {
          this.lista.push("unias");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.Moja?.nativeElement.checked) {
          this.lista.push("Moja");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.Estres?.nativeElement.checked) {
          this.lista.push("Estres");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.Operaciones?.nativeElement.checked) {
          this.lista.push("Operaciones");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.Pesadillas?.nativeElement.checked) {
          this.lista.push("Pesadillas");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.irregular?.nativeElement.checked) {
          this.lista.push("irregular");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.Convulsiones?.nativeElement.checked) {
          this.lista.push("Convulsiones");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.irregular?.nativeElement.checked) {
          this.lista.push("irregular");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.Depresion?.nativeElement.checked) {
          this.lista.push("Depresion");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
        if (this.Estrenimiento?.nativeElement.checked) {
          this.lista.push("Estrenimiento");
          this.Peea17tomatisModel.pregunta36 = this.lista;
        }
  
        this.Peea17tomatisModel.pregunta5 = this.peeas;
        console.log(this.Peea17tomatisModel.pregunta36 );
        console.log(this.Peea17tomatisModel );
        setTimeout(() => {
          console.log(this.Peea17tomatisModel.pregunta36 );
          this.peea17tomatisService.crearPeea17tomatis(this.Peea17tomatisModel).subscribe((resp) => {
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

            this.router.navigateByUrl('/lista-peea-17-tomatis');
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
        }, 1000);

      }
    }
  }

  prueba(){
    console.log(this.Otitis?.nativeElement.checked);
  }

  abrirModal() {
    this.mostraModal = false;
  }

  cancelarGuardado() {
    this.router.navigateByUrl('/lista-peea-17-tomatis');
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

}
