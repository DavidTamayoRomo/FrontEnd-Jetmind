import { Component, OnInit } from '@angular/core';
import { ControlCalidadTelemarketing } from './control-calidad-telemarketing.model';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlCalidadTelemarketingService } from '../services/control-calidad-telemarketing.service';

import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MarcaService } from '../services/marca.service';
import { CitasTelemarketingService } from '../services/citas-telemarketing.service';

@Component({
  selector: 'app-control-calidad-telemarketing',
  templateUrl: './control-calidad-telemarketing.component.html',
  styles: [
  ]
})
export class ControlCalidadTelemarketingComponent implements OnInit {

  public controlCalidadTelemarketingSeleccionada: any;

  public mostrarBoton: boolean = false;

  ControlCalidadtelemarketingModel = new ControlCalidadTelemarketing();

  public dropdownListMarcas: any = [];
  public marca: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public citasTelemarketing: any = null;

  constructor(
    private fb: FormBuilder,
    private controlCalidadTelemarketing: ControlCalidadTelemarketingService,
    private citasTelemarketingService: CitasTelemarketingService,
    private activatedRoute: ActivatedRoute,
    private marcaService: MarcaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id, idCita }) => {
      //this.cargarControlCalidadTelemarketingbyId(id);
      this.citasTelemarketing = idCita;
    });

    /** Servicio que me devuelva las MARCAS de la base de datos */
    this.recuperarDatosMarcas();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
  

  recuperarDatosMarcas() {
    this.marcaService.getAllMarcas().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;

      /* if (this.sucursalSeleccionada) {
        this.sucursalSeleccionada.idMarcas.map((m: any) => {
          console.log(m);
          const findMarca = this.dropdownListMarcas.find(
            (item: any) => item.item_id === m
          );
          console.log(findMarca);
          if (findMarca) {
            this.onItemSelectmarca(findMarca);
            this.registerForm.get('marcas')?.setValue(this.marca);
          }
        });
      } */


    });


  }

  async cargarControlCalidadTelemarketingbyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.controlCalidadTelemarketing.obtenercontrolCalidadTelemarketingById(id)
      .subscribe((resp: any) => {
        this.controlCalidadTelemarketingSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }


  LlenarForm(resp: any) {
    const {
      idCitaTelemarketing,
      estado,
      observaciones,
      pregunta1,
      pregunta2,
      pregunta3
    } = resp.data;
    this.controlCalidadTelemarketingSeleccionada = resp.data;
    this.registerForm.setValue({
      idCitaTelemarketing,
      estado,
      observaciones,
      pregunta1,
      pregunta2,
      pregunta3
    });
  }

  public registerForm = this.fb.group({
    idCitaTelemarketing: [null],
    estado: this.fb.group({
      nombre: [null],
      fecha: [null],
      tipoPago: [null],
      cantidad: [null],
    }),
    observaciones: [null],
    pregunta1: this.fb.group({
      respuesta: [null],
      detalle: [null],
    }),
    pregunta2: [null],
    pregunta3: this.fb.group({
      marcas: [null],
      ninguna: [false],
      motivo: [null],
      codigoContrato: [null],
    }),
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

    if (this.controlCalidadTelemarketingSeleccionada) {
      //actualizar
      this.ControlCalidadtelemarketingModel = this.registerForm.value;

      this.ControlCalidadtelemarketingModel.idCitaTelemarketing = this.citasTelemarketing;

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

        this.controlCalidadTelemarketing
          .updatecontrolCalidadTelemarketing(this.controlCalidadTelemarketingSeleccionada._id, this.ControlCalidadtelemarketingModel).subscribe((resp: any) => {
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
            this.router.navigateByUrl('/lista-control-calidad-telemarketing');
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

      this.ControlCalidadtelemarketingModel = this.registerForm.value;
      this.ControlCalidadtelemarketingModel.idCitaTelemarketing = this.citasTelemarketing;

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
        this.controlCalidadTelemarketing.crearcontrolCalidadTelemarketing(this.ControlCalidadtelemarketingModel).subscribe((resp) => {
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

          this.router.navigateByUrl('/lista-control-calidad-telemarketing');
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
    this.router.navigateByUrl('/lista-control-calidad-telemarketing')
  }


  /** MARCA */
  /** Item Seleccionado */
  onItemSelectmarca(item: any) {
    this.marca.push(item);
    console.log(this.marca);
  }
  /** Todos los items Seleccionados */
  onSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }
  /** Deselccionar item */
  findByItemIdIndexMarca(id: any) {
    return this.marca.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectmarca(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexMarca(item.item_id);
    const newArray = (index > -1) ? [
      ...this.marca.slice(0, index),
      ...this.marca.slice(index + 1)
    ] : this.marca;
    this.marca = newArray;
    console.log(this.marca);
  }
  /** Deselccionar todos los items */
  onDeSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }

}
