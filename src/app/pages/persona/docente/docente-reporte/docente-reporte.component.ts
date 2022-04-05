import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AsignarHorariosEstudianteService } from 'src/app/pages/services/asignar-horarios-estudiante.service';
import { SucursalService } from 'src/app/pages/services/sucursal.service';

@Component({
  selector: 'app-docente-reporte',
  templateUrl: './docente-reporte.component.html',
  styles: [
  ]
})
export class DocenteReporteComponent implements OnInit {

  docenteHorario: any;

  public dropdownListSucursales: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public sucursal: any = [];

  constructor(
    private fb: FormBuilder,
    private asignarHorarioEstudianteService: AsignarHorariosEstudianteService,
    private sucursalService: SucursalService,
  ) { }

  ngOnInit(): void {
    /** Servicio que me devuelva las SUCURSALES de la base de datos */
    this.recuperarDatosSucursales();

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };

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

  public registerForm = this.fb.group({
    rangoFechas: [null],
    dia: [null],
    idSucursal: [null],
  });

  busqueda() {
    //obtener el valor del dia
    let dato = this.registerForm.get('dia').value;

    if (this.sucursal.length == 0) {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, 'todas').subscribe((resp: any) => {
        this.docenteHorario = resp.data;
      });

    } else {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, this.sucursal[0].item_id).subscribe((resp: any) => {
        this.docenteHorario = resp.data;
      });
    }

  }



  /** SUCRUSAL */
  /** Item Seleccionado */
  onItemSelectsucursal(item: any) {
    this.sucursal = [item];

    let dato = this.registerForm.get('dia').value;
    if (dato == null) {
      //Dar un valor al input dia
      this.registerForm.get('dia').setValue('Lunes');
      this.asignarHorarioEstudianteService.docentehorarioPorDia('Lunes', true, 'todas').subscribe((resp: any) => {
        this.docenteHorario = resp.data;
      });
    } else {
      this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, this.sucursal[0].item_id).subscribe((resp: any) => {
        this.docenteHorario = resp.data;
      });
    }

  }
  /** Todos los items Seleccionados */
  onSelectAllsucursal(items: any) {
    this.sucursal = items;
  }
  /** Deselccionar item */

  onDeSelectsucursal(item: any) {
    /** Borrar elemento del array  */
    this.sucursal = [];
    
    let dato = this.registerForm.get('dia').value;
    this.asignarHorarioEstudianteService.docentehorarioPorDia(dato, true, 'todas').subscribe((resp: any) => {
      this.docenteHorario = resp.data;
    });

  }
  /** Deselccionar todos los items */
  onDeSelectAllsucursal(items: any) {
    this.sucursal = items;
  }

}
