import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styles: [
  ]
})
export class PersonaComponent implements OnInit {

  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:IDropdownSettings = {};
  ciudad:any = [];

  constructor() { }

  ngOnInit(): void {
    this.dropdownList = [
      "Quito",
      "Ambato",
      "Cuenca",
      "Latacunga"
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
  onDeSelectAll (items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }
 
  

}
