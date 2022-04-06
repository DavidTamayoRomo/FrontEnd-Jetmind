import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from '../persona/persona.service';
import { ContratoService } from '../services/contrato.service';
import { EntrevistaInicialTmService } from '../services/entrevista-inicial-tm.service';
import { EstudianteService } from '../services/estudiante.service';
import { HorarioService } from '../services/horario.service';
import { MarcaService } from '../services/marca.service';
import { ProgramaService } from '../services/programa.service';
import { EntrevistaInicialTM } from './entrevista-inicial-tm.model';


import Swal from 'sweetalert2';

import { marcas } from "src/environments/environment";
const variableMarcas = marcas;

@Component({
  selector: 'app-entrevista-inicial-tm',
  templateUrl: './entrevista-inicial-tm.component.html',
  styles: [
  ]
})
export class EntrevistaInicialTmComponent implements OnInit {

  public mostraModal: boolean = true;

  public idContrato: string;

  public estudiantes: any = [];
  public estudiantes1: any = [];
  public estudianteSeleccionado: any;
  public entrevistaInialCHUKSeleccionada: any = [];

  entrevistaInialCHUKModel = new EntrevistaInicialTM();

  public arrayDocentesHorararios: any = [];


  public persona: any = [];
  public horario: any = [];

  public dropdownListPersonas: any = [];
  public dropdownListHorarios: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};

  public posicion: number = 0;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private entrevistaInicialCHUKService: EntrevistaInicialTmService,
    private contratoService: ContratoService,
    private estudianteService: EstudianteService,
    private personaService: PersonaService,
    private horariosService: HorarioService,
    private programaService: ProgramaService,
    private marcaService: MarcaService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id, idContrato }) => {
      this.estudiantesContrato(idContrato);
      this.idContrato = idContrato;

    });

    this.limpiarArrayCampos();

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


    });

  }
  recuperarDatosHorarios() {
    this.horariosService.getAllHorario().subscribe((resp: any) => {
      let nombreHorarios: any = [];
      resp.data.forEach((element: any) => {
        nombreHorarios.push({ item_id: element._id, nombre: `${element.nombre}-${element.modalidad}-${element.dias}-${element.horaInicio}-${element.horaFin}` });
      });
      this.dropdownListHorarios = nombreHorarios;



    });

  }

  estudiantesContrato(idContrato: any) {
    this.contratoService.obtenerContratoById(idContrato).subscribe((resp: any) => {
      this.estudianteService.getAllEstudiantesByIdRepresentante(resp.data.idRepresentante).subscribe((resp: any) => {
        resp.data.map((estudiante: any) => {
          this.programaService.obtenerProgramaByIdEstudiante(estudiante._id).subscribe((resp: any) => {
            resp.data[0].idNombrePrograma.map((progra: any) => {
              this.marcaService.obtenerMarcaById(progra.idMarca).subscribe((resp: any) => {
                if (resp.data.nombre == variableMarcas.marca3) {
                  //Tomatis
                  this.estudiantes.push(estudiante);
                  this.arrayDocentesHorararios.push([{
                    "idEstudainte": "",
                    "nombreEstudiante": "",
                    "idDocente": [
                      {
                        "item_id": "",
                        "nombre": ""
                      }
                    ],
                    "idHorario": [
                      {
                        "item_id": "",
                        "nombre": ""
                      }
                    ]
                  }]);
                }
              });
            })
          });
        });
      });
    }
    );
  }

  public registerForm = this.fb.group({
    idContrato: [null],
    observaciones: [null],
    estudiantes1: [this.estudiantes1]
  });

  public registerForm1 = this.fb.group({
    observaciones: [null],
    fechaInicio: [null],
    FechaIncorporacion: [null],
    tiempoCapacitacion: [null],
    pregunta1: [null],
    pregunta2: [null],
    pregunta3: [null],
    //TODO: Ver si pongo aqui la fase para enviar a la tabla datos tomatis
    estudiantes: this.fb.array([
      this.fb.group({
        idEstudainte: [null],
        nombreEstudiante: [null],
        idDocente: [null],
        idHorario: [null],
      })
    ])

  });

  get getestudaintes() {
    return this.registerForm1.get('estudiantes') as FormArray;
  }

  agregarEstudiantes(idEstudiante: any, nombreEstudiante: any) {
    const estudianteForm = <FormArray>this.registerForm1.controls['estudiantes'];
    estudianteForm.push(this.fb.group(
      {
        idEstudainte: [idEstudiante],
        nombreEstudiante: [nombreEstudiante],
        idDocente: [null],
        idHorario: [null],
      }
    ));
  }

  crear() {


    this.entrevistaInialCHUKModel = this.registerForm.value;
    this.entrevistaInialCHUKModel.idContrato = this.idContrato;
    if (this.registerForm.invalid) {
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
      this.entrevistaInicialCHUKService.crearEntrevista(this.entrevistaInialCHUKModel).subscribe((resp) => {

        //actualizar datos del contrato
        this.contratoService.obtenerContratoById(this.entrevistaInialCHUKModel.idContrato).subscribe((resp: any) => {
          let datos = resp.data;
          if (datos.entrevistaInicial) {
            datos.entrevistaInicial.push({ marca: 'Tomatis' });
          } else {
            datos.entrevistaInicial = [{ marca: 'Tomatis' }];
          }
          this.contratoService.updatecontrato(this.entrevistaInialCHUKModel.idContrato, datos).subscribe((resp: any) => {
            console.log(resp);
          });
        });

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

        this.router.navigateByUrl('/listaentrevistainicialchuk');
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

    //}


  }

  cancelarGuardado() {

  }


  abrirModal(estudiante: any, index: any) {
    this.mostraModal = false;
    this.estudianteSeleccionado = estudiante;
    this.posicion = index;
  }

  cerrarModal() {
    this.mostraModal = true;
    this.limpiarArrayCampos();
  }

  agregar() {
    this.estudiantes1.push(this.registerForm1.value);
    let formArray: any = this.registerForm1.value;
    console.log(formArray);
    this.arrayDocentesHorararios[this.posicion] = formArray;
    console.log(this.arrayDocentesHorararios);

    this.cerrarModal();


  }

  limpiarArrayCampos() {
    const pruebaForm = <FormArray>this.registerForm1.controls['estudiantes'];
    pruebaForm.clear();
    this.limpiarCampos();
  }

  limpiarCampos() {
    this.registerForm1.reset();
  }

  eliminarCamposArray(index: number) {
    const pruebaForm = <FormArray>this.registerForm1.controls['estudiantes'];
    pruebaForm.removeAt(index);
  }


  
  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona.push(item);
  }
  /** Todos los items Seleccionados */
  onSelectAllPersona(items: any) {
    this.persona = items;
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
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
  }

  /** horario */
  /** Item Seleccionado */
  onItemSelectHorario(item: any) {
    this.horario.push(item);
  }
  /** Todos los items Seleccionados */
  onSelectAllHorario(items: any) {
    this.horario = items;
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
