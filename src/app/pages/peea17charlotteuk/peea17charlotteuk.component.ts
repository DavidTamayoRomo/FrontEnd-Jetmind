import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Peea17chuk } from './peea17chuk.model';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Peea17chukService } from '../services/peea17chuk.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ContratoService } from '../services/contrato.service';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-peea17charlotteuk',
  templateUrl: './peea17charlotteuk.component.html',
  styles: [
  ]
})
export class Peea17charlotteukComponent implements OnInit {

  public estudiante: any = [];

  public dropdownListEstudiantes: any = [];
  public selectedItems: any = [];
  public dropdownSettingsSingle: IDropdownSettings = {};

  public pea17chukSeleccionada: any;
  public peeas: any = [];

  public mostraModal: boolean = true;

  Peea17chukModel = new Peea17chuk();
  Peea17chukModel1 = new Peea17chuk();

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
  @ViewChild('radio7') radio7: ElementRef;
  @ViewChild('radio8') radio8: ElementRef;
  @ViewChild('radio9') radio9: ElementRef;
  @ViewChild('radio10') radio10: ElementRef;
  @ViewChild('radio11') radio11: ElementRef;
  @ViewChild('radio12') radio12: ElementRef;
  @ViewChild('radio13') radio13: ElementRef;
  @ViewChild('radio14') radio14: ElementRef;
  @ViewChild('radio15') radio15: ElementRef;
  @ViewChild('radio16') radio16: ElementRef;


