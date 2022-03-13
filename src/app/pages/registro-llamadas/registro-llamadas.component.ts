import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EstudianteService } from '../services/estudiante.service';
import { RegistroLlamadasService } from '../services/registro-llamadas.service';
import { RegistroLlamadas } from './registro-llamadas.model';


import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro-llamadas',
  templateUrl: './registro-llamadas.component.html',
  styles: [
  ]
})
export class RegistroLlamadasComponent implements OnInit {

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public dropdownListEstudiantes: any = [];

  public estudiante: any = [];

  public registroSeleccionada: any ;

  RegistroModel = new RegistroLlamadas();

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudianteService,
    private registroService: RegistroLlamadasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarRegistrobyId(id);
      console.log(id);
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

  }


  async cargarRegistrobyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.registroService.obtenerregistroById(id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.registroSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }


  LlenarForm(resp: any) {
    const {
      idEstudiante,
      fecha,
      comenterio,
      numeroTelefonico
    } = resp.data;
    this.registroSeleccionada = resp.data;
    this.registerForm.setValue({
      idEstudiante,
      fecha,
      comenterio,
      numeroTelefonico
    });
  }

  public registerForm = this.fb.group({
    idEstudiante: [null],
    fecha: [null],
    comenterio: [null],
    numeroTelefonico: [null],
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
    console.log(this.registroSeleccionada);
    if (this.registroSeleccionada) {
      //actualizar
      this.RegistroModel = this.registerForm.value;

      //ID de las ciudades
      let estudiantelista: any = [];
      this.estudiante.forEach((element: any) => {
        if (element.item_id) {
          estudiantelista.push(element.item_id);
        } else {
          estudiantelista.push(element);
        }
      });
      this.RegistroModel.idEstudiante = estudiantelista;

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

        this.registroService.updateregistro(this.registroSeleccionada._id, this.registroSeleccionada).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/registrollamadas');
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
      this.RegistroModel = this.registerForm.value;

      //ID de las ciudades
      let estudiantelista: any = [];
      this.estudiante.forEach((element: any) => {
        if (element.item_id) {
          estudiantelista.push(element.item_id);
        } else {
          estudiantelista.push(element);
        }
      });
      this.RegistroModel.idEstudiante = estudiantelista;

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
        this.registroService.crearregistro(this.RegistroModel).subscribe((resp) => {
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

          this.router.navigateByUrl('/registrollamadas');
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

}
