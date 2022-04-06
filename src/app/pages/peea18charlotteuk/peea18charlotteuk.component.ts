import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Peea18chuk } from './peea18chuk.model';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Peea18chukService } from '../services/peea18chuk.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ContratoService } from '../services/contrato.service';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-peea18charlotteuk',
  templateUrl: './peea18charlotteuk.component.html',
  styles: [
  ]
})
export class Peea18charlotteukComponent implements OnInit {

  public estudiante: any = [];

  public dropdownListEstudiantes: any = [];
  public selectedItems: any = [];
  public dropdownSettingsSingle: IDropdownSettings = {};

  public pea18chukSeleccionada: any;
  public peeas: any = [];

  public mostraModal: boolean = true;

  Peea18chukModel = new Peea18chuk();
  Peea18chukModel1 = new Peea18chuk();

  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('edad') edad: ElementRef;
  @ViewChild('ocupacion') ocupacion: ElementRef;
  @ViewChild('parentesco') parentesco: ElementRef;

  @ViewChild('visual') visual: ElementRef;
  @ViewChild('auditiva') auditiva: ElementRef;
  @ViewChild('aprendizaje') aprendizaje: ElementRef;
  @ViewChild('ingles') ingles: ElementRef;

  @ViewChild('radio1') radio1: ElementRef;
  @ViewChild('radio2') radio2: ElementRef;
  @ViewChild('radio3') radio3: ElementRef;
  @ViewChild('radio4') radio4: ElementRef;
  @ViewChild('radio5') radio5: ElementRef;
  @ViewChild('radio6') radio6: ElementRef;
  


