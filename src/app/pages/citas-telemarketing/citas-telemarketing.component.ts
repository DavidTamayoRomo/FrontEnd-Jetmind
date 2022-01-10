import { Component, OnInit,ChangeDetectionStrategy,
  ViewChild,
  TemplateRef  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CitasTelemarketingService } from '../services/citas-telemarketing.service';
import { MarcaService } from '../services/marca.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CitaTelemarketing } from './citaTelemarketing.model';


@Component({
  selector: 'app-citas-telemarketing',
  templateUrl: './citas-telemarketing.component.html',
  styles: [
  ]
})
export class CitasTelemarketingComponent implements OnInit {

    public citaTelemarketingSeleccionada: any;
  public citaTelemarketingModel: CitaTelemarketing = new CitaTelemarketing();

  public dropdownListMarcas: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public marca: any = [];

  constructor(
    private fb: FormBuilder,
    private citasTelemarketingService:CitasTelemarketingService,
    private router: Router,
    private marcaService: MarcaService
    ) { }

  ngOnInit(): void {
    this.recuperarDatosMarcas();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true,
    };

  }

  public registerForm = this.fb.group({
    revisado: [null],
    fecha: [null],
    idMarca: [null],
    estado: [null],
    nombreApellidoRepresentante: [null],
    telefono: [null],
    ciudad: [null],
    actividadEconomica: [null],
    estudiante: [null],
    observaciones: [null],
    tarjeraCredito: [null],
    tarjeta: [null],
    forma: [null],
    fechaCita: [null],
    asignado: [null],
    observacionesAsesor: [null],
  });

  campoNoValido(campo: any): boolean {
    if (
      this.registerForm.get(campo)?.invalid &&
      (this.registerForm.get(campo)?.dirty ||
        this.registerForm.get(campo)?.touched)
    ) {
      return true;
    } else {
      return false;
    }
  }

  crearCitasTelemarketing() {
    if (this.citaTelemarketingSeleccionada) {
      //actualizar
      this.citaTelemarketingModel = this.registerForm.value;
      if (this.registerForm.invalid) {
        //Formulario invalido
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'error',
          title: 'Verificar campos invalidos \n Indicados con el color rojo',
        });
        return;
      } else {
        this.citasTelemarketingService
          .updateCitasTelemarketing(
            this.citaTelemarketingSeleccionada._id,
            this.citaTelemarketingModel
          )
          .subscribe(
            (resp: any) => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });
              Toast.fire({
                icon: 'success',
                title: 'Se actualizo correctamente',
              });
              this.router.navigateByUrl('/listarepresentantes');
            },
            (err: any) => {
              console.warn(err.error.message);

              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              //TODO: Mostrar error cuando es administrador. Dato que muestra el error completo=  err.error.message
              Toast.fire({
                icon: 'error',
                title:
                  'ERROR: ' +
                  err.error.statusCode +
                  '\nContactese con su proveedor de software ',
              });
            }
          );
      }
    } else {
      //crear
      if (this.registerForm.invalid) {
        console.log('Formulario invalido');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'error',
          title:
            '- Campos con asterisco son obligatorios\n - Verificar campos invalidos, \n indicados con el color rojo  ',
        });
        return;
      } else {
        this.citasTelemarketingService
          .crearCitasTelemarketing(this.registerForm.value)
          .subscribe(    );
      }
    }
  }

  cancelarGuardado() {
    //TODO: cambiar ruta
    this.router.navigateByUrl('/');
  }

  recuperarDatosMarcas() {
    this.marcaService.getAllMarcas().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;
      /* this.programaSeleccionada.idMarca.map((m: any) => {
        const findMarcaPersona = this.dropdownListMarcas.find(
          (item: any) => item.item_id === m
        );
        if (findMarcaPersona) {
          this.onItemSelectmarca(findMarcaPersona);
          this.registerForm.get('idMarca')?.setValue(this.marca);
        }
      }); */

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
