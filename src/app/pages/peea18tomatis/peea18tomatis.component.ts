import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Peea18tomatisService } from '../services/peea18tomatis.service';
import { Peea18tomatis } from './peea18tomatis.model';

import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ContratoService } from '../services/contrato.service';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-peea18tomatis',
  templateUrl: './peea18tomatis.component.html',
  styles: [
  ]
})
export class Peea18tomatisComponent implements OnInit {

  public estudiante: any = [];

  public dropdownListEstudiantes: any = [];
  public selectedItems: any = [];
  public dropdownSettingsSingle: IDropdownSettings = {};

  public peeas: any = [];
  public mostraModal: boolean = true;
  public lista: any = [];
  public lista1: any = [];

  public pea18tomatisSeleccionada: any;
  public Peea18tomatisModel: Peea18tomatis;

  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('edad') edad: ElementRef;
  @ViewChild('ocupacion') ocupacion: ElementRef;
  @ViewChild('parentesco') parentesco: ElementRef;


  @ViewChild('Nerviosos') Nerviosos: ElementRef;
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

  @ViewChild('Neurologo') Neurologo: ElementRef;
  @ViewChild('Otorrino') Otorrino: ElementRef;
  @ViewChild('Cardiologo') Cardiologo: ElementRef;
  @ViewChild('Moja1') Moja1: ElementRef;
  @ViewChild('Neumologo') Neumologo: ElementRef;
  @ViewChild('Alergologo') Alergologo: ElementRef;
  @ViewChild('Foniatra') Foniatra: ElementRef;
  @ViewChild('Psiquiatra') Psiquiatra: ElementRef;
  @ViewChild('Endocrinologo') Endocrinologo: ElementRef;
  @ViewChild('Otros') Otros: ElementRef;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private peea18tomatisService: Peea18tomatisService,
    private contratoService: ContratoService,
    private estudianteService: EstudianteService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id, idContrato }) => {
      this.cargaPeea18byId(id);
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

  async cargaPeea18byId(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.peea18tomatisService.obtenerPeea18tomatisById(id)
      .subscribe((resp: any) => {
        this.pea18tomatisSeleccionada = resp.data;
        console.log(this.pea18tomatisSeleccionada);
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
    pregunta5: [''],
    pregunta6: [''],
    pregunta7: [''],
    pregunta8: [null],
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
    idEstudiante: [null],

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
      pregunta43
    } = resp.data;

    this.peeas = pregunta9;

    this.pea18tomatisSeleccionada = resp.data;
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
      pregunta43
    });

    if (pregunta20 != []) {
      pregunta20.map((resp: any) => {
        if (resp == 'Nerviosos') {
          //this.Nerviosos?.nativeElement.value = true;
        }
      })
    }

  }


  crearPeea18() {
    if (this.pea18tomatisSeleccionada) {
      //actualizar
      this.Peea18tomatisModel = this.registerForm.value;

      this.Peea18tomatisModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();




      this.Peea18tomatisModel.idEstudiante = this.estudiante[0].item_id;
      if (this.Nerviosos?.nativeElement.checked) {
        this.lista.push("Nerviosos");
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
      this.Peea18tomatisModel.pregunta20 = this.lista;


      if (this.Neurologo?.nativeElement.checked) {
        this.lista1.push("Neurologo");
      }
      if (this.Otorrino?.nativeElement.checked) {
        this.lista1.push("Otorrino");
      }
      if (this.Cardiologo?.nativeElement.checked) {
        this.lista1.push("Cardiologo");
      }
      if (this.Moja1?.nativeElement.checked) {
        this.lista1.push("Moja1");
      }
      if (this.Neumologo?.nativeElement.checked) {
        this.lista1.push("Neumologo");
      }
      if (this.Alergologo?.nativeElement.checked) {
        this.lista1.push("Alergologo");
      }
      if (this.Foniatra?.nativeElement.checked) {
        this.lista1.push("Foniatra");
      }
      if (this.Psiquiatra?.nativeElement.checked) {
        this.lista1.push("Psiquiatra");
      }
      if (this.Endocrinologo?.nativeElement.checked) {
        this.lista1.push("Endocrinologo");
      }
      if (this.Otros?.nativeElement.checked) {
        this.lista1.push("Otros");
      }

      this.Peea18tomatisModel.pregunta21 = this.lista1;

      this.Peea18tomatisModel.pregunta9 = this.peeas;

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

        this.peea18tomatisService.updatePeea18tomatis(this.pea18tomatisSeleccionada._id, this.Peea18tomatisModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/lista-peea-18-tomatis');
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

        this.Peea18tomatisModel = this.registerForm.value;
        this.Peea18tomatisModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();

        //actualizar datos del contrato
        this.contratoService.obtenerContratoById(this.Peea18tomatisModel.idContrato).subscribe((resp: any) => {
          let datos = resp.data;
          if (datos.pea) {
            datos.pea.push({ nombreEstudiante: this.estudiante[0].nombre, marca: 'TOMATIS', nombrePea: 'PEEA 18 TOMATIS' });
          } else {
            datos.pea = [{ nombreEstudiante: this.estudiante[0].nombre, marca: 'TOMATIS', nombrePea: 'PEEA 18 TOMATIS' }];
          }
          this.contratoService.updatecontrato(this.Peea18tomatisModel.idContrato, datos).subscribe((resp: any) => {
            console.log(resp);
          });
        });

        this.Peea18tomatisModel.idEstudiante = this.estudiante[0].item_id;
        if (this.Nerviosos?.nativeElement.checked) {
          this.lista.push("Nerviosos");
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
        this.Peea18tomatisModel.pregunta20 = this.lista;


        if (this.Neurologo?.nativeElement.checked) {
          this.lista1.push("Neurologo");
        }
        if (this.Otorrino?.nativeElement.checked) {
          this.lista1.push("Otorrino");
        }
        if (this.Cardiologo?.nativeElement.checked) {
          this.lista1.push("Cardiologo");
        }
        if (this.Moja1?.nativeElement.checked) {
          this.lista1.push("Moja1");
        }
        if (this.Neumologo?.nativeElement.checked) {
          this.lista1.push("Neumologo");
        }
        if (this.Alergologo?.nativeElement.checked) {
          this.lista1.push("Alergologo");
        }
        if (this.Foniatra?.nativeElement.checked) {
          this.lista1.push("Foniatra");
        }
        if (this.Psiquiatra?.nativeElement.checked) {
          this.lista1.push("Psiquiatra");
        }
        if (this.Endocrinologo?.nativeElement.checked) {
          this.lista1.push("Endocrinologo");
        }
        if (this.Otros?.nativeElement.checked) {
          this.lista1.push("Otros");
        }

        this.Peea18tomatisModel.pregunta21 = this.lista1;

        this.Peea18tomatisModel.pregunta9 = this.peeas;
        setTimeout(() => {
          this.peea18tomatisService.crearPeea18tomatis(this.Peea18tomatisModel).subscribe((resp) => {
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

            this.router.navigateByUrl('/lista-peea-18-tomatis');
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

  abrirModal() {
    this.mostraModal = false;
  }

  cancelarGuardado() {
    this.router.navigateByUrl('/lista-peea-18-tomatis');
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
