import { Component, OnInit } from '@angular/core';
import { Estudiante } from './estudiante.model';
import { FormBuilder, Validators } from '@angular/forms';
import { RepresentanteService } from '../services/representante.service';
import { FileUploadService } from '../../services/file-upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../services/estudiante.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styles: [
  ]
})
export class EstudianteComponent implements OnInit {

  public dropdownListRepresentantes: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public estudianteSeleccionada: any;
  public representante: any = [];

  public valor: any = null;

  EstudianteModel = new Estudiante();

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private representanteService: RepresentanteService,
    private fileUploadService: FileUploadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarEstudiantebyId(id);
    });

    /** Servicio que me devuelva las REPRESENTANTES de la base de datos */
    this.recuperarDatosRepresentantes();

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

  recuperarDatosRepresentantes() {
    this.representanteService.getAllRepresentantes().subscribe((resp: any) => {
      let nombrerepresentantes: any = [];
      resp.data.forEach((element: any) => {
        nombrerepresentantes.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      console.log(nombrerepresentantes);
      this.dropdownListRepresentantes = nombrerepresentantes;
    });
  }

  LlenarForm(resp: any) {
    this.EstudianteModel = resp.data;
    const {
      nombresApellidos,
      email,
      cedula,
      telefono,
      fechaNacimiento,
      direccion,
      genero,
      estado,
      idRepresentante
    } = resp.data;

    console.log(resp.data);
    this.registerForm.setValue({
      nombresApellidos,
      email,
      cedula,
      telefono,
      fechaNacimiento,
      direccion,
      genero,
      estado,
      idRepresentante
    })

  }


  public registerForm = this.fb.group({
    nombresApellidos: [null, Validators.required],
    email: [null, Validators.required],
    cedula: [null, Validators.required],
    telefono: [null, Validators.required],
    fechaNacimiento: [null, Validators.required],
    direccion: [null],
    genero: [null],
    estado: [null],
    idRepresentante: [null]
  });


  async cargarEstudiantebyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.estudianteService.obtenerEstudianteById(id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.estudianteSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  cancelarGuardado() {
    this.router.navigateByUrl('/listapersonas')
  }

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  crearEstudiante() {

    if (this.estudianteSeleccionada) {
      //actualizar
      this.EstudianteModel = this.registerForm.value;

      //ID de las Rrepresentantes
      let representanteLista: any = [];
      this.representante.forEach((element: any) => {
        if (element.item_id) {
          representanteLista.push(element.item_id);
        } else {
          representanteLista.push(element);
        }
      });
      this.EstudianteModel.idRepresentante = representanteLista;
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

        this.estudianteService.updateEstudiante(this.estudianteSeleccionada._id, this.EstudianteModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listaestudiantes');
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

      this.EstudianteModel = this.registerForm.value;
      //ID de las Rrepresentantes
      let representanteLista: any = [];
      this.representante.forEach((element: any) => {
        if (element.item_id) {
          representanteLista.push(element.item_id);
        } else {
          representanteLista.push(element);
        }
      });
      this.EstudianteModel.idRepresentante = representanteLista;
      if (this.registerForm.invalid) {
        console.log('Formulario invalido');
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
        this.estudianteService.crearEstudiante(this.EstudianteModel).subscribe((resp) => {

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

          this.router.navigateByUrl('/listaestudiantes');
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


  /** REPRESENTANTE */
  /** Item Seleccionado */
  onItemSelectRepresentante(item: any) {
    this.representante.push(item);
  }
  /** Todos los items Seleccionados */
  onSelectAllRepresentante(items: any) {
    this.representante = items;
  }
  /** Deselccionar item */
  findByItemIdIndexRepresentante(id: any) {
    return this.representante.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectRepresentante(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexRepresentante(item.item_id);
    const newArray = (index > -1) ? [
      ...this.representante.slice(0, index),
      ...this.representante.slice(index + 1)
    ] : this.representante;
    this.representante = newArray;
  }
  /** Deselccionar todos los items */
  onDeSelectAllRepresentante(items: any) {
    this.representante = items;
  }




}
