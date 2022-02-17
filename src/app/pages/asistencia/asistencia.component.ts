import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../persona/persona.service';
import { EstudianteService } from '../services/estudiante.service';
import { HorarioService } from '../services/horario.service';
import { AsignarHorariosEstudianteService } from '../services/asignar-horarios-estudiante.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styles: [
  ]
})
export class AsistenciaComponent implements OnInit {

  public asistenciaSeleccionada: any;

  public dropdownListPersonas: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};
  public dropdownListHorarios: any = [];

  public persona: any = [];
  public horario: any = [];

  public listaEstudiantes: any = [];
  public listaEstudiantesPresentes: any = [];
  public listaEstudiantesAusentes: any = [];


  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService,
    private estudiantesService: EstudianteService,
    private asignarHorariosEstudianteService: AsignarHorariosEstudianteService,
    private horariosService: HorarioService,
  ) { }

  ngOnInit(): void {

    this.recuperarDatosPersonas();
    this.recuperarDatosHorarios();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    this.dropdownSettingsSingle = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };

  }


  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
      if (this.asistenciaSeleccionada) {

        const findMarcaPersona = this.dropdownListPersonas.find(
          (item: any) => item.item_id === this.asistenciaSeleccionada.idDocente
        );
        if (findMarcaPersona) {
          this.onItemSelectPersona(findMarcaPersona);
          this.registerForm.get('idDocente')?.setValue(this.persona);
        }

      }

    });

  }
  recuperarDatosHorarios() {
    this.horariosService.getAllHorario().subscribe((resp: any) => {
      let nombreHorarios: any = [];
      resp.data.forEach((element: any) => {
        nombreHorarios.push({ item_id: element._id, nombre: `${element.nombre}-${element.modalidad}-${element.dias}-${element.horaInicio}-${element.horaFin}` });
      });
      this.dropdownListHorarios = nombreHorarios;

      if (this.asistenciaSeleccionada) {

        const findHorario = this.dropdownListHorarios.find(
          (item: any) => item.item_id === this.asistenciaSeleccionada.idHorario
        );
        if (findHorario) {
          this.onItemSelectHorario(findHorario);
          this.registerForm.get('idHorario')?.setValue(this.horario);
        }

      }

    });

  }

  public registerForm = this.fb.group({
    idDocente: [null],
    idAsignarHorarioEstudiante: [null],
    temaTratado: [null],
    fecha: [new Date()],
    ausentes: [null],
    presentes: [null],
  });

  crear() {

  }

  cancelarGuardado() {

  }


  enviarDatosEstudiante(estudiante: any) {
    console.log(estudiante);
  }

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }


  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona = [item];
    //Para agregar los estudiantes a la lista
    this.listaEstudiantes = [];
    if (this.persona != [] && this.horario != []) {
      this.asignarHorariosEstudianteService.getAllByDocenteHorario(this.persona[0].item_id, this.horario[0].item_id).subscribe((resp: any) => {
        console.log(resp.data);
        resp.data[0].idEstudiantes.forEach((element: any) => {
          this.listaEstudiantes.push({idEstudiante:element._id,nombre:element.nombresApellidos});
        });
      });
    }
  }
  /** Todos los items Seleccionados */
  onSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);

  }
  /** Deselccionar item */
  findByItemIdIndexPersona(id: any) {
    return this.persona.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectPersona(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexPersona(item.item_id);
    const newArray = (index > -1) ? [
      ...this.persona.slice(0, index),
      ...this.persona.slice(index + 1)
    ] : this.persona;
    this.persona = newArray;
    console.log(this.persona);
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }

  /** horario */
  /** Item Seleccionado */
  onItemSelectHorario(item: any) {
    this.horario=[item];

    //Para agregar los estudiantes a la lista
    this.listaEstudiantes = [];
    if (this.persona != [] && this.horario != []) {
      this.asignarHorariosEstudianteService.getAllByDocenteHorario(this.persona[0].item_id, this.horario[0].item_id).subscribe((resp: any) => {
        console.log(resp.data);
        resp.data[0].idEstudiantes.forEach((element: any) => {
          this.listaEstudiantes.push({idEstudiante:element._id,nombre:element.nombresApellidos});
        });
      });
    }

  }
  /** Todos los items Seleccionados */
  onSelectAllHorario(items: any) {
    this.horario = items;
    console.log(this.horario);
  }
  /** Deselccionar item */
  findByItemIdIndexHorario(id: any) {
    return this.horario.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectHorario(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexHorario(item.item_id);
    const newArray = (index > -1) ? [
      ...this.horario.slice(0, index),
      ...this.horario.slice(index + 1)
    ] : this.horario;
    this.horario = newArray;
  }
  /** Deselccionar todos los items */
  onDeSelectAllHorario(items: any) {
    this.horario = items;
  }

}
