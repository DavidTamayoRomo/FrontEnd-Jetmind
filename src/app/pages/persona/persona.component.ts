import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: [
  ]
})
export class PersonaComponent implements OnInit {

  dropdownListCiudades: any = [];
  dropdownListSucursales: any = [];
  dropdownListMarcas: any = [];
  selectedItems: any = [];
  dropdownSettings: IDropdownSettings = {};
  ciudad: any = [];
  sucursal:any = [];
  marca :any = [];

  constructor() { }

  ngOnInit(): void {
    //TODO: Servicio que me devuelva las CIUDADES de la base de datos
    this.dropdownListCiudades = [
      "Quito",
      "Ambato",
      "Cuenca",
      "Latacunga"
    ];
    //TODO: Servicio que me devuelva las SUCURSALES de la base de datos
    this.dropdownListSucursales = [
      "El bosque",
      "Villaflora",
      "Condado",
      "San Rafael"
    ];
    //TODO: Servicio que me devuelva las MARCAS de la base de datos
    this.dropdownListMarcas = [
      "Charlotte",
      "Tomatis",
      "Ilvem",
      "UK"
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


  /** Dropzone para imagenes */


}
