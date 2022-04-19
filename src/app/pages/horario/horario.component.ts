import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Horario } from './horario.model';
import { HorarioService } from '../services/horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CiudadService } from '../services/ciudad.service';
import { MarcaService } from '../services/marca.service';

import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styles: [
  ]
})
export class HorarioComponent implements OnInit {

  public horarioSeleccionada: any;
  HorarioModel = new Horario();

  public listaDias: any = [];

  @ViewChild('Lunes') Lunes1: ElementRef;
  @ViewChild('Martes') Martes: ElementRef;
  @ViewChild('Miercoles') Miercoles: ElementRef;
  @ViewChild('Jueves') Jueves: ElementRef;
  @ViewChild('Viernes') Viernes: ElementRef;
  @ViewChild('Sabado') Sabado: ElementRef;
  @ViewChild('Domingo') Domingo: ElementRef;

  public dropdownListCiudades: any = [];
  public dropdownListMarcas: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public ciudad: any = [];
  public marca: any = [];

  constructor(
    private fb: FormBuilder,
    private horarioService: HorarioService,
    private ciudadService: CiudadService,
    private marcaService: MarcaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarHorariosbyId(id);
    });

    /** Servicio que me devuelva las CIUDADES de la base de datos */
    this.recuperarDatosCiudad();
    /** Servicio que me devuelva las MARCAS de la base de datos */
    this.recuperarDatosMarcas();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true,
    };


  }

  async cargarHorariosbyId(id: string) {

    if (id === 'nuevo') {
      this.Lunes1.nativeElement.checked = false;
      this.Martes.nativeElement.checked = false;
      this.Miercoles.nativeElement.checked = false;
      this.Jueves.nativeElement.checked = false;
      this.Viernes.nativeElement.checked = false;
      this.Sabado.nativeElement.checked = false;
      this.Domingo.nativeElement.checked = false;
      return;
    }

    this.horarioService.obtenerHorarioById(id)
      .subscribe((resp: any) => {
        this.horarioSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp: any) {
    const {
      idCiudad,
      idMarca,
      nombre,
      dias,
      modalidad,
      horaInicio,
      horaFin,
      estado
    } = resp.data;
    this.horarioSeleccionada = resp.data;
    console.log(this.horarioSeleccionada);
    this.registerForm.setValue({
      idCiudad,
      idMarca,
      nombre,
      dias,
      modalidad,
      horaInicio,
      horaFin,
      estado
    });
  }

  public registerForm = this.fb.group({
    estado: [null],
    idCiudad: [null, Validators.required],
    idMarca: [null, Validators.required],
    nombre: [null, Validators.required],
    dias: [this.listaDias],
    modalidad: [null, Validators.required],
    horaInicio: [null],
    horaFin: [null],
    modulo_nivel: [null, Validators.required],
  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }


  async crearHorario() {

    if (this.horarioSeleccionada) {
      //actualizar
      this.HorarioModel = this.registerForm.value;
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



        //ID de las Marcas
        let marcaLista: any = [];
        const marcaEspera = await this.marca.forEach((element: any) => {
          if (element.item_id) {
            marcaLista.push(element.item_id);
          } else {
            marcaLista.push(element);
          }
        });
        this.HorarioModel.idMarca = marcaLista;
        //ID de las ciudades
        let ciudadLista: any = [];
        const ciudadEspera = await this.ciudad.forEach((element: any) => {
          if (element.item_id) {
            ciudadLista.push(element.item_id);
          } else {
            ciudadLista.push(element);
          }
        });
        this.HorarioModel.idCiudad = ciudadLista;

        this.horarioService.updateHorario(this.horarioSeleccionada._id, this.HorarioModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listahorarios');
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
      this.HorarioModel = this.registerForm.value;
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

        //ID de las Marcas
        let marcaLista: any = [];
        const marcaEspera = await this.marca.forEach((element: any) => {
          if (element.item_id) {
            marcaLista.push(element.item_id);
          } else {
            marcaLista.push(element);
          }
        });
        this.HorarioModel.idMarca = marcaLista;
        //ID de las ciudades
        let ciudadLista: any = [];
        const ciudadEspera = await this.ciudad.forEach((element: any) => {
          if (element.item_id) {
            ciudadLista.push(element.item_id);
          } else {
            ciudadLista.push(element);
          }
        });
        this.HorarioModel.idCiudad = ciudadLista;

        this.horarioService.crearHorario(this.HorarioModel).subscribe((resp) => {
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

          this.router.navigateByUrl('/listahorarios');
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


  cancelarGuardado() {
    this.router.navigateByUrl('/listahorarios');
  }

  recuperarDatosCiudad() {
    this.ciudadService.getAllCiudades().subscribe((resp: any) => {
      let nombreciudades: any = [];
      resp.data.forEach((element: any) => {
        nombreciudades.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListCiudades = nombreciudades;
      if (this.horarioSeleccionada) {

        this.onItemSelect(this.horarioSeleccionada.idCiudad);

        /* this.horarioSeleccionada.idCiudad.map((c: any) => {
          const findCiudadPersona = this.dropdownListCiudades.find(
            (item: any) => {
              return item.item_id === c;
            }
          );
          if (findCiudadPersona) {
            this.onItemSelect(this.horarioSeleccionada.idCiudad);
            this.registerForm.get('idCiudad')?.setValue(this.ciudad);
          }
        }); */
      }
    });
  }

  recuperarDatosMarcas() {
    this.marcaService.getAllMarcas().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;
      if (this.horarioSeleccionada) {
        this.onItemSelectmarca(this.horarioSeleccionada.idMarca);
        /* this.horarioSeleccionada.idMarca.map((m: any) => {
          const findMarcaPersona = this.dropdownListMarcas.find(
            (item: any) => item.item_id === m
          );
          if (findMarcaPersona) {
            this.onItemSelectmarca(findMarcaPersona);
            this.registerForm.get('idMarca')?.setValue(this.marca);
          }
        }); */
      }
    });
  }

  diaSemana(dia: string) {
    const variable = this.listaDias.includes(dia);
    if (variable) {
      this.listaDias.splice(this.listaDias.indexOf(dia), 1);
    } else {
      this.listaDias.push(dia);
    }
  }

  /** CIUDAD */
  /** Item Seleccionado */
  onItemSelect(item: any) {
    this.ciudad.push(item);
    console.log(this.ciudad);
  }
  /** Todos los items Seleccionados */
  onSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }
  /** Deselccionar item */
  findByItemIdIndexCiudad(id: any) {
    return this.ciudad.findIndex((resp: any) => {
      return resp.item_id === id;
    });
  }
  onDeSelect(item: any) {
    //verificar esto no se queda asi
    console.log(item);
    console.log('entre');
    if (item.item_id) {
      console.log('entre 1');
      const index = this.findByItemIdIndexCiudad(item.item_id);
      const newArray =
        index > -1
          ? [...this.ciudad.slice(0, index), ...this.ciudad.slice(index + 1)]
          : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    } else {
      console.log('entre 2');
      const index = this.ciudad.indexOf(item);
      const newArray =
        index > -1
          ? [...this.ciudad.slice(0, index), ...this.ciudad.slice(index + 1)]
          : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    }
  }

  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
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
    });
  }
  onDeSelectmarca(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexMarca(item.item_id);
    const newArray =
      index > -1
        ? [...this.marca.slice(0, index), ...this.marca.slice(index + 1)]
        : this.marca;
    this.marca = newArray;
    console.log(this.marca);
  }
  /** Deselccionar todos los items */
  onDeSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }

}
