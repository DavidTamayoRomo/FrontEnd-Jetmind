import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from './persona.service';
import Swal from 'sweetalert2';
import { Persona } from '../../models/persona.model';
import { CiudadService } from '../services/ciudad.service';
import { async } from '@angular/core/testing';
import { SucursalService } from '../services/sucursal.service';
import { MarcaService } from '../services/marca.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';



@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: []
})
export class PersonaComponent implements OnInit {

  public dropdownListCiudades: any = [];
  public dropdownListSucursales: any = [];
  public dropdownListMarcas: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public ciudad: any = [];
  public sucursal: any = [];
  public marca: any = [];
  public personaSeleccionada: any;



  constructor(private fb: FormBuilder,
    private personaService: PersonaService,
    private ciudadService: CiudadService,
    private sucursalService: SucursalService,
    private marcaService: MarcaService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarPersonabyId(id);
    });
    /** Servicio que me devuelva las CIUDADES de la base de datos */
    this.recuperarDatosCiudad();
    /** Servicio que me devuelva las SUCURSALES de la base de datos */
    this.recuperarDatosSucursales();
    /** Servicio que me devuelva las MARCAS de la base de datos */
    this.recuperarDatosMarcas();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  PersonaModel = new Persona('Marketing', [], [], [], '', '', '', '', '', '', new Date(), '', '', true, '', '', '', new Date(), 0);
  /** 
   * ====================================================================
   * Ractive form 
   * ====================================================================
   * */
  public registerForm = this.fb.group({
    estado: [true, Validators.required],
    idCiudad: [null, Validators.required],
    idSucursal: [null, Validators.required],
    idMarca: [null, Validators.required],
    nombresApellidos: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null],
    cedula: [null],
    telefono: [null],
    telefonoDomicilio: [null],
    fechaNacimiento: [null],
    direccion: [null],
    genero: [null],
    fechaIngresoEmpresa: [null],
    numeroCuenta: [null]
  });
  async crearPersona() {

    if (this.personaSeleccionada) {
      //Actualizar

      this.PersonaModel = this.registerForm.value;
      //ID de las Marcas
      let marcaLista: any = [];
      const marcaEspera = await this.marca.forEach((element: any) => {
        if (element.item_id) {
          marcaLista.push(element.item_id);
        } else {
          marcaLista.push(element);
        }
      });
      this.PersonaModel.idMarca = marcaLista;
      //ID de las Sucursales
      let sucursalLista: any = [];
      const sucursalEspera = await this.sucursal.forEach((element: any) => {
        if (element.item_id) {
          sucursalLista.push(element.item_id);
        } else {
          sucursalLista.push(element);
        }
      });
      this.PersonaModel.idSucursal = sucursalLista;
      //ID de las ciudades
      let ciudadLista: any = [];
      const ciudadEspera = await this.ciudad.forEach((element: any) => {
        if (element.item_id) {
          ciudadLista.push(element.item_id);
        } else {
          ciudadLista.push(element);
        }
      });
      this.PersonaModel.idCiudad = ciudadLista;


      console.log('Actualizar');
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
        this.personaService.updatePersona(this.personaSeleccionada._id, this.PersonaModel).subscribe((resp: any) => {
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

      //Crear
      console.log(this.registerForm.value);
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

        //Formulario VALIDO
        //Guardar los datos con el servicio
        this.PersonaModel = this.registerForm.value;

        //ID de las ciudades
        let ciudadLista: any = [];
        this.ciudad.forEach((element: any) => {
          ciudadLista.push(element.item_id);
        });
        this.PersonaModel.idCiudad = ciudadLista;
        //ID de las Sucursales
        let sucursalLista: any = [];
        this.sucursal.forEach((element: any) => {
          sucursalLista.push(element.item_id);
        });
        this.PersonaModel.idSucursal = sucursalLista;
        //ID de las Marcas
        let marcaLista: any = [];
        this.marca.forEach((element: any) => {
          marcaLista.push(element.item_id);
        });
        this.PersonaModel.idMarca = marcaLista;

        this.personaService.crearPersona(this.PersonaModel).subscribe((resp) => {
          console.log("Persona creada");
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

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid) {
      return true;
    }
    else {
      return false;
    }
  }


  LlenarForm(resp:any){
    const {
      estado,
      idCiudad,
      idSucursal,
      idMarca,
      nombresApellidos,
      email,
      password,
      cedula,
      telefono,
      telefonoDomicilio,
      fechaNacimiento,
      direccion,
      genero,
      fotoPerfil,
      fotoCedula1,
      fotoCedula2,
      fechaIngresoEmpresa,
      numeroCuenta
    } = resp.data;
    this.personaSeleccionada = resp.data;
    this.registerForm.setValue({
      estado,
      idCiudad,
      idSucursal,
      idMarca,
      nombresApellidos,
      email,
      password,
      cedula,
      telefono,
      telefonoDomicilio,
      fechaNacimiento,
      direccion,
      genero,
      fechaIngresoEmpresa,
      numeroCuenta
    });
  }

  async cargarPersonabyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.personaService.obtenerPersonaById(id)
      .subscribe((resp: any) => {
        this.personaSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

      //esto debe aparecer en el branch principal
  }

  /**
   * ==========================================================
   * Funciones para recuperar datos de la base de datos
   * ==========================================================
   */

  recuperarDatosCiudad() {
    this.ciudadService.getAllCiudades().subscribe((resp: any) => {
      let nombreciudades: any = [];
      resp.data.forEach((element: any) => {
        nombreciudades.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListCiudades = nombreciudades;
    });
  }
  recuperarDatosSucursales() {
    this.sucursalService.getAllSucursales().subscribe((resp: any) => {
      let nombreSucursal: any = [];
      resp.data.forEach((element: any) => {
        nombreSucursal.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListSucursales = nombreSucursal;
    });
  }
  recuperarDatosMarcas() {
    this.marcaService.getAllMarcas().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;

    });
  }


  /**
   * ===================================================
   *  Multi select dropDown
   * ===================================================
   */
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
    })
  }
  onDeSelect(item: any) {
    //verificar esto no se queda asi
    console.log(item);
    console.log("entre");
    if (item.item_id) {
      console.log("entre 1");
      const index = this.findByItemIdIndexCiudad(item.item_id);
      const newArray = (index > -1) ? [
        ...this.ciudad.slice(0, index),
        ...this.ciudad.slice(index + 1)
      ] : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    } else {
      console.log("entre 2");
      const index = this.ciudad.indexOf(item);
      const newArray = (index > -1) ? [
        ...this.ciudad.slice(0, index),
        ...this.ciudad.slice(index + 1)
      ] : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    }
  }


  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
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
    })
  }
  onDeSelectsucursal(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexSucursal(item.item_id);
    const newArray = (index > -1) ? [
      ...this.sucursal.slice(0, index),
      ...this.sucursal.slice(index + 1)
    ] : this.sucursal;
    this.sucursal = newArray;
    console.log(this.sucursal);
  }
  /** Deselccionar todos los items */
  onDeSelectAllsucursal(items: any) {
    this.sucursal = items;
    console.log(this.sucursal);
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



}
