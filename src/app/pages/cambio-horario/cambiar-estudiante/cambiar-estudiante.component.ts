import { Component, OnInit } from '@angular/core';
import { AsignarHorarioEstudiante } from '../../asignar-horarios-estudiante/asignar-horarios-estudiante.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder } from '@angular/forms';
import { AsignarHorariosEstudianteService } from '../../services/asignar-horarios-estudiante.service';
import { PersonaService } from '../../persona/persona.service';
import { EstudianteService } from '../../services/estudiante.service';
import { HorarioService } from '../../services/horario.service';
import { ActivatedRoute, Router } from '@angular/router';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-estudiante',
  templateUrl: './cambiar-estudiante.component.html',
  styles: [
  ]
})
export class CambiarEstudianteComponent implements OnInit {

  public asignarSeleccionada: any;

  AsignarHorarioEstudianteModel = new AsignarHorarioEstudiante();
  public AsignarHorarioEstudianteModel1: any;
  AsignarHorarioEstudianteModel2 = new AsignarHorarioEstudiante();


  public dropdownListPersonas: any = [];
  public dropdownListEstudiantes: any = [];
  public dropdownListHorarios: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};

  public persona: any = [];
  public estudiante: any = [];
  public horario: any = [];
  public persona1: any = [];
  public horario1: any = [];


  public estudiantelista1: any = [];

  public idAsignarHorarioEstudiante: any;

  constructor(
    private fb: FormBuilder,
    private asignarHorarioEstudianteService: AsignarHorariosEstudianteService,
    private personaService: PersonaService,
    private estudiantesService: EstudianteService,
    private horariosService: HorarioService,
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

  cargarEstudiantesdeAsignarHorarioEstudiante(idDocente: string, idHorario: string) {
    this.estudiante = [];

    this.asignarHorarioEstudianteService.getAllByDocenteHorario(idDocente, idHorario).subscribe((resp: any) => {
      this.idAsignarHorarioEstudiante = resp.data[0];
      let estudiantes = resp.data[0].idEstudiantes;
      estudiantes.map((estudiante: any) => {
        let idEstudiante = estudiante._id;
        const findEstudiante = this.dropdownListEstudiantes.find(
          (item: any) => item.item_id === idEstudiante
        );
        if (findEstudiante) {
          this.onItemSelectEstudiante(findEstudiante);
          this.registerForm.get('idEstudiantes')?.setValue(this.estudiante);
        }
      })
    });


  }

  borrarDatosEstudaintes(){
    this.estudiante = [];
    this.registerForm.get('idEstudiantes')?.setValue(this.estudiante);
  }


  async cargarAsignarbyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.asignarHorarioEstudianteService.obtenerasignarhorarioestudianteById(id)
      .subscribe((resp: any) => {
        console.log(resp);
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
    idDocente1: [null],
    idHorario1: [null],
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
    if (this.idAsignarHorarioEstudiante) {
      //actualizar
      this.AsignarHorarioEstudianteModel = this.registerForm.value;
      this.AsignarHorarioEstudianteModel1 = this.registerForm.value;

      //ID de las docente
      this.AsignarHorarioEstudianteModel.idDocente = this.persona[0].item_id;

      //ID horarios
      this.AsignarHorarioEstudianteModel.idHorario = this.horario[0].item_id;

      //ID de las estudiantes
      let estudiantelista: any = [];
      this.estudiante.forEach((element: any) => {
        if (element.item_id) {
          estudiantelista.push(element.item_id);
        } else {
          estudiantelista.push(element);
        }
      });
      this.AsignarHorarioEstudianteModel.idEstudiantes = estudiantelista;

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


        //verificar si existe el nuevo asignar horario estudiante
        let docente1 = this.persona1[0].item_id;
        let horario1 = this.horario1[0].item_id;
        this.asignarHorarioEstudianteService.getAllByDocenteHorario(docente1, horario1).subscribe(
          (resp: any) => {
            let respuesta = resp.data[0];
            console.log(resp.data[0]);
            this.estudiantelista1 = resp.data[0]?.idEstudiantes;

            if (resp.data[0] = ! 'undefined') {
              //añadir los nuevos alumnos al grupo
              this.AsignarHorarioEstudianteModel2.estado = true;
              this.AsignarHorarioEstudianteModel2.idDocente = docente1;
              this.AsignarHorarioEstudianteModel2.idHorario = horario1;

              this.estudiante.forEach((element: any) => {
                if (element.item_id) {
                  this.estudiantelista1.push(element.item_id);
                } else {
                  this.estudiantelista1.push(element);
                }
              });
              this.AsignarHorarioEstudianteModel2.idEstudiantes = this.estudiantelista1;

              this.asignarHorarioEstudianteService.updateasignarhorarioestudiante(respuesta._id, this.AsignarHorarioEstudianteModel2).subscribe((resp:any)=>{
                
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
                  title: 'Asignacion actualizada'
                })
                this.router.navigateByUrl('/asignarhorariosestudiantes');

              });



            } else {
              //crear el nuevo asignar horario estudiante

              //poner el asignar horario estudiante es false
              this.idAsignarHorarioEstudiante.estado = false;
              this.asignarHorarioEstudianteService.updateasignarhorarioestudiante(this.idAsignarHorarioEstudiante._id, this.idAsignarHorarioEstudiante)
                .subscribe(
                  (resp: any) => {
                    console.log(resp);
                  }
                );

              //this.AsignarHorarioEstudianteModel2.estado = true;
              this.AsignarHorarioEstudianteModel2.idDocente = docente1;
              this.AsignarHorarioEstudianteModel2.idHorario = horario1;

              let estudiantelista: any = [];
              this.estudiante.forEach((element: any) => {
                if (element.item_id) {
                  estudiantelista.push(element.item_id);
                } else {
                  estudiantelista.push(element);
                }
              });
              this.AsignarHorarioEstudianteModel2.idEstudiantes = estudiantelista;

              this.asignarHorarioEstudianteService.crearasignarhorarioestudiante(this.AsignarHorarioEstudianteModel2).subscribe(
                (resp: any) => {
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
                    title: 'Asignacion actualizada'
                  })
                  this.router.navigateByUrl('/asignarhorariosestudiantes');
                }
              );
            }
          }
        );

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

        const findMarcaPersona = this.dropdownListPersonas.find(
          (item: any) => item.item_id === this.asignarSeleccionada.idDocente
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

      if (this.asignarSeleccionada) {

        const findHorario = this.dropdownListHorarios.find(
          (item: any) => item.item_id === this.asignarSeleccionada.idHorario
        );
        if (findHorario) {
          this.onItemSelectHorario(findHorario);
          this.registerForm.get('idHorario')?.setValue(this.horario);
        }

      }

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
            this.registerForm.get('idEstudiantes')?.setValue(this.estudiante);
          }
        });
      }
    });
  }



  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona = [item];
    if (this.persona.length > 0 && this.horario.length > 0) {
      this.cargarEstudiantesdeAsignarHorarioEstudiante(this.persona[0].item_id, this.horario[0].item_id);
    }else{
      this.borrarDatosEstudaintes();
    }
    console.log(this.persona);
  }
  /** Todos los items Seleccionados */
  onSelectAllPersona(items: any) {
    this.persona = [items];
    console.log(this.persona);
  }
  /** Deselccionar item */
  findByItemIdIndexPersona(id: any) {
    return this.persona.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectPersona(item: any) {
    this.borrarDatosEstudaintes();
    /** Borrar elemento del array  */
    this.persona = [];
    console.log(this.persona);
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }

  /** Persona1 */
  /** Item Seleccionado */
  onItemSelectPersona1(item: any) {
    this.persona1 = [item];
  }
  /** Todos los items Seleccionados */
  onSelectAllPersona1(items: any) {
    this.persona1 = [items];
  }

  onDeSelectPersona1(item: any) {
    /** Borrar elemento del array  */
    this.persona1 = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona1(items: any) {
    this.persona1 = items;
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
    this.horario = [item];

    if (this.persona.length > 0 && this.horario.length > 0) {
      this.cargarEstudiantesdeAsignarHorarioEstudiante(this.persona[0].item_id, this.horario[0].item_id);
    }else{
      this.borrarDatosEstudaintes();
    }
    console.log(this.horario);
  }
  /** Todos los items Seleccionados */
  onSelectAllHorario(items: any) {
    this.horario = [items];
    console.log(this.horario);
  }
  /** Deselccionar item */
  findByItemIdIndexHorario(id: any) {
    return this.horario.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectHorario(item: any) {
    this.borrarDatosEstudaintes();
    this.horario = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllHorario(items: any) {
    this.horario = items;
  }


  /** horario */
  /** Item Seleccionado */
  onItemSelectHorario1(item: any) {
    this.horario1 = [item];
  }
  /** Todos los items Seleccionados */
  onSelectAllHorario1(items: any) {
    this.horario1 = [items];
  }
  /** Deselccionar item */
  onDeSelectHorario1(item: any) {
    this.horario1 = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllHorario1(items: any) {
    this.horario1 = items;
  }
}
