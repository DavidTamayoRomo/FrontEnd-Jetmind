import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PersonaService } from '../persona/persona.service';
import { EstudianteService } from '../services/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EntregaLibros } from './entrega-libros.model';
import { EntregaLibrosService } from '../services/entrega-libros.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-entrega-libros',
  templateUrl: './entrega-libros.component.html',
  styles: [
  ]
})
export class EntregaLibrosComponent implements OnInit {

  public entregaLibroSeleccionada: any;

  EntregaLibroModel = new EntregaLibros();


  public dropdownListPersonas: any = [];
  public dropdownListEstudiantes: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};

  public persona: any = [];
  public estudiante: any = [];

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private estudiantesService: EstudianteService,
    private entregaLibrosService:EntregaLibrosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarEntregaLibrobyId(id);
    });

    this.recuperarDatosPersonas();
    this.recuperarDatosEstudiantes();

    this.dropdownSettingsSingle = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  async cargarEntregaLibrobyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.entregaLibrosService.obtenerentregalibroById(id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.entregaLibroSeleccionada = resp.data;
        this.LlenarForm(resp);
      });
  }

  LlenarForm(resp: any) {
    const {
      idDocente,
      idEstudiante,
      fechaEntrega,
      libro
    } = resp.data;
    this.entregaLibroSeleccionada = resp.data;
    this.registerForm.setValue({
      idDocente,
      idEstudiante,
      fechaEntrega,
      libro
    });
  }

  public registerForm = this.fb.group({
    idDocente: [null],
    idEstudiante: [null],
    fechaEntrega: [null],
    libro: [null],
  });


  crear() {
    if (this.entregaLibroSeleccionada) {
      //actualizar
      this.EntregaLibroModel = this.registerForm.value;

      //ID de las docente
      this.EntregaLibroModel.idDocente = this.persona[0].item_id;

      //ID estudiantes
      this.EntregaLibroModel.idEstudiante = this.estudiante[0].item_id;

      

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

        this.entregaLibrosService.updateentregalibro(this.entregaLibroSeleccionada._id, this.EntregaLibroModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/entregalibros');
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
     
      this.EntregaLibroModel = this.registerForm.value;

      //ID de las docente
      this.EntregaLibroModel.idDocente = this.persona[0].item_id;

      //ID estudiantes
      this.EntregaLibroModel.idEstudiante = this.estudiante[0].item_id;


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
        this.entregaLibrosService.crearentregalibro(this.EntregaLibroModel).subscribe((resp) => {
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

          this.router.navigateByUrl('/entregalibros');
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
    this.router.navigateByUrl('/entregalibros')
  }



  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
      if (this.entregaLibroSeleccionada) {

        const findMarcaPersona = this.dropdownListPersonas.find(
          (item: any) => item.item_id === this.entregaLibroSeleccionada.idDocente
        );
        if (findMarcaPersona) {
          this.onItemSelectPersona(findMarcaPersona);
          this.registerForm.get('idDocente')?.setValue(this.persona);
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
      if (this.entregaLibroSeleccionada) {
        const findEstudainte = this.dropdownListEstudiantes.find(
          (item: any) => item.item_id === this.entregaLibroSeleccionada.idEstudiante
        );
        if (findEstudainte) {
          this.onItemSelectEstudiante(findEstudainte);
          this.registerForm.get('idEstudiante')?.setValue(this.estudiante);
        }
      }
    });
  }



  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona = [item];
  }
  /** Todos los items Seleccionados */
  onSelectAllPersona(items: any) {
    this.persona = items;
  }
  /** Deselccionar item */  
  onDeSelectPersona(item: any) {
    /** Borrar elemento del array  */
    this.persona = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
  }

  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante=[item];
  }
  /** Todos los items Seleccionados */
  onSelectAllEstudiante(items: any) {
    this.estudiante = items;
  }
  /** Deselccionar item */
  onDeSelectEstudiante(item: any) {
    /** Borrar elemento del array  */
    this.estudiante = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstudiante(items: any) {
    this.estudiante = items;
  }



}
