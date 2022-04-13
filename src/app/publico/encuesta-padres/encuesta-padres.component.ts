import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from 'src/app/pages/persona/persona.service';
import { CiudadService } from 'src/app/pages/services/ciudad.service';
import { EstudianteService } from 'src/app/pages/services/estudiante.service';
import { MarcaService } from 'src/app/pages/services/marca.service';
import { EncuestaPadresService } from 'src/app/services/encuesta-padres.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta-padres',
  templateUrl: './encuesta-padres.component.html',
  styles: [
  ]
})
export class EncuestaPadresComponent implements OnInit {

  public dropdownListCiudades: any = [];
  public dropdownListMarcas: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public dropdownListPersonas: any = [];
  public dropdownListEstudiantes: any = [];

  public persona: any = [];
  public estudiante: any = [];
  public ciudad: any = [];
  public marca: any = [];

  constructor(
    private personaService: PersonaService,
    private estudiantesService: EstudianteService,
    private ciudadService: CiudadService,
    private marcaService: MarcaService,
    private encuestaService:EncuestaPadresService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    Swal.fire(
      'Encuesta',
      'Estimado representante para nosotros es muy importante conocer su opinión. Le pedimos contestar a las siguientes preguntas de acuerdo a su realidad, esto nos permitirá actuar de manera adecuada y oportuna en caso de ser necesario. Agradecemos su gentileza.',
      'info'
    )

    /** Servicio que me devuelva las CIUDADES de la base de datos */
    this.recuperarDatosCiudad();
    /** Servicio que me devuelva las MARCAS de la base de datos */
    this.recuperarDatosMarcas();

    this.recuperarDatosPersonas();
    this.recuperarDatosEstudiantes();

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

  public registerForm = this.fb.group({
    idMarca: [null, Validators.required],
    idCiudad: [null, Validators.required],
    idDocente: [null, Validators.required],
    idEstudiante: [null, Validators.required],
    pregunta1: [null, Validators.required],
    pregunta2: [null, Validators.required],
    pregunta3: [null, Validators.required],
    pregunta4: [null, Validators.required],
    pregunta5: [null, Validators.required],
    pregunta6: [null, Validators.required],
    pregunta7: [null],

  });


  recuperarDatosCiudad() {
    this.ciudadService.getAllCiudades().subscribe((resp: any) => {
      let nombreciudades: any = [];
      resp.data.forEach((element: any) => {
        nombreciudades.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListCiudades = nombreciudades;

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

  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
    });

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

  crear() {
    this.registerForm.patchValue({
      idCiudad: this.ciudad[0].item_id,
      idDocente: this.persona[0].item_id,
      idEstudiante: this.estudiante[0].item_id,
      idMarca: this.marca[0].item_id,
    });

    console.log(this.registerForm.value);

    this.encuestaService.crearencuesta(this.registerForm.value).subscribe((resp: any) => {
      Swal.fire(
        'Encuesta',
        'Encuesta creada con éxito',
        'success'
      )
    });
  }

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  cancelarGuardado() {

  }



  /** CIUDAD */
  /** Item Seleccionado */
  onItemSelect(item: any) {
    this.ciudad = [item];
    console.log(this.ciudad);
  }
  /** Todos los items Seleccionados */
  onSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }
  /** Deselccionar item */
  onDeSelect(item: any) {
      this.ciudad = [];
  }

  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }


  /** MARCA */
  /** Item Seleccionado */
  onItemSelectmarca(item: any) {
    this.marca= [item];
  }
  /** Todos los items Seleccionados */
  onSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }
  /** Deselccionar item */
  
  onDeSelectmarca(item: any) {
    /** Borrar elemento del array  */
    this.marca = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }


  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona= [item];
    console.log(this.persona);
  }
  /** Todos los items Seleccionados */
  onSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }
  /** Deselccionar item */
  onDeSelectPersona(item: any) {
    /** Borrar elemento del array  */
    this.persona = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }

  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante= [item];
    console.log(this.estudiante);
  }
  /** Todos los items Seleccionados */
  onSelectAllEstudiante(items: any) {
    this.estudiante = items;
    console.log(this.estudiante);
  }
  /** Deselccionar item */

  onDeSelectEstudiante(item: any) {
    /** Borrar elemento del array  */
    this.estudiante = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstudiante(items: any) {
    this.estudiante = items;
    console.log(this.estudiante);
  }


}