  constructor(
    private fb: FormBuilder,
    private peea18chukService: Peea18chukService,
    private contratoService: ContratoService,
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id, idContrato }) => {
      this.cargaPeea18chukbyId(id);
      this.cargarEstudianteContrato(idContrato);
    });

    this.dropdownSettingsSingle = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  cargarEstudianteContrato(idContrato: any) {
    this.contratoService.obtenerContratoById(idContrato).subscribe((resp: any) => {
      this.estudianteService.getAllEstudiantesByIdRepresentante(resp.data.idRepresentante).subscribe((resp: any) => {
        let nombreEstudiantes: any = [];
        resp.data.forEach((element: any) => {
          nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
        });
        this.dropdownListEstudiantes = nombreEstudiantes;
      })
    })
  }

  async cargaPeea18chukbyId(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.peea18chukService.obtenerPeea18chukById(id)
      .subscribe((resp: any) => {
        this.pea18chukSeleccionada = resp.data;
        this.peeas = this.pea18chukSeleccionada.pregunta5;
        this.LlenarForm(resp);
      });
  }

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
      pregunta13
    } = resp.data;
    this.pea18chukSeleccionada = resp.data;
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
      pregunta10,
      pregunta11,
      pregunta12,
      pregunta13
    });
    console.log(this.pea18chukSeleccionada);
    if (pregunta8.respuesta == "Si") {
      console.log("Si");
      this.radio1.nativeElement.checked = true;
      this.visual.nativeElement.value = pregunta8.observacion;
    }else{
      this.radio2.nativeElement.checked = true;
      this.visual.nativeElement.style.display = "none";
    }

    if (pregunta9.respuesta == "Si") {
      this.radio3.nativeElement.checked = true;
      this.auditiva.nativeElement.value = pregunta9.observacion;
    }
    else {
      this.radio4.nativeElement.checked = true;
      this.auditiva.nativeElement.style.display = "none";
    }

    if (pregunta10.respuesta == "Si") {
      this.radio5.nativeElement.checked = true;
      this.aprendizaje.nativeElement.value = pregunta10.observacion;
    }
    else {
      this.radio6.nativeElement.checked = true;
      this.aprendizaje.nativeElement.style.display = "none";
    }

  }

  public registerForm = this.fb.group({
    idContrato: [this.activatedRoute.snapshot.paramMap.get('idContrato')],
    fecha: [new Date()],
    pregunta1: [''],
    pregunta2: [''],
    pregunta3: [''],
    pregunta4: [''],
    pregunta5: [this.peeas],
    pregunta6: [''],
    pregunta7: [''],
    pregunta8: [null],
    pregunta9: [null],
    pregunta10: [null],
    pregunta11: [null],
    pregunta12: [''],
    pregunta13: [''],
    idEstudiante: [null],
  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }


  crearPeea18() {

    if (this.pea18chukSeleccionada) {
      //actualizar
      this.Peea18chukModel = this.registerForm.value;

      this.Peea18chukModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();
        if (this.visual.nativeElement.value != '') {
          console.log(this.visual.nativeElement.value);
          this.Peea18chukModel.pregunta8 = {
            respuesta: "Si",
            observacion: this.visual.nativeElement.value
          }
        }else{
          this.Peea18chukModel.pregunta8 = this.Peea18chukModel1.pregunta8;
        }

        if (this.auditiva.nativeElement.value != '') {
          console.log(this.auditiva.nativeElement.value);
          this.Peea18chukModel.pregunta9 = {
            respuesta: "Si",
            observacion: this.auditiva.nativeElement.value
          }
        }else{
          this.Peea18chukModel.pregunta9 = this.Peea18chukModel1.pregunta9;
        }

        if (this.aprendizaje.nativeElement.value != '') {
          console.log(this.aprendizaje.nativeElement.value);
          this.Peea18chukModel.pregunta10 =
          {
            respuesta: "Si",
            observacion: this.aprendizaje.nativeElement.value
          };
        }else{
          this.Peea18chukModel.pregunta10 = this.Peea18chukModel1.pregunta10;
        }

        

        this.Peea18chukModel.pregunta5 = this.peeas;

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

        this.peea18chukService.updatePeea18chuk(this.pea18chukSeleccionada._id, this.Peea18chukModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listapeea-18-ch-uk');
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
        this.Peea18chukModel = this.registerForm.value;
        this.Peea18chukModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();
        this.Peea18chukModel.idEstudiante = this.estudiante[0].item_id;
        if (this.visual.nativeElement.value != '') {
          console.log(this.visual.nativeElement.value);
          this.Peea18chukModel.pregunta8 = {
            respuesta: "Si",
            observacion: this.visual.nativeElement.value
          }
        }else{
          this.Peea18chukModel.pregunta8 = this.Peea18chukModel1.pregunta8;
        }

        if (this.auditiva.nativeElement.value != '') {
          console.log(this.auditiva.nativeElement.value);
          this.Peea18chukModel.pregunta9 = {
            respuesta: "Si",
            observacion: this.auditiva.nativeElement.value
          }
        }else{
          this.Peea18chukModel.pregunta9 = this.Peea18chukModel1.pregunta9;
        }

        if (this.aprendizaje.nativeElement.value != '') {
          console.log(this.aprendizaje.nativeElement.value);
          this.Peea18chukModel.pregunta10 =
          {
            respuesta: "Si",
            observacion: this.aprendizaje.nativeElement.value
          };
        }else{
          this.Peea18chukModel.pregunta10 = this.Peea18chukModel1.pregunta10;
        }


        this.Peea18chukModel.pregunta5 = this.peeas;


      

        setTimeout(() => {
          this.peea18chukService.crearPeea18chuk(this.Peea18chukModel).subscribe((resp) => {

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

            this.router.navigateByUrl('/listapeea-18-ch-uk');
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
    this.router.navigateByUrl('/listapeea-18-ch-uk')
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

  abrirModal() {
    this.mostraModal = false;
  }

  habilitarCampos(campo1: any, campo2: any) {
    if (campo2 == "visual") {
      if (campo1 == "Si") {
        this.visual.nativeElement.style.display = "block";
      } else {
        this.Peea18chukModel1.pregunta8 = { respuesta: "No" };
        this.visual.nativeElement.value = "";
        this.visual.nativeElement.style.display = "none";
      }
    }
    if (campo2 == "auditiva") {
      if (campo1 == "Si") {
        this.auditiva.nativeElement.style.display = "block";
      } else {
        this.Peea18chukModel1.pregunta9 = { respuesta: "No" };
        this.auditiva.nativeElement.value = "";
        this.auditiva.nativeElement.style.display = "none";
      }
    }
    if (campo2 == "aprendizaje") {
      if (campo1 == "Si") {
        this.aprendizaje.nativeElement.style.display = "block";
      } else {
        this.Peea18chukModel1.pregunta10 = { respuesta: "No" };
        this.aprendizaje.nativeElement.value = "";
        this.aprendizaje.nativeElement.style.display = "none";
      }
    }
    
    
    

  }


  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante = [item];
  }
  /** Todos los items Seleccionados */
  onSelectAllEstudiante(items: any) {
    this.estudiante = items;
  }
  /** Deselccionar item */
  onDeSelectEstudiante(item: any) {
    /** Borrar elemento del array  */
    this.estudiante = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstudiante(items: any) {
    this.estudiante = items;
  }

}
