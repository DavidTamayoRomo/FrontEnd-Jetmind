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
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: [],
})
export class PersonaComponent implements OnInit {
  public dropdownListCiudades: any = [];
  public dropdownListSucursales: any = [];
  public dropdownListMarcas: any = [];
  public dropdownListRole: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public ciudad: any = [];
  public sucursal: any = [];
  public marca: any = [];
  public role: any = [];
  public personaSeleccionada: any;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private ciudadService: CiudadService,
    private sucursalService: SucursalService,
    private marcaService: MarcaService,
    private roleService: RoleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
    /** Servicio que me devuelva las ROLE de la base de datos */
    this.recuperarDatosRole();

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

  PersonaModel = new Persona();
  /**
   * ====================================================================
   * Ractive form
   * ====================================================================
   * */
  public registerForm = this.fb.group({
    tipo: [null, Validators.required],
    estado: [true, Validators.required],
    idCiudad: [null, Validators.required],
    idSucursal: [null, Validators.required],
    idMarca: [null, Validators.required],
    nombresApellidos: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: { value: 'DavidHack1', disabled: true },
    cedula: [null, Validators.required],
    telefono: [null],
    telefonoDomicilio: [null],
    fechaNacimiento: [null, Validators.required],
    direccion: [null],
    genero: [null],
    fechaIngresoEmpresa: [null, Validators.required],
    numeroCuenta: [null],
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

      //ID de las ciudades
      let roleLista: any = [];
      const roleEspera = await this.role.forEach((element: any) => {
        if (element.item_id) {
          roleLista.push(element.item_id);
        } else {
          roleLista.push(element);
        }
      });
      this.PersonaModel.tipo = roleLista;

      console.log(this.PersonaModel);

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
        this.personaService
          .updatePersona(this.personaSeleccionada._id, this.PersonaModel)
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
              this.router.navigateByUrl('/listapersonas');
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
      //Crear
      console.log(this.registerForm.value);
      if (this.registerForm.invalid) {
        //Formulario invalido

        this.registerForm.get('tipo')?.invalid;

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

        //ID de las Role
        let roleLista: any = [];
        this.role.forEach((element: any) => {
          roleLista.push(element.item_id);
        });
        this.PersonaModel.tipo = roleLista;
        this.PersonaModel.password = 'DavidHack1';

        console.log(this.PersonaModel.tipo);
        this.personaService.crearPersona(this.PersonaModel).subscribe(
          (resp) => {
            console.log('Persona creada');
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

            this.router.navigateByUrl('/listapersonas');
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

  LlenarForm(resp: any) {
    const {
      tipo,
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
      numeroCuenta,
    } = resp.data;
    this.personaSeleccionada = resp.data;
    this.registerForm.setValue({
      tipo,
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
      numeroCuenta,
    });
  }

  async cargarPersonabyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.personaService.obtenerPersonaById(id).subscribe((resp: any) => {
      this.personaSeleccionada = resp.data;
      this.LlenarForm(resp);
    });
  }

  /**
   * ==========================================================
   * Funciones para recuperar datos de la base de datos
   * ==========================================================
   */

  recuperarDatosCiudad() {
    this.ciudadService.getAllCiudadesSinLimite().subscribe((resp: any) => {
      let nombreciudades: any = [];
      resp.data.forEach((element: any) => {
        nombreciudades.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListCiudades = nombreciudades;
      if (this.personaSeleccionada) {
        this.personaSeleccionada.idCiudad.map((c: any) => {
          const findCiudadPersona = this.dropdownListCiudades.find(
            (item: any) => {
              return item.item_id === c;
            }
          );
          if (findCiudadPersona) {
            this.onItemSelect(findCiudadPersona);
            this.registerForm.get('idCiudad')?.setValue(this.ciudad);
          }
        });
      }
    });
  }
  recuperarDatosSucursales() {
    this.sucursalService.getAllSucursalesSinLimite().subscribe((resp: any) => {
      let nombreSucursal: any = [];
      resp.data.forEach((element: any) => {
        nombreSucursal.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListSucursales = nombreSucursal;
      
      if (this.personaSeleccionada) {
        this.personaSeleccionada.idSucursal.map((s: any) => {
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
  recuperarDatosMarcas() {
    this.marcaService.getAllMarcasSinLimite().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;
      if (this.personaSeleccionada) {
        this.personaSeleccionada.idMarca.map((m: any) => {
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
  recuperarDatosRole() {
    this.roleService.getAllRole().subscribe((resp: any) => {
      let nombreRole: any = [];
      resp.data.forEach((element: any) => {
        nombreRole.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListRole = nombreRole;
      if (this.personaSeleccionada) {
        this.personaSeleccionada.tipo.map((t: any) => {
          const findRolePersona = this.dropdownListRole.find(
            (item: any) => item.item_id === t
          );
          if (findRolePersona) {
            this.onItemSelectRole(findRolePersona);
            this.registerForm.get('tipo')?.setValue(this.role);
          }
        });
      }
    });
  }

  cancelarGuardado() {
    this.router.navigateByUrl('/listapersonas');
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

  /** ROLE */
  /** Item Seleccionado */
  onItemSelectRole(item: any) {
    this.role.push(item);
    console.log(this.role);
  }
  /** Todos los items Seleccionados */
  onSelectAllRole(items: any) {
    this.role = items;
    console.log(this.role);
  }
  /** Deselccionar item */
  findByItemIdIndexRole(id: any) {
    return this.role.findIndex((resp: any) => {
      return resp.item_id === id;
    });
  }
  onDeSelectRole(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexRole(item.item_id);
    const newArray =
      index > -1
        ? [...this.role.slice(0, index), ...this.role.slice(index + 1)]
        : this.role;
    this.role = newArray;
    console.log(this.role);
  }
  /** Deselccionar todos los items */
  onDeSelectAllRole(items: any) {
    this.role = items;
    console.log(this.role);
  }
}
