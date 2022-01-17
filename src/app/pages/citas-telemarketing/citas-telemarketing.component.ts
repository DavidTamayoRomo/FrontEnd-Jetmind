import {
  Component, OnInit, ChangeDetectionStrategy,
  TemplateRef,
  OnChanges
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CitasTelemarketingService } from '../services/citas-telemarketing.service';
import { MarcaService } from '../services/marca.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CitaTelemarketing } from './citaTelemarketing.model';
import { SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { PersonaService } from '../persona/persona.service';
import { SucursalService } from '../services/sucursal.service';



@Component({
  selector: 'app-citas-telemarketing',
  templateUrl: './citas-telemarketing.component.html',
  styles: [
  ]
})
export class CitasTelemarketingComponent implements OnInit {

  public citaTelemarketingSeleccionada: any;
  public citaTelemarketingModel: CitaTelemarketing = new CitaTelemarketing();

  public dropdownListMarcas: any = [];
  public dropdownListSucursales: any = [];
  public dropdownListAsesores: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSucursal: IDropdownSettings = {};


  public marca: any = [];
  public asesor: any = [];
  public sucursal: any = [];

  public dateTimeValue: Date = new Date();

  public mostraModalEstudiantes: boolean = true;

  public editaEstudiante: boolean = false;
  public index: number = 0;

  @ViewChild('nombreEstudiante') nombreEstudiante: ElementRef;
  @ViewChild('edadEstudiante') edadEstudiante: ElementRef;
  @ViewChild('observacionesEstudiante') observacionesEstudiante: ElementRef;

  public estudiantes: any = [];



  constructor(
    private fb: FormBuilder,
    private citasTelemarketingService: CitasTelemarketingService,
    private marcaService: MarcaService,
    private personaService: PersonaService,
    private sucursalService: SucursalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarCitabyId(id);
    });

    this.recuperarDatosMarcas();
    this.recuperarDatosPersonas();
    this.recuperarDatosSucursales();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettingsSucursal = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true,
    };

  }


  async cargarCitabyId(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.citasTelemarketingService.obtenerCitasTelemarketingById(id)
      .subscribe((resp: any) => {
        this.citaTelemarketingSeleccionada = resp.data;
        this.LlenarForm(resp);
      });
  }

  LlenarForm(resp: any) {
    const {
      revisado,
      fecha,
      idMarca,
      estado,
      nombreApellidoRepresentante,
      telefono,
      ciudad,
      actividadEconomica,
      estudiante,
      observaciones,
      tarjeraCredito,
      tarjeta,
      forma,
      idSucursal,
      fechaCita,
      email,
      asignado,
      codigoLead,
      observacionesAsesor
    } = resp.data;
    this.citaTelemarketingSeleccionada = resp.data;
    this.registerForm.setValue({
      revisado,
      fecha,
      idMarca,
      estado,
      nombreApellidoRepresentante,
      telefono,
      ciudad,
      actividadEconomica,
      estudiante,
      observaciones,
      tarjeraCredito,
      tarjeta,
      forma,
      idSucursal,
      fechaCita,
      email,
      asignado,
      codigoLead,
      observacionesAsesor
    });

    this.estudiantes = estudiante;
  }


  public registerForm = this.fb.group({
    revisado: [null],
    fecha: [null],
    idMarca: [null],
    estado: [null],
    nombreApellidoRepresentante: [null],
    telefono: [null],
    ciudad: [null],
    actividadEconomica: [null],
    estudiante: [null],
    observaciones: [null],
    tarjeraCredito: [null],
    tarjeta: [null],
    forma: [null],
    idSucursal: [null],
    fechaCita: [null],
    email: [null],
    asignado: [null],
    codigoLead: [null],
    observacionesAsesor: [null],
  });



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

  crearCitasTelemarketing() {
    if (this.citaTelemarketingSeleccionada) {
      //actualizar
      this.citaTelemarketingModel = this.registerForm.value;

      this.citaTelemarketingModel.estudiante = this.estudiantes;

      //ID de las Sucursales
      let sucursalLista: any = [];
      this.sucursal.forEach((element: any) => {
        sucursalLista.push(element.item_id);
      });
      this.citaTelemarketingModel.idSucursal = sucursalLista;
      //ID de las Marcas
      let marcaLista: any = [];
      this.marca.forEach((element: any) => {
        marcaLista.push(element.item_id);
      });
      this.citaTelemarketingModel.idMarca = marcaLista;
      //ID de las Personas
      let personaLista: any = [];
      this.asesor.forEach((element: any) => {
        personaLista.push(element.item_id);
      });
      this.citaTelemarketingModel.asignado = personaLista;

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
        this.citasTelemarketingService
          .updateCitasTelemarketing(
            this.citaTelemarketingSeleccionada._id,
            this.citaTelemarketingModel
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
              this.router.navigateByUrl('/listacitas');
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

      this.citaTelemarketingModel = this.registerForm.value;

      this.citaTelemarketingModel.estudiante = this.estudiantes;

      //ID de las Sucursales
      let sucursalLista: any = [];
      this.sucursal.forEach((element: any) => {
        sucursalLista.push(element.item_id);
      });
      this.citaTelemarketingModel.idSucursal = sucursalLista;
      //ID de las Marcas
      let marcaLista: any = [];
      this.marca.forEach((element: any) => {
        marcaLista.push(element.item_id);
      });
      this.citaTelemarketingModel.idMarca = marcaLista;
      //ID de las Personas
      let personaLista: any = [];
      this.asesor.forEach((element: any) => {
        personaLista.push(element.item_id);
      });
      this.citaTelemarketingModel.asignado = personaLista;

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
        this.citasTelemarketingService
          .crearCitasTelemarketing(this.citaTelemarketingModel)
          .subscribe(
            (resp) => {
              console.log(resp);
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

              this.router.navigateByUrl('/listacitas');
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

  cancelarGuardado() {
    this.router.navigateByUrl('/listacitas');
  }

  recuperarDatosMarcas() {


    this.marcaService.getAllMarcas().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;
      if (this.citaTelemarketingSeleccionada) {
        this.citaTelemarketingSeleccionada.idMarca.map((m: any) => {
          const findMarcaPersona = this.dropdownListMarcas.find(
            (item: any) => item.item_id === m
          );
          if (findMarcaPersona) {
            this.onItemSelectmarca(findMarcaPersona);
            this.registerForm.get('idMarca')?.setValue(this.marca);
          }
        });
      }

    });

  }

  recuperarDatosPersonas() {
    this.personaService.getAllPersonas().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListAsesores = nombrePersonas;
      if (this.citaTelemarketingSeleccionada) {
        this.citaTelemarketingSeleccionada.idMarca.map((m: any) => {
          const findMarcaPersona = this.dropdownListMarcas.find(
            (item: any) => item.item_id === m
          );
          if (findMarcaPersona) {
            this.onItemSelectmarca(findMarcaPersona);
            this.registerForm.get('asignado')?.setValue(this.asesor);
          }
        });
      }

    });

  }

  recuperarDatosSucursales() {
    this.sucursalService.getAllSucursales().subscribe((resp: any) => {
      let nombreSucursal: any = [];
      resp.data.forEach((element: any) => {
        nombreSucursal.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListSucursales = nombreSucursal;

      if (this.citaTelemarketingSeleccionada) {
        this.citaTelemarketingSeleccionada.idSucursal.map((s: any) => {
          const findSucursalPersona = this.dropdownListSucursales.find(
            (item: any) => item.item_id === s
          );
          if (findSucursalPersona) {
            this.onItemSelectsucursal(findSucursalPersona);
            this.registerForm.get('idSucursal')?.setValue(this.sucursal);
          }
        });
      }
    });
  }

  actualizarfechaCampo() {
    console.log('Entre');
  }

  verDatos() {
    console.log(this.registerForm.value);

  }


  /** MARCA */
  /** Item Seleccionado */
  onItemSelectmarca(item: any) {
    this.marca.push(item);
    console.log(this.marca);
  }
  /** Todos los items Seleccionados */
  onSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }
  /** Deselccionar item */
  findByItemIdIndexMarca(id: any) {
    return this.marca.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectmarca(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexMarca(item.item_id);
    const newArray = (index > -1) ? [
      ...this.marca.slice(0, index),
      ...this.marca.slice(index + 1)
    ] : this.marca;
    this.marca = newArray;
    console.log(this.marca);
  }
  /** Deselccionar todos los items */
  onDeSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }


  /** Persona */
  /** Item Seleccionado */
  onItemSelectAsesor(item: any) {
    this.asesor.push(item);
    console.log(this.asesor);
  }
  /** Todos los items Seleccionados */
  onSelectAllAsesor(items: any) {
    this.asesor = items;
    console.log(this.asesor);
  }
  /** Deselccionar item */
  findByItemIdIndexAsesor(id: any) {
    return this.asesor.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectAsesor(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexAsesor(item.item_id);
    const newArray = (index > -1) ? [
      ...this.asesor.slice(0, index),
      ...this.asesor.slice(index + 1)
    ] : this.asesor;
    this.asesor = newArray;
    console.log(this.asesor);
  }
  /** Deselccionar todos los items */
  onDeSelectAllAsesor(items: any) {
    this.asesor = items;
    console.log(this.asesor);
  }

  /** SUCRUSAL */
  /** Item Seleccionado */
  onItemSelectsucursal(item: any) {
    this.sucursal.push(item);
    console.log(this.sucursal);
  }
  /** Todos los items Seleccionados */
  onSelectAllsucursal(items: any) {
    this.sucursal = items;
    console.log(this.sucursal);
  }
  /** Deselccionar item */
  findByItemIdIndexSucursal(id: any) {
    return this.sucursal.findIndex((resp: any) => {
      return resp.item_id === id;
    });
  }
  onDeSelectsucursal(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexSucursal(item.item_id);
    const newArray =
      index > -1
        ? [...this.sucursal.slice(0, index), ...this.sucursal.slice(index + 1)]
        : this.sucursal;
    this.sucursal = newArray;
    console.log(this.sucursal);
  }
  /** Deselccionar todos los items */
  onDeSelectAllsucursal(items: any) {
    this.sucursal = items;
    console.log(this.sucursal);
  }


  abrirModalEstudiantes() {
    this.mostraModalEstudiantes = false;

  }

  cerrarModalEstudiantes() {
    this.mostraModalEstudiantes = true;
    this.nombreEstudiante.nativeElement.value = null;
    this.edadEstudiante.nativeElement.value = null;
    this.observacionesEstudiante.nativeElement.value = null;
    this.editaEstudiante = false;
  }

  agregarEstudiante() {
    this.editaEstudiante = false;
    this.estudiantes.push({
      nombre: this.nombreEstudiante.nativeElement.value,
      edad: this.edadEstudiante.nativeElement.value,
      observaciones: this.observacionesEstudiante.nativeElement.value
    });

    this.cerrarModalEstudiantes();
  }

  editarEstudiante() {
    this.estudiantes[this.index].nombre = this.nombreEstudiante.nativeElement.value;
    this.estudiantes[this.index].edad = this.edadEstudiante.nativeElement.value;
    this.estudiantes[this.index].observaciones = this.observacionesEstudiante.nativeElement.value;
    this.cerrarModalEstudiantes();
    this.editaEstudiante = false;
  }

  cargarEstudiante(i: number) {
    this.editaEstudiante = true;
    this.abrirModalEstudiantes();
    this.index = i;
    this.nombreEstudiante.nativeElement.value = this.estudiantes[i].nombre;
    this.edadEstudiante.nativeElement.value = this.estudiantes[i].edad;
    this.observacionesEstudiante.nativeElement.value = this.estudiantes[i].observaciones;
  }



  eliminarEstudiante(i: number) {
    this.estudiantes.splice(i, 1);
  }

}
