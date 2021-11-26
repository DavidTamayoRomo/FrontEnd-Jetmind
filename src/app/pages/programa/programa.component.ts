import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from '../persona/persona.service';
import { CiudadService } from '../services/ciudad.service';
import { SucursalService } from '../services/sucursal.service';
import { MarcaService } from '../services/marca.service';
import { NombreProgramaService } from '../services/nombre-programa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Programa } from './programa.model';
import { Validators, FormBuilder } from '@angular/forms';
import { ProgramaService } from '../services/programa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styles: [
  ]
})
export class ProgramaComponent implements OnInit {

  public dropdownListCiudades: any = [];
  public dropdownListSucursales: any = [];
  public dropdownListMarcas: any = [];
  public dropdownListNombreProgramas: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public ciudad: any = [];
  public sucursal: any = [];
  public marca: any = [];
  public nombrePrograma: any = [];
  public programaSeleccionada: any;

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private ciudadService: CiudadService,
    private sucursalService: SucursalService,
    private marcaService: MarcaService,
    private nombreProgramaService: NombreProgramaService,
    private programaService: ProgramaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarProgramabyId(id);
    });
    /** Servicio que me devuelva las CIUDADES de la base de datos */
    this.recuperarDatosCiudad();
    /** Servicio que me devuelva las SUCURSALES de la base de datos */
    this.recuperarDatosSucursales();
    /** Servicio que me devuelva las MARCAS de la base de datos */
    this.recuperarDatosMarcas();
    /** Servicio que me devuelva las ROLE de la base de datos */
    this.recuperarDatosnombreProgramas();


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  ProgramaModel = new Programa();

  /** 
   * ====================================================================
   * Ractive form 
   * ====================================================================
   * */
  public registerForm = this.fb.group({
    idMarca: [null, Validators.required],
    idCiudad: [null, Validators.required],
    idSucursal: [null, Validators.required],
    idNombrePrograma: [null, Validators.required],
    idEstudiante: [null],
  });

  async crearPrograma() {

    if (this.programaSeleccionada) {
      //Actualizar

      this.ProgramaModel = this.registerForm.value;
      //ID de las Marcas
      let marcaLista: any = [];
      const marcaEspera = await this.marca.forEach((element: any) => {
        if (element.item_id) {
          marcaLista.push(element.item_id);
        } else {
          marcaLista.push(element);
        }
      });
      this.ProgramaModel.idMarca = marcaLista;
      //ID de las Sucursales
      let sucursalLista: any = [];
      const sucursalEspera = await this.sucursal.forEach((element: any) => {
        if (element.item_id) {
          sucursalLista.push(element.item_id);
        } else {
          sucursalLista.push(element);
        }
      });
      this.ProgramaModel.idSucursal = sucursalLista;
      //ID de las ciudades
      let ciudadLista: any = [];
      const ciudadEspera = await this.ciudad.forEach((element: any) => {
        if (element.item_id) {
          ciudadLista.push(element.item_id);
        } else {
          ciudadLista.push(element);
        }
      });
      this.ProgramaModel.idCiudad = ciudadLista;

      //ID de las nombrePorgrama
      let nombreProgramaLista: any = [];
      const nombreProgramaEspera = await this.nombrePrograma.forEach((element: any) => {
        if (element.item_id) {
          nombreProgramaLista.push(element.item_id);
        } else {
          nombreProgramaLista.push(element);
        }
      });
      this.ProgramaModel.idNombrePrograma = nombreProgramaLista;


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

        this.programaService.updatePrograma(this.programaSeleccionada._id, this.ProgramaModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listapersonas');
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

        //Formulario VALIDO
        //Guardar los datos con el servicio
        this.ProgramaModel = this.registerForm.value;

        //ID de las ciudades
        let ciudadLista: any = [];
        this.ciudad.forEach((element: any) => {
          ciudadLista.push(element.item_id);
        });
        this.ProgramaModel.idCiudad = ciudadLista;
        //ID de las Sucursales
        let sucursalLista: any = [];
        this.sucursal.forEach((element: any) => {
          sucursalLista.push(element.item_id);
        });
        this.ProgramaModel.idSucursal = sucursalLista;
        //ID de las Marcas
        let marcaLista: any = [];
        this.marca.forEach((element: any) => {
          marcaLista.push(element.item_id);
        });
        this.ProgramaModel.idMarca = marcaLista;

        //ID de las Nombre programa
        let nombreProgramaLista: any = [];
        this.nombrePrograma.forEach((element: any) => {
          nombreProgramaLista.push(element.item_id);
        });
        this.ProgramaModel.idNombrePrograma = nombreProgramaLista;

        this.programaService.crearPrograma(this.ProgramaModel).subscribe((resp) => {

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

          this.router.navigateByUrl('/listaprogramas');
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
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }


  LlenarForm(resp: any) {
    const {
      idMarca,
      idCiudad,
      idSucursal,
      idNombrePrograma,
      idEstudiante,
    } = resp.data;
    this.programaSeleccionada = resp.data;
    this.registerForm.setValue({
      idMarca,
      idCiudad,
      idSucursal,
      idNombrePrograma,
      idEstudiante,
    });
  }

  async cargarProgramabyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.programaService.obtenerProgramaById(id)
      .subscribe((resp: any) => {
        this.programaSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

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
  recuperarDatosnombreProgramas() {
    this.nombreProgramaService.getAllnombrePrograma().subscribe((resp: any) => {
      let nombrePrograma: any = [];
      resp.data.forEach((element: any) => {
        nombrePrograma.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListNombreProgramas = nombrePrograma;

    });
  }

  cancelarGuardado(){
    this.router.navigateByUrl('/listapersonas')
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


  /** Nombre Programa */
  /** Item Seleccionado */
  onItemSelectNombrePrograma(item: any) {
    this.nombrePrograma.push(item);
    console.log(this.nombrePrograma);
  }
  /** Todos los items Seleccionados */
  onSelectAllNombrePrograma(items: any) {
    this.nombrePrograma = items;
    console.log(this.nombrePrograma);
  }
  /** Deselccionar item */
  findByItemIdIndexNombrePrograma(id: any) {
    return this.nombrePrograma.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectNombrePrograma(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexNombrePrograma(item.item_id);
    const newArray = (index > -1) ? [
      ...this.nombrePrograma.slice(0, index),
      ...this.nombrePrograma.slice(index + 1)
    ] : this.nombrePrograma;
    this.nombrePrograma = newArray;
    console.log(this.nombrePrograma);
  }
  /** Deselccionar todos los items */
  onDeSelectAllNombrePrograma(items: any) {
    this.nombrePrograma = items;
    console.log(this.nombrePrograma);
  }


}
