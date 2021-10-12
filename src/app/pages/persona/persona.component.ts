import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from './persona.service';
import Swal from 'sweetalert2'
import { Persona } from '../../models/persona.model';
import { CiudadService } from '../services/ciudad.service';
import { async } from '@angular/core/testing';
import { SucursalService } from '../services/sucursal.service';
import { MarcaService } from '../services/marca.service';



@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: []
})
export class PersonaComponent implements OnInit {

  dropdownListCiudades: any = [];
  dropdownListSucursales: any = [];
  dropdownListMarcas: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  ciudad: any = [];
  sucursal: any = [];
  marca: any = [];


  constructor(private fb: FormBuilder,
    private personaService: PersonaService,
    private ciudadService: CiudadService,
    private sucursalService: SucursalService,
    private marcaService: MarcaService
  ) {

  }


  /*
    public registerForm = this.fb.group({
      estado: [true, Validators.required],
      idCiudad: [['612f9f1d43f77418a0b889d1'], Validators.required],
      idSucursal: [['6131343124e34827ac19792c']],
      idMarca: [['6131076e86f44c1c4c26ca10']],
      nombresApellidos: ['David Tamayo', Validators.required],
      email: ['d1916@gmail.com', [Validators.required, Validators.email]],
      password: ['123'],
      cedula: ['1804778023'],
      telefono: ['0987284902'],
      telefonoDomicilio: ['0954854945'],
      fechaNacimiento: ['04/10/2021'],
      direccion: ['Quito'],
      genero: ['Masculino'],
      fotoPerfil: [''],
      fotoCedula1: [''],
      fotoCedula2: [''],
      fechaIngresoEmpresa: ['04/10/2021'],
      numeroCuenta: ['123456789']
    });
  */


  PersonaModel = new Persona('Marketing', [], [], [], '', '', '', '', '', '', new Date(), '', '', true, '', '', '', new Date(), 0);

  onSubmit(f: NgForm) {
    
    //ID de las ciudades
    let ciudadLista:any = [];
    this.ciudad.forEach((element:any) => {
      ciudadLista.push(element.item_id);
    });
    this.PersonaModel.idCiudad=ciudadLista;
    //ID de las Sucursales
    let sucursalLista:any = [];
    this.sucursal.forEach((element:any) => {
      sucursalLista.push(element.item_id);
    });
    this.PersonaModel.idSucursal=sucursalLista;
    //ID de las Marcas
    let marcaLista:any = [];
    this.marca.forEach((element:any) => {
      marcaLista.push(element.item_id);
    });
    this.PersonaModel.idMarca=marcaLista;

    console.log(this.PersonaModel);
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

      Toast.fire({
        icon: 'error',
        title: 'ERROR: ' + err.error
      })
    });
  }
  /*
    crearPersona() {
      console.log(this.registerForm.value);
      if (this.registerForm.invalid) {
        return;
      }
      //Guardar los datos con el servicio
      this.personaService.crearPersona(this.registerForm.value)
        .subscribe((resp) =>{
          console.log("Persona creada");
          console.log(resp);
          
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
        }, (err:any)=> {
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
          
          Toast.fire({
            icon: 'error',
            title: 'ERROR: '+err.error
          })
        });
    }
  
    campoNoValido(campo:any):boolean{
      if (this.registerForm.get(campo)?.invalid  ) {
        return true;
      }
      else{
        return false;
      }
    }
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

  ngOnInit(): void {
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
  findByItemIdIndexCiudad(id:any){
    return this.ciudad.findIndex((resp:any)=>{
      return resp.item_id === id;
    })
  }
  onDeSelect(item: any) {
    const index = this.findByItemIdIndexCiudad(item.item_id);
    const newArray = (index > -1) ? [
      ...this.ciudad.slice(0, index),
      ...this.ciudad.slice(index + 1)
    ] : this.ciudad;
    this.ciudad = newArray;
    console.log(this.ciudad);
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
  findByItemIdIndexSucursal(id:any){
    return this.sucursal.findIndex((resp:any)=>{
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
  findByItemIdIndexMarca(id:any){
    return this.marca.findIndex((resp:any)=>{
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
