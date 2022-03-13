import { Component, OnInit } from '@angular/core';
import { PlataformaCharlotte } from './plataforma-charlotte.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder } from '@angular/forms';
import { EstudianteService } from '../services/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from '../persona/persona.service';
import { PlataformaCharlotteService } from '../services/plataforma-charlotte.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-plataforma-charlotte',
  templateUrl: './plataforma-charlotte.component.html',
  styles: [
  ]
})
export class PlataformaCharlotteComponent implements OnInit {


  public plataformaCharlotteSeleccionada: any;

  plataformaCharlotteModel = new PlataformaCharlotte();

  public dropdownListEstudiantes: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};

  public estudiante: any = [];

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private estudiantesService: EstudianteService,
    private plataformaCharlotteService:PlataformaCharlotteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarPlataformaCharlottebyId(id);
    });

    
    this.recuperarDatosEstudiantes();

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

  async cargarPlataformaCharlottebyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.plataformaCharlotteService.obtenerplataformaCharlotteById(id)
      .subscribe((resp: any) => {
        this.plataformaCharlotteSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp: any) {
    const {
      idEstudiante,
      nivel,
      fechaEntrega,
      fechaActivacion,
      fechaFin
    } = resp.data;
    this.plataformaCharlotteSeleccionada = resp.data;
    this.registerForm.setValue({
      idEstudiante,
      nivel,
      fechaEntrega,
      fechaActivacion,
      fechaFin
    });
  }

  public registerForm = this.fb.group({
    idEstudiante: [null],
    nivel: [null],
    fechaEntrega: [null],
    fechaActivacion: [null],
    fechaFin: [null],
  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  crear() {
    if (this.plataformaCharlotteSeleccionada) {
      //actualizar
      this.plataformaCharlotteModel = this.registerForm.value;

      //ID de las estudiante
      this.plataformaCharlotteModel.idEstudiante = this.estudiante[0].item_id;


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

        this.plataformaCharlotteService.updateplataformaCharlotte(this.plataformaCharlotteSeleccionada._id, this.plataformaCharlotteModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/lista-platafoma-charlotte');
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
      this.plataformaCharlotteModel = this.registerForm.value;

     //ID de las estudiante
     this.plataformaCharlotteModel.idEstudiante = this.estudiante[0].item_id;

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
        this.plataformaCharlotteService.crearplataformaCharlotte(this.plataformaCharlotteModel).subscribe((resp) => {
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

          this.router.navigateByUrl('/lista-platafoma-charlotte');
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
    this.router.navigateByUrl('/lista-platafoma-charlotte')
  }


  recuperarDatosEstudiantes() {
    this.estudiantesService.getAllEstudiantesSinLimite().subscribe((resp: any) => {
      let nombreEstudiantes: any = [];
      resp.data.forEach((element: any) => {
        nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListEstudiantes = nombreEstudiantes;
      if (this.plataformaCharlotteSeleccionada) {
        const findEstudainte = this.dropdownListEstudiantes.find(
          (item: any) => item.item_id === this.plataformaCharlotteSeleccionada.idEstudiante
        );
        if (findEstudainte) {
          this.onItemSelectEstudiante(findEstudainte);
          this.registerForm.get('idEstudiante')?.setValue(this.estudiante);
        }
      }
    });
  }


  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante= [item];
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
