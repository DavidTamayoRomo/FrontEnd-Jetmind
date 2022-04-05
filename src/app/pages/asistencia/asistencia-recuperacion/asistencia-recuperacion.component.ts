import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from '../../persona/persona.service';
import { AsistenciaService } from '../../services/asistencia.service';
import { EstudianteService } from '../../services/estudiante.service';
import { HorarioService } from '../../services/horario.service';

import Swal from 'sweetalert2';
import { Asistencia } from '../asistencia.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asistencia-recuperacion',
  templateUrl: './asistencia-recuperacion.component.html',
  styles: [
  ]
})
export class AsistenciaRecuperacionComponent implements OnInit {

  public dropdownListEstudiantes: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};
  public dropdownListPersonas: any = [];
  public dropdownListHorarios: any = [];

  public estudiante: any = [];
  public persona: any = [];
  public horario: any = [];

  public AsistenciaModel: Asistencia;

  constructor(
    private estudiantesService: EstudianteService,
    private personaService: PersonaService,
    private horariosService: HorarioService,
    private asistenciaService: AsistenciaService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.recuperarDatosEstudiantes();
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

  public registerForm = this.fb.group({
    idDocente: [null],
    idHorario: [null],
    temaTratado: [null],
    fecha: [new Date()],
    idEstudiantes: [null],
  });

  crear(){
    //crear
    this.AsistenciaModel = this.registerForm.value;
    this.AsistenciaModel.idDocente = this.persona[0].item_id;
    this.AsistenciaModel.idHorario = this.horario[0].item_id;

    let est:any = [];
    this.estudiante.map((resp:any)=>{
      est.push({idEstudiante:resp.item_id,estudiante:resp.nombre, estado:true});
    })

    

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
      setTimeout(() => {
        this.AsistenciaModel.prueba=est;
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
      }, 500);
      
    }
  }


  recuperarDatosEstudiantes() {
    this.estudiantesService.getAllEstudiantesSinLimite().subscribe((resp: any) => {
      let nombreEstudiantes: any = [];
      resp.data.forEach((element: any) => {
        nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListEstudiantes = nombreEstudiantes;
      /* if (this.asignarSeleccionada) {
        this.asignarSeleccionada.idEstudiantes.map((m: any) => {
          const findEstudainte = this.dropdownListEstudiantes.find(
            (item: any) => item.item_id === m
          );
          if (findEstudainte) {
            this.onItemSelectEstudiante(findEstudainte);
            this.registerForm.get('idEstudiantes')?.setValue(this.estudiante);
          }
        });
      } */
    });
  }

  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
     /*  if (this.asistenciaSeleccionada) {

        const findMarcaPersona = this.dropdownListPersonas.find(
          (item: any) => item.item_id === this.asistenciaSeleccionada.idDocente
        );
        if (findMarcaPersona) {
          this.onItemSelectPersona(findMarcaPersona);
          this.registerForm.get('idDocente')?.setValue(this.persona);
        }

      } */

    });

  }
  recuperarDatosHorarios() {
    this.horariosService.getAllHorario().subscribe((resp: any) => {
      let nombreHorarios: any = [];
      resp.data.forEach((element: any) => {
        nombreHorarios.push({ item_id: element._id, nombre: `${element.nombre}-${element.modalidad}-${element.dias}-${element.horaInicio}-${element.horaFin}` });
      });
      this.dropdownListHorarios = nombreHorarios;

      /* if (this.asistenciaSeleccionada) {

        const findHorario = this.dropdownListHorarios.find(
          (item: any) => item.item_id === this.asistenciaSeleccionada.idHorario
        );
        if (findHorario) {
          this.onItemSelectHorario(findHorario);
          this.registerForm.get('idHorario')?.setValue(this.horario);
        }

      } */

    });

  }

  cancelarGuardado() {

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


  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona = [item];
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

  }
  /** Todos los items Seleccionados */
  onSelectAllHorario(items: any) {
    this.horario = items;
    console.log(this.horario);
  }
  /** Deselccionar item */
 
  onDeSelectHorario(item: any) {
    /** Borrar elemento del array  */
    this.horario = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllHorario(items: any) {
    this.horario = items;
  }

}
