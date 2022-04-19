import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-estado-estudiante',
  templateUrl: './estado-estudiante.component.html',
  styles: [
  ]
})
export class EstadoEstudianteComponent implements OnInit {

  public dropdownListEstudiantes: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public estudiante: any = [];

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudianteService,
  ) { }

  ngOnInit(): void {
    this.recuperarDatosEstudiantes();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  public registerForm = this.fb.group({
    estado: [null],
    idEstudiantes: [null],
    rangoFechas: [null],
  });

  crearEstudiante() {
  }

  cancelarGuardado(){

  }

  recuperarDatosEstudiantes() {
    this.estudiantesService.getAllEstudiantesSinLimite().subscribe((resp: any) => {
      let nombreEstudiantes: any = [];
      resp.data.forEach((element: any) => {
        nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListEstudiantes = nombreEstudiantes;
      
    });
  }


  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante= [item];
  }
  /** Todos los items Seleccionados */
  onSelectAllEstudiante(items: any) {
    this.estudiante = [items];
  }
  /** Deselccionar item */

  onDeSelectEstudiante(item: any) {
    /** Borrar elemento del array  */
    this.estudiante = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstudiante(items: any) {
    this.estudiante = [items]
  }

}
