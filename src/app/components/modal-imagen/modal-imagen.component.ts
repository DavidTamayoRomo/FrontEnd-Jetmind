import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, Input } from '@angular/core';
import { ModalUploadService } from '../../services/modal-upload.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CiudadService } from '../../pages/services/ciudad.service';
import { SucursalService } from '../../pages/services/sucursal.service';
import { MarcaService } from '../../pages/services/marca.service';
import { NombreProgramaService } from '../../pages/services/nombre-programa.service';
import { ProgramaService } from '../../pages/services/programa.service';
import { Estudiante } from '../../pages/estudiante/estudiante.model';
import { Programa } from '../../pages/programa/programa.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

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

  public estudiante: Estudiante = new Estudiante();
  public programa: Programa = new Programa();
  public objetoEstudiatePrograma: any;
  public objetosEstudiatePrograma: any = [];

  @Output() emitirEstudianteNuevo = new EventEmitter();

  @ViewChild("nombresApellidos1", { static: true }) nombresApellidos1: ElementRef;

  constructor(
    public modalImagenServices: ModalUploadService,
    private fb: FormBuilder,
    private ciudadService: CiudadService,
    private sucursalService: SucursalService,
    private marcaService: MarcaService,
    private nombreProgramaService: NombreProgramaService,
    private programaService: ProgramaService
  ) { }

  ngOnInit(): void {
    this.cerrarModal();
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

  public setRegisterForm(nombre: any) {
    this.registerForm.controls.nombresApellidos.setValue(nombre)
  }

  public registerForm = this.fb.group({
    nombresApellidos: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    cedula: [null, Validators.required],
    telefono: [null, Validators.required],
    fechaNacimiento: [null, Validators.required],
    direccion: [null],
    genero: [null],
    estado: ['Espera'],
    idMarca: [null, Validators.required],
    idCiudad: [null, Validators.required],
    idSucursal: [null, Validators.required],
    idNombrePrograma: [null, Validators.required],
  });

  cerrarModal() {
    this.modalImagenServices.cerrarModal();

    //limpiar los campos
    this.registerForm.reset();

  }

  crearEstudiante() {
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
      console.log(this.registerForm.value);
      this.estudiante.nombresApellidos = this.registerForm.value.nombresApellidos;
      this.estudiante.email = this.registerForm.value.email;
      this.estudiante.cedula = this.registerForm.value.cedula;
      this.estudiante.telefono = this.registerForm.value.telefono;
      this.estudiante.fechaNacimiento = this.registerForm.value.fechaNacimiento;
      this.estudiante.direccion = this.registerForm.value.direccion;
      this.estudiante.genero = this.registerForm.value.genero;
      this.estudiante.estado = this.registerForm.value.estado;

      this.programa.idMarca = this.registerForm.value.idMarca;
      this.programa.idCiudad = this.registerForm.value.idCiudad;
      this.programa.idSucursal = this.registerForm.value.idSucursal;
      this.programa.idNombrePrograma = this.registerForm.value.idNombrePrograma;

      this.objetoEstudiatePrograma = { 'estudiante': this.estudiante, 'programa': this.programa };
      console.log(this.objetoEstudiatePrograma);
      let objetoEP = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);
      if (objetoEP != null) {
        //agregar mas items
        let duplicado = objetoEP;
        duplicado.push(this.objetoEstudiatePrograma);
        localStorage.setItem('objetosEstudiatePrograma', JSON.stringify(duplicado));

      } else {
        //primer item
        this.objetosEstudiatePrograma = [this.objetoEstudiatePrograma]
        localStorage.setItem('objetosEstudiatePrograma', JSON.stringify(this.objetosEstudiatePrograma));
      }

      this.emitirEstudianteNuevo.emit(this.objetoEstudiatePrograma);

      //cerrar modal
      this.modalImagenServices.cerrarModal();

      setTimeout(() => {
        //limpiar campos del formulario
        this.registerForm.reset();
      }, 600);
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
