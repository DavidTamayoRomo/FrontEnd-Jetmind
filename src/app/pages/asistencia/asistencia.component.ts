import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../persona/persona.service';
import { EstudianteService } from '../services/estudiante.service';
import { HorarioService } from '../services/horario.service';
import { AsignarHorariosEstudianteService } from '../services/asignar-horarios-estudiante.service';
import { Asistencia } from './asistencia.model';
import { AsistenciaService } from '../services/asistencia.service';

import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styles: [
  ]
})
export class AsistenciaComponent implements OnInit {

  public asistenciaSeleccionada: any;
  public AsistenciaModel: Asistencia;

  public dropdownListPersonas: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};
  public dropdownListHorarios: any = [];

  public persona: any = [];
  public horario: any = [];

  public listaEstudiantes: any = [];
  public listaEstudiantesCopia: any = [];
  public listaEstudiantesPresentes: any = [];
  public listaEstudiantesAusentes: any = [];

  public ausentes: any = [];
  public presentes: any = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService,
    private estudiantesService: EstudianteService,
    private asignarHorariosEstudianteService: AsignarHorariosEstudianteService,
    private asistenciaService: AsistenciaService,
    private horariosService: HorarioService,
  ) { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarAsistenciasbyId(id);
    });

    this.recuperarDatosHorarios();
    this.recuperarDatosPersonas();

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

  async cargarAsistenciasbyId(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.asistenciaService.obtenerAsistenciaById(id)
      .subscribe((resp: any) => {
        this.asistenciaSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp: any) {
    const {
      idDocente,
      idHorario,
      temaTratado,
      fecha,
      prueba
    } = resp.data;
    this.asistenciaSeleccionada = resp.data;

    this.removerAllPrueba();
    prueba.map((element: any) => {
      this.agregarPrueba2(element.estudiante, element.idEstudiante, element.estado, element.comentario);
    });
    
    this.registerForm.setValue({
      idDocente,
      idHorario,
      temaTratado,
      fecha,
      prueba
    });
  }

  public registerForm = this.fb.group({
    idDocente: [null],
    idHorario: [null],
    temaTratado: [null],
    observaciones: [null],
    fecha: [new Date()],
    /* ausentes: [this.listaEstudiantesAusentes],
    presentes: [this.listaEstudiantesPresentes], */
    prueba: this.fb.array([this.fb.group({ estado: [null], estudiante: [null], idEstudiante: [null], comentario: [null], _id: [null] })])
  });

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
    this.horariosService.getAllHorarioSinLimite().subscribe((resp: any) => {
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



  crear() {

    if (this.asistenciaSeleccionada) {
      //actualizar
      this.AsistenciaModel = this.registerForm.value;

      this.AsistenciaModel.idDocente = this.persona[0].item_id;
      this.AsistenciaModel.idHorario = this.horario[0].item_id;



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

        this.asistenciaService.updateAsistencia(this.asistenciaSeleccionada._id, this.AsistenciaModel).subscribe((resp: any) => {
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
            title: 'Se actualizo correctamente'
          })
          this.router.navigateByUrl('/asistencias');
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
    } else {
      //crear
      this.AsistenciaModel = this.registerForm.value;
      this.AsistenciaModel.idDocente = this.persona[0].item_id;
      this.AsistenciaModel.idHorario = this.horario[0].item_id;

      console.log(this.AsistenciaModel);

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
        this.asistenciaService.crearAsistencia(this.AsistenciaModel).subscribe((resp) => {
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

          this.router.navigateByUrl('/asistencias');
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

    }

  }

  cancelarGuardado() {

  }


  //No se va a usar :(
  enviarDatosEstudiante(estudiante: any, index: any) {
    console.log(estudiante, '-', index);
    //cuando se desmarca un estudiante enviar a lista de ausentes
    //TODO:revisar este codigo

    //verificar si esta en algua de las dos lista
    const indexPresente = this.listaEstudiantesPresentes.findIndex((resp: any) => {
      return resp.idEstudiante === estudiante.idEstudiante;
    });
    const indexAusente = this.listaEstudiantesAusentes.findIndex((resp: any) => {
      return resp.idEstudiante === estudiante.idEstudiante;
    });

    if (indexPresente > -1) {
      //Enviar a lista de ausentes
      this.listaEstudiantesPresentes.splice(indexPresente, 1);
      this.listaEstudiantesAusentes.push(estudiante);
      console.log('Entre presente');
    }
    if (indexAusente > -1) {
      //Enviar a lista de ausentes
      this.listaEstudiantesAusentes.splice(indexAusente, 1);
      this.listaEstudiantesPresentes.push(estudiante);
      console.log('Entre Ausente');
    }
    console.log('Total estudaintes', this.listaEstudiantes);
    console.log(this.listaEstudiantesPresentes, '- Ausentes : ', this.listaEstudiantesAusentes);



  }

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  get getPrueba() {
    return this.registerForm.get('prueba') as FormArray;
  }

  agregarPrueba(estudiante: any, idEstudiante: any) {
    const pruebaForm = <FormArray>this.registerForm.controls['prueba'];

    pruebaForm.push(this.fb.group(
      {
        estado: [true],
        estudiante: [estudiante],
        idEstudiante: [idEstudiante],
        comentario: [null],
        _id: [null]
      }
    ));
  }

  agregarPrueba2(estudiante: any, idEstudiante: any, estado:any, comentario:any) {
    const pruebaForm = <FormArray>this.registerForm.controls['prueba'];

    pruebaForm.push(this.fb.group(
      {
        estado: [estado],
        estudiante: [estudiante],
        idEstudiante: [idEstudiante],
        comentario: [comentario],
        _id: [null]
      }
    ));
  }




  removerAllPrueba() {
    const pruebaForm = <FormArray>this.registerForm.controls['prueba'];
    pruebaForm.clear();
  }


  llenarEstudiantesChechbox() {
    //Para agregar los estudiantes a la lista
    if (this.asistenciaSeleccionada) {

    } else {
      if (this.persona.length > 0 && this.horario.length > 0) {
        console.log('Entre 1');
        this.removerAllPrueba();
        this.asignarHorariosEstudianteService.getAllByDocenteHorario(this.persona[0].item_id, this.horario[0].item_id).subscribe((resp: any) => {
          resp.data[0].idEstudiantes.forEach((element: any) => {
            this.agregarPrueba(element.nombresApellidos, element._id);
          });

        });
      }
    }

  }

  llenarEstudiantes(idPersona: any, idHorario: any) {
    //Para agregar los estudiantes a la lista
    this.removerAllPrueba();
    this.asignarHorariosEstudianteService.getAllByDocenteHorario(idPersona, idHorario).subscribe((resp: any) => {
      resp.data[0].idEstudiantes.forEach((element: any) => {
        this.agregarPrueba(element.nombresApellidos, element._id);
      });
    });
  }

  


  /* llenarEstudiantesChechbox() {
    //Para agregar los estudiantes a la lista
    
      console.log('Entre');
      this.listaEstudiantes = [];
      this.listaEstudiantesCopia = [];
      this.listaEstudiantesAusentes = [];
      this.listaEstudiantesPresentes = [];
      this.removerAllPrueba();
 
      if (this.persona.length > 0 && this.horario.length > 0) {
        this.asignarHorariosEstudianteService.getAllByDocenteHorario(this.persona[0].item_id, this.horario[0].item_id).subscribe((resp: any) => {
          console.log(resp.data);
          resp.data[0].idEstudiantes.forEach((element: any) => {
            this.listaEstudiantes.push({ idEstudiante: element._id, nombre: element.nombresApellidos });
            this.listaEstudiantesCopia.push({ idEstudiante: element._id, nombre: element.nombresApellidos });
            this.agregarPrueba(element.nombresApellidos, element._id);
          });
          this.listaEstudiantesPresentes = this.listaEstudiantesCopia;
 
        });
      }
 
      console.log('Estudiantes', this.listaEstudiantes);
      console.log('Ausentes', this.listaEstudiantesAusentes);
      console.log('Presentes', this.listaEstudiantesPresentes);
    
  } */

  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona = [item];
    this.llenarEstudiantesChechbox();
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
    this.persona = [];

    this.listaEstudiantes = [];
    this.listaEstudiantesAusentes = [];
    this.listaEstudiantesPresentes = [];

    console.log('Estudiantes', this.listaEstudiantes);
    console.log('Ausentes', this.listaEstudiantesAusentes);
    console.log('Presentes', this.listaEstudiantesPresentes);

  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }

  /** horario */
  /** Item Seleccionado */
  onItemSelectHorario(item: any) {
    this.horario = [item];
    // funcion de llenar lista de estudiantes
    this.llenarEstudiantesChechbox();

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
    this.horario = [];

    this.listaEstudiantes = [];
    this.listaEstudiantesAusentes = [];
    this.listaEstudiantesPresentes = [];
    console.log('Estudiantes', this.listaEstudiantes);
    console.log('Ausentes', this.listaEstudiantesAusentes);
    console.log('Presentes', this.listaEstudiantesPresentes);
  }
  /** Deselccionar todos los items */
  onDeSelectAllHorario(items: any) {
    this.horario = items;
  }

}
