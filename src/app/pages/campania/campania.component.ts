import { Component, OnInit } from '@angular/core';
import { Campania } from './campania.model';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaniaService } from '../services/campania.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MarcaService } from '../services/marca.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-campania',
  templateUrl: './campania.component.html',
  styles: [
  ]
})
export class CampaniaComponent implements OnInit {

  public campaniaSeleccionada: any;

  CampaniaModel = new Campania();

  public dropdownListMarcas: any = [];
  public marca: any = [];
  public dropdownSettings: IDropdownSettings = {};

  constructor(
    private fb: FormBuilder,
    private campaniaService: CampaniaService,
    private activatedRoute: ActivatedRoute,
    private marcaService: MarcaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarCampaniabyId(id);
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

  async cargarCampaniabyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.campaniaService.obtenercampaniaById(id)
      .subscribe((resp: any) => {
        this.campaniaSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp: any) {
    const {
      estado,
      nombre,
      fecha_activacion,
      fecha_finalizacion,
      idMarca
    } = resp.data;
    this.campaniaSeleccionada = resp.data;
    this.registerForm.setValue({
      estado,
      nombre,
      fecha_activacion,
      fecha_finalizacion,
      idMarca
    });
  }

  public registerForm = this.fb.group({
    estado: [true],
    nombre: [null],
    fecha_activacion: [null],
    fecha_finalizacion: [null],
    idMarca: [null],
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

    if (this.campaniaSeleccionada) {
      //actualizar

      this.CampaniaModel = this.registerForm.value;

      let marcaLista: any = [];
      this.marca.forEach((element: any) => {
        marcaLista.push(element.item_id);
      });
      this.CampaniaModel.idMarca = marcaLista;

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

        this.campaniaService.updatecampania(this.campaniaSeleccionada._id, this.CampaniaModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listacampania');
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
      this.CampaniaModel = this.registerForm.value;

      //ID de las Marcas
      let marcaLista: any = [];
      this.marca.forEach((element: any) => {
        marcaLista.push(element.item_id);
      });

      this.CampaniaModel.idMarca = marcaLista;

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
        this.campaniaService.crearcampania(this.CampaniaModel).subscribe((resp) => {
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

          this.router.navigateByUrl('/listacampania');
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
    this.router.navigateByUrl('/listacampania')
  }


  recuperarDatosMarcas() {
    this.marcaService.getAllMarcasSinLimite().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;
      if (this.campaniaSeleccionada) {
        const findMarca = this.dropdownListMarcas.find(
          (item: any) => item.item_id === this.campaniaSeleccionada.idMarca
        );
        if (findMarca) {
          this.onItemSelectmarca(findMarca);
          this.registerForm.get('idMarca')?.setValue(this.marca);
        }
      }
    });


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