  constructor(
    private fb: FormBuilder,
    private peea17chukService: Peea17chukService,
    private contratoService: ContratoService,
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id, idContrato }) => {
      this.cargaPeea17chukbyId(id);
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

  async cargaPeea17chukbyId(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.peea17chukService.obtenerPeea17chukById(id)
      .subscribe((resp: any) => {
        this.pea17chukSeleccionada = resp.data;
        this.peeas = this.pea17chukSeleccionada.pregunta5;
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
      pregunta13,
      pregunta14,
      pregunta15,
      pregunta16,
      pregunta17,
      pregunta18
    } = resp.data;
    this.pea17chukSeleccionada = resp.data;
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
      pregunta13,
      pregunta14,
      pregunta15,
      pregunta16,
      pregunta17,
      pregunta18
    });
    if (pregunta8 == "Si") {
      this.radio1.nativeElement.checked = true;
    } else {
      this.radio2.nativeElement.checked = true;
      this.visual.nativeElement.style.display = "none";
    }

    if (pregunta9 == "Si") {
      this.radio3.nativeElement.checked = true;

    }
    else {
      this.radio4.nativeElement.checked = true;
      this.auditiva.nativeElement.style.display = "none";
    }

    if (pregunta10 == "Si") {
      this.radio5.nativeElement.checked = true;
    }
    else {
      this.radio6.nativeElement.checked = true;
      this.aprendizaje.nativeElement.style.display = "none";
    }

    if (pregunta11 == "Si") {
      this.radio7.nativeElement.checked = true;
    }
    else {
      this.radio8.nativeElement.checked = true;
      this.ingles.nativeElement.style.display = "none";
    }

    if (pregunta12 == "Si") {
      this.radio9.nativeElement.checked = true;
    }
    else {
      this.radio10.nativeElement.checked = true;
    }

    if (pregunta13 == "Si") {
      this.radio11.nativeElement.checked = true;
    }
    else {
      this.radio12.nativeElement.checked = true;
    }

    if (pregunta14 == "Si") {
      this.radio13.nativeElement.checked = true;
    }
    else {
      this.radio14.nativeElement.checked = true;
    }

    if (pregunta15 == "Si") {
      this.radio15.nativeElement.checked = true;
    }
    else {
      this.radio16.nativeElement.checked = true;
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
    pregunta14: [''],
    pregunta15: [''],
    pregunta16: [''],
    pregunta17: [''],
    pregunta18: [''],
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


  crearPeea17() {

    if (this.pea17chukSeleccionada) {
      //actualizar
      this.Peea17chukModel = this.registerForm.value;

      this.Peea17chukModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();
      if (this.visual.nativeElement.value != '') {
        console.log(this.visual.nativeElement.value);
        this.Peea17chukModel.pregunta8 = {
          respuesta: "Si",
          observacion: this.visual.nativeElement.value
        }
      } else {
        this.Peea17chukModel.pregunta8 = this.Peea17chukModel1.pregunta8;
      }

      if (this.auditiva.nativeElement.value != '') {
        console.log(this.auditiva.nativeElement.value);
        this.Peea17chukModel.pregunta9 = {
          respuesta: "Si",
          observacion: this.auditiva.nativeElement.value
        }
      } else {
        this.Peea17chukModel.pregunta9 = this.Peea17chukModel1.pregunta9;
      }

      if (this.aprendizaje.nativeElement.value != '') {
        console.log(this.aprendizaje.nativeElement.value);
        this.Peea17chukModel.pregunta10 =
        {
          respuesta: "Si",
          observacion: this.aprendizaje.nativeElement.value
        };
      } else {
        this.Peea17chukModel.pregunta10 = this.Peea17chukModel1.pregunta10;
      }

      if (this.ingles.nativeElement.value != '') {
        console.log(this.ingles.nativeElement.value);
        this.Peea17chukModel.pregunta11 =
        {
          respuesta: "Si",
          observacion: this.ingles.nativeElement.value
        };
      } else {
        this.Peea17chukModel.pregunta11 = this.Peea17chukModel1.pregunta11;
      }

      this.Peea17chukModel.pregunta5 = this.peeas;
      this.Peea17chukModel.pregunta12 = this.Peea17chukModel1.pregunta12;
      this.Peea17chukModel.pregunta13 = this.Peea17chukModel1.pregunta13;
      this.Peea17chukModel.pregunta14 = this.Peea17chukModel1.pregunta14;
      this.Peea17chukModel.pregunta15 = this.Peea17chukModel1.pregunta15;

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

        this.peea17chukService.updatePeea17chuk(this.pea17chukSeleccionada._id, this.Peea17chukModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listapeea-17-ch-uk');
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
        this.Peea17chukModel = this.registerForm.value;
        this.Peea17chukModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();
        this.Peea17chukModel.idEstudiante = this.estudiante[0].item_id;
        if (this.visual.nativeElement.value != '') {
          console.log(this.visual.nativeElement.value);
          this.Peea17chukModel.pregunta8 = {
            respuesta: "Si",
            observacion: this.visual.nativeElement.value
          }
        } else {
          this.Peea17chukModel.pregunta8 = this.Peea17chukModel1.pregunta8;
        }

        if (this.auditiva.nativeElement.value != '') {
          console.log(this.auditiva.nativeElement.value);
          this.Peea17chukModel.pregunta9 = {
            respuesta: "Si",
            observacion: this.auditiva.nativeElement.value
          }
        } else {
          this.Peea17chukModel.pregunta9 = this.Peea17chukModel1.pregunta9;
        }

        if (this.aprendizaje.nativeElement.value != '') {
          console.log(this.aprendizaje.nativeElement.value);
          this.Peea17chukModel.pregunta10 =
          {
            respuesta: "Si",
            observacion: this.aprendizaje.nativeElement.value
          };
        } else {
          this.Peea17chukModel.pregunta10 = this.Peea17chukModel1.pregunta10;
        }

        if (this.ingles.nativeElement.value != '') {
          console.log(this.ingles.nativeElement.value);
          this.Peea17chukModel.pregunta11 =
          {
            respuesta: "Si",
            observacion: this.ingles.nativeElement.value
          };
        } else {
          this.Peea17chukModel.pregunta11 = this.Peea17chukModel1.pregunta11;
        }

        this.Peea17chukModel.pregunta5 = this.peeas;
        this.Peea17chukModel.pregunta12 = this.Peea17chukModel1.pregunta12;
        this.Peea17chukModel.pregunta13 = this.Peea17chukModel1.pregunta13;
        this.Peea17chukModel.pregunta14 = this.Peea17chukModel1.pregunta14;
        this.Peea17chukModel.pregunta15 = this.Peea17chukModel1.pregunta15;




        setTimeout(() => {
          this.peea17chukService.crearPeea17chuk(this.Peea17chukModel).subscribe((resp) => {

            //actualizar datos del contrato
            this.contratoService.obtenerContratoById(this.Peea17chukModel.idContrato).subscribe((resp: any) => {
              let datos = resp.data;
              if (datos.pea) {
                datos.pea.push({nombreEstudiante: this.estudiante[0].nombre, marca:'Charlotte', nombrePea:'PEEA 17 Charlotte'});
              }else{
                datos.pea = [{nombreEstudiante: this.estudiante[0].nombre, marca:'Charlotte', nombrePea:'PEEA 17 Charlotte'}];
              }
              this.contratoService.updatecontrato(this.Peea17chukModel.idContrato,datos).subscribe((resp: any) => {
                console.log(resp);
              });
            });

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

            this.router.navigateByUrl('/listapeea-17-ch-uk');
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
    this.router.navigateByUrl('/listapeea-17-ch-uk')
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
        this.Peea17chukModel1.pregunta8 = { respuesta: "No" };
        this.visual.nativeElement.value = "";
        this.visual.nativeElement.style.display = "none";
      }
    }
    if (campo2 == "auditiva") {
      if (campo1 == "Si") {
        this.auditiva.nativeElement.style.display = "block";
      } else {
        this.Peea17chukModel1.pregunta9 = { respuesta: "No" };
        this.auditiva.nativeElement.value = "";
        this.auditiva.nativeElement.style.display = "none";
      }
    }
    if (campo2 == "aprendizaje") {
      if (campo1 == "Si") {
        this.aprendizaje.nativeElement.style.display = "block";
      } else {
        this.Peea17chukModel1.pregunta10 = { respuesta: "No" };
        this.aprendizaje.nativeElement.value = "";
        this.aprendizaje.nativeElement.style.display = "none";
      }
    }
    if (campo2 == "ingles") {
      if (campo1 == "Si") {

        this.ingles.nativeElement.style.display = "block";
      } else {
        this.Peea17chukModel1.pregunta11 = { respuesta: "No" };
        this.ingles.nativeElement.value = "";
        this.ingles.nativeElement.style.display = "none";
      }
    }

    if (campo2 == "curso") {
      if (campo1 == "Si") {
        this.Peea17chukModel1.pregunta12 = "Si";
      }
      if (campo1 == "No") {
        this.Peea17chukModel1.pregunta12 = "No";
      }
    }
    if (campo2 == "inglesa") {
      if (campo1 == "Si") {
        this.Peea17chukModel1.pregunta13 = "Si";
      }
      if (campo1 == "No") {
        this.Peea17chukModel1.pregunta13 = "No";
      }
    }
    if (campo2 == "escuela") {
      if (campo1 == "Si") {
        this.Peea17chukModel1.pregunta14 = "Si";
      }
      if (campo1 == "No") {
        this.Peea17chukModel1.pregunta14 = "No";
      }
    }
    if (campo2 == "idioma") {
      if (campo1 == "Si") {
        this.Peea17chukModel1.pregunta15 = "Si";
      }
      if (campo1 == "No") {
        this.Peea17chukModel1.pregunta15 = "No";
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
