import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsignarHorarioEstudiante } from './asignar-horarios-estudiante.model';
import { AsignarHorariosEstudianteService } from '../services/asignar-horarios-estudiante.service';

import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from '../persona/persona.service';
import { EstudianteService } from '../services/estudiante.service';
import { HorarioService } from '../services/horario.service';

@Component({
  selector: 'app-asignar-horarios-estudiante',
  templateUrl: './asignar-horarios-estudiante.component.html',
  styles: [
  ]
})
export class AsignarHorariosEstudianteComponent implements OnInit {

  public asignarSeleccionada: any;

  AsignarHorarioEstudianteModel = new AsignarHorarioEstudiante();


  public dropdownListPersonas: any = [];
  public dropdownListEstudiantes: any = [];
  public dropdownListHorarios: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};

  public persona: any = [];
  public estudiante: any = [];
  public horario: any = [];

  constructor(
    private fb: FormBuilder,
    private asignarHorarioEstudianteService: AsignarHorariosEstudianteService,
    private personaService: PersonaService,
    private estudiantesService:EstudianteService,
    private horariosService:HorarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarAsignarbyId(id);
    });

    this.recuperarDatosPersonas();
    this.recuperarDatosEstudiantes();
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

  async cargarAsignarbyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.asignarHorarioEstudianteService.obtenerasignarhorarioestudianteById(id)
      .subscribe((resp: any) => {
        this.asignarSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp: any) {
    const {
      idDocente,
      idHorario,
      idEstudiantes,
      estado
    } = resp.data;
    this.asignarSeleccionada = resp.data;
    this.registerForm.setValue({
      idDocente,
      idHorario,
      idEstudiantes,
      estado
    });
  }

  public registerForm = this.fb.group({
    idDocente: [null],
    idHorario: [null],
    idEstudiantes: [null],
    estado: [null],
  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }



  crearAsignarHorarios() {
    if (this.asignarSeleccionada) {
      //actualizar
      this.AsignarHorarioEstudianteModel = this.registerForm.value;
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


        this.asignarHorarioEstudianteService.updateasignarhorarioestudiante(this.asignarSeleccionada._id, this.AsignarHorarioEstudianteModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listaciudades');
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
      this.asignarSeleccionada = this.registerForm.value;

      //ID de las docente
      this.asignarSeleccionada.idDocente = this.persona[0].item_id;
      
      this.asignarSeleccionada.idHorario = this.horario[0].item_id;

      //ID de las ciudades
      let estudiantelista: any = [];
      this.estudiante.forEach((element: any) => {
        if (element.item_id) {
          estudiantelista.push(element.item_id);
        } else {
          estudiantelista.push(element);
        }
      });
      this.asignarSeleccionada.idEstudiantes = estudiantelista;

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
        this.asignarHorarioEstudianteService.crearasignarhorarioestudiante(this.asignarSeleccionada).subscribe((resp) => {
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

          this.router.navigateByUrl('/listaciudades');
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
    this.router.navigateByUrl('/lista')
  }

  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
      if (this.asignarSeleccionada) {
        /* this.asignarSeleccionada.idMarca.map((m: any) => {
          const findMarcaPersona = this.dropdownListMarcas.find(
            (item: any) => item.item_id === m
          );
          if (findMarcaPersona) {
            this.onItemSelectmarca(findMarcaPersona);
            this.registerForm.get('asignado')?.setValue(this.persona);
          }
        }); */
      }

    });

  }
  recuperarDatosHorarios() {
    this.horariosService.getAllHorario().subscribe((resp: any) => {
      let nombreHorarios: any = [];
      resp.data.forEach((element: any) => {
        nombreHorarios.push({ item_id: element._id, nombre: `${element.nombre}-${element.modalidad}-${element.dias}-${element.horaInicio}-${element.horaFin}`  });
      });
      this.dropdownListHorarios = nombreHorarios;
      

    });

  }

  recuperarDatosEstudiantes() {
    this.estudiantesService.getAllEstudiantesSinLimite().subscribe((resp: any) => {
      let nombreEstudiantes: any = [];
      resp.data.forEach((element: any) => {
        nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListEstudiantes = nombreEstudiantes;
      if (this.asignarSeleccionada) {
        this.asignarSeleccionada.idEstudiantes.map((m: any) => {
          const findEstudainte = this.dropdownListEstudiantes.find(
            (item: any) => item.item_id === m
          );
          if (findEstudainte) {
            this.onItemSelectEstudiante(findEstudainte);
            this.registerForm.get('idEstudiantes')?.setValue(this.persona);
          }
        }); 
      }

    });

  }

  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona.push(item);
    console.log(this.persona);
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

  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante.push(item);
    console.log(this.estudiante);
  }
  /** Todos los items Seleccionados */
  onSelectAllEstudiante(items: any) {
    this.estudiante = items;
    console.log(this.estudiante);
  }
  /** Deselccionar item */
  findByItemIdIndexEstudiante(id: any) {
    return this.estudiante.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectEstudiante(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexEstudiante(item.item_id);
    const newArray = (index > -1) ? [
      ...this.estudiante.slice(0, index),
      ...this.estudiante.slice(index + 1)
    ] : this.estudiante;
    this.estudiante = newArray;
    console.log(this.estudiante);
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstudiante(items: any) {
    this.estudiante = items;
    console.log(this.estudiante);
  }

  /** horario */
  /** Item Seleccionado */
  onItemSelectHorario(item: any) {
    this.horario.push(item);
    console.log(this.horario);
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
