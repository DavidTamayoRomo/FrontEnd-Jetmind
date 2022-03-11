import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../persona/persona.service';
import { EstudianteService } from '../services/estudiante.service';
import { AsignarHorariosEstudianteService } from '../services/asignar-horarios-estudiante.service';
import { AsistenciaService } from '../services/asistencia.service';
import { HorarioService } from '../services/horario.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Asistencia } from '../asistencia/asistencia.model';
import { EvaluacionCharlotte } from './evaluacion-charlotte.model';
import { EvaluacionCharlotteService } from '../services/evaluacion-charlotte.service';

@Component({
  selector: 'app-evaluacion-charlotte',
  templateUrl: './evaluacion-charlotte.component.html',
  styles: [
  ]
})
export class EvaluacionCharlotteComponent implements OnInit {

  public evaluacionCharlotteSeleccionada: any;
  public EvaluacionCHModel: EvaluacionCharlotte;

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
    private evaluacionService:EvaluacionCharlotteService
  ) { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarEvaluacionbyId(id);
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

  async cargarEvaluacionbyId(id: string) {

    if (id === 'nuevo') {
      return;
    }

    this.asistenciaService.obtenerAsistenciaById(id)
      .subscribe((resp: any) => {
        this.evaluacionCharlotteSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp: any) {
    const {
      idDocente,
      idHorario,
      fecha,
      prueba
    } = resp.data;
    this.evaluacionCharlotteSeleccionada = resp.data;

    this.removerAllPrueba();
    prueba.map((element: any) => {
      this.agregarPrueba2(element.estudiante, element.idEstudiante, element.estado, element.comentario);
    });
    
    this.registerForm.setValue({
      idDocente,
      idHorario,
      fecha,
      prueba
    });
  }

  public registerForm = this.fb.group({
    idDocente: [null],
    idHorario: [null],
    fecha: [new Date()],
    prueba: this.fb.array([this.fb.group({ 
      estudiante: [null], 
      nombre: [null], 
      listening: [null], 
      reading: [null], 
      grammar: [null],
      writting: [null],
      platform: [null],
      _id: [null],
     })])
  });

  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
      if (this.evaluacionCharlotteSeleccionada) {

        const findMarcaPersona = this.dropdownListPersonas.find(
          (item: any) => item.item_id === this.evaluacionCharlotteSeleccionada.idDocente
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

      if (this.evaluacionCharlotteSeleccionada) {

        const findHorario = this.dropdownListHorarios.find(
          (item: any) => item.item_id === this.evaluacionCharlotteSeleccionada.idHorario
        );
        if (findHorario) {
          this.onItemSelectHorario(findHorario);
          this.registerForm.get('idHorario')?.setValue(this.horario);
        }

      }

    });

  }



  crear() {

    if (this.evaluacionCharlotteSeleccionada) {
      //actualizar
      this.EvaluacionCHModel = this.registerForm.value;

      this.EvaluacionCHModel.idDocente = this.persona[0].item_id;
      this.EvaluacionCHModel.idHorario = this.horario[0].item_id;



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

        this.asistenciaService.updateAsistencia(this.evaluacionCharlotteSeleccionada._id, this.EvaluacionCHModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/lista');
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
      this.EvaluacionCHModel = this.registerForm.value;
      this.EvaluacionCHModel.idDocente = this.persona[0].item_id;
      this.EvaluacionCHModel.idHorario = this.horario[0].item_id;

      console.log(this.EvaluacionCHModel);

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
        this.asistenciaService.crearAsistencia(this.EvaluacionCHModel).subscribe((resp) => {
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

          this.router.navigateByUrl('/lista');
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
        estudiante: [estudiante],
        nombre: [null],
        listening: [null],
        reading: [null],
        grammar: [null],
        writting: [null],
        platform: [null],
        _id: [idEstudiante],
      }
    ));
  }

  agregarPrueba2(estudiante: any, idEstudiante: any, estado:any, comentario:any) {
    const pruebaForm = <FormArray>this.registerForm.controls['prueba'];

    pruebaForm.push(this.fb.group(
      {
        estudiante: [null],
        nombre: [null],
        listening: [null],
        reading: [null],
        grammar: [null],
        writting: [null],
        platform: [null],
        _id: [null],
      }
    ));
  }


  mostrarCamposSegunNombreListening(index: any) {
    let nombre = this.registerForm.get('prueba')?.value[index].nombre;
    if (nombre == 'Kid') {
      return true;
    }else if (nombre == 'Pandy') {
      return true;
    }else if (nombre == 'Top Notch') {
      return true;
    }else{
      return false;
    }
  }
  mostrarCamposSegunNombreReading(index: any) {
    let nombre = this.registerForm.get('prueba')?.value[index].nombre;
    if (nombre == 'Kid') {
      return false;
    }else if (nombre == 'Pandy') {
      return false;
    }else if (nombre == 'Top Notch') {
      return false;
    }else{
      return false;
    }
  }
  mostrarCamposSegunNombreGrammar(index: any) {
    let nombre = this.registerForm.get('prueba')?.value[index].nombre;
    if (nombre == 'Kid') {
      return false;
    }else if (nombre == 'Pandy') {
      return false;
    }else if (nombre == 'Top Notch') {
      return true;
    }else{
      return false;
    }
  }
  mostrarCamposSegunNombreWritting(index: any) {
    let nombre = this.registerForm.get('prueba')?.value[index].nombre;
    if (nombre == 'Kid') {
      return false;
    }else if (nombre == 'Pandy') {
      return false;
    }else if (nombre == 'Top Notch') {
      return true;
    }else{
      return false;
    }
  }
  mostrarCamposSegunNombrePlatform(index: any) {
    let nombre = this.registerForm.get('prueba')?.value[index].nombre;
    if (nombre == 'Kid') {
      return true;
    }else if (nombre == 'Pandy') {
      return true;
    }else if (nombre == 'Top Notch') {
      return true;
    }else{
      return false;
    }
  }


  removerAllPrueba() {
    const pruebaForm = <FormArray>this.registerForm.controls['prueba'];
    pruebaForm.clear();
  }


  llenarEstudiantesChechbox() {
    //Para agregar los estudiantes a la lista
    if (this.evaluacionCharlotteSeleccionada) {

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
