import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from './persona.service';
import Swal from 'sweetalert2'
import { Persona } from '../../models/persona.model';



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



  constructor(private fb: FormBuilder, private personaService:PersonaService) { }


  /**Prueba para ver si funciona en el celular */
  PersonaModel = new Persona('Marketing','','','','','','','','','',new Date(),'','','','','','',new Date(),13);
  
  onSubmit(f: NgForm){
    this.personaService.crearPersona(this.PersonaModel).subscribe((resp) =>{
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


  ngOnInit(): void {
    //TODO: Servicio que me devuelva las CIUDADES de la base de datos
    this.dropdownListCiudades = [
      "Quito",
      "Ambato",
      "Cuenca",
      "Latacunga",
      "612f9f1d43f77418a0b889d1"
    ];
    //TODO: Servicio que me devuelva las SUCURSALES de la base de datos
    this.dropdownListSucursales = [
      "El bosque",
      "Villaflora",
      "Condado",
      "San Rafael",
      "6131343124e34827ac19792c"
    ];
    //TODO: Servicio que me devuelva las MARCAS de la base de datos
    this.dropdownListMarcas = [
      "Charlotte",
      "Tomatis",
      "Ilvem",
      "UK",
      "6131076e86f44c1c4c26ca10"
    ];

    this.dropdownSettings = {
      singleSelection: false,
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
  onDeSelect(item: any) {
    /** Borrar elemento del array  */
    const index = this.ciudad.indexOf(item);
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
  onDeSelectsucursal(item: any) {
    /** Borrar elemento del array  */
    const index = this.sucursal.indexOf(item);
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
  onDeSelectmarca(item: any) {
    /** Borrar elemento del array  */
    const index = this.marca.indexOf(item);
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
