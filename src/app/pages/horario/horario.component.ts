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

  @ViewChild('Lunes') Lunes: ElementRef;
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
      singleSelection: true,
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
      /* this.Lunes.nativeElement.checked = true;
      this.Martes.nativeElement.checked = false;
      this.Miercoles.nativeElement.checked = false;
      this.Jueves.nativeElement.checked = false;
      this.Viernes.nativeElement.checked = false;
      this.Sabado.nativeElement.checked = false;
      this.Domingo.nativeElement.checked = false; */
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
      estado,
      modulo_nivel
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
      estado,
      modulo_nivel
    });
    this.listaDias = dias;
    dias.map((dia: any) => {
      if (dia == 'Lunes') {
        this.Lunes.nativeElement.checked = true;
      }
      if (dia == 'Martes') {
        this.Martes.nativeElement.checked = true;
      }
      if (dia == 'Miercoles') {
        this.Miercoles.nativeElement.checked = true;
      } 
      if (dia == 'Jueves') {
        this.Jueves.nativeElement.checked = true;
      }
      if (dia == 'Viernes') {
        this.Viernes.nativeElement.checked = true;
      }
      if (dia == 'Sabado') {
        this.Sabado.nativeElement.checked = true;
      } 
    });
    
  }

  public registerForm = this.fb.group({
    estado: [true],
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
    this.ciudadService.getAllCiudadesSinLimite().subscribe((resp: any) => {
      let nombreciudades: any = [];
      resp.data.forEach((element: any) => {
        nombreciudades.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListCiudades = nombreciudades;
      if (this.horarioSeleccionada) {
        
        const findCiudadPersona = this.dropdownListCiudades.find(
          (item: any) => {
            return item.item_id === this.horarioSeleccionada.idCiudad;
          }
        );
        if (findCiudadPersona) {
          this.onItemSelect(findCiudadPersona);
          this.registerForm.get('idCiudad')?.setValue(this.ciudad);
        }
        
      }
    });
  }

  recuperarDatosMarcas() {
    this.marcaService.getAllMarcasSinLimite().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;
      if (this.horarioSeleccionada) {
        const findMarcaPersona = this.dropdownListMarcas.find(
          (item: any) => item.item_id === this.horarioSeleccionada.idMarca
        );
        if (findMarcaPersona) {
          this.onItemSelectmarca(findMarcaPersona);
          this.registerForm.get('idMarca')?.setValue(this.marca);
        }
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
    this.ciudad=[item];
  }
  /** Todos los items Seleccionados */
  onSelectAll(items: any) {
    this.ciudad = items;
  }
  /** Deselccionar item */
  onDeSelect(item: any) {
    //verificar esto no se queda asi
    this.ciudad = [];
  }

  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.ciudad = items;
  }


  /** MARCA */
  /** Item Seleccionado */
  onItemSelectmarca(item: any) {
    this.marca=[item];
  }
  /** Todos los items Seleccionados */
  onSelectAllmarca(items: any) {
    this.marca = items;
  }
  /** Deselccionar item */
  onDeSelectmarca(item: any) {
    /** Borrar elemento del array  */
    this.marca = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllmarca(items: any) {
    this.marca = items;
  }

}
