import { Component, OnInit } from '@angular/core';
import { Facturar } from './facturar.model';
import { FormBuilder, Validators } from '@angular/forms';
import { FacturarService } from '../services/facturar.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MarcaService } from '../services/marca.service';

@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styles: [
  ]
})
export class FacturarComponent implements OnInit {

  public dropdownListMarcas: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public marca: any = [];

  FacturarModel = new Facturar();

  public facturaSeleccionada: any;

  constructor(
    private fb: FormBuilder,
    private facuturarService: FacturarService,
    private marcaService: MarcaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarFacturabyId(id);
    });
     /** Servicio que me devuelva las MARCAS de la base de datos */
     this.recuperarDatosMarcas();

     this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
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

    });
  }

  async cargarFacturabyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.facuturarService.obtenerFacturarById(id)
      .subscribe((resp: any) => {
        this.facturaSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }


  LlenarForm(resp: any) {
    const {
      idContrato,
      programa,
      nombre,
      cedula_ruc,
      telefono,
      correo,
      direccion,
      total,
      tarjetaCredito
    } = resp.data;
    this.facturaSeleccionada = resp.data;
    this.registerForm.setValue({
      idContrato,
      programa,
      nombre,
      cedula_ruc,
      telefono,
      correo,
      direccion,
      total,
      tarjetaCredito
    });
  }

  public registerForm = this.fb.group({
      idContrato:[null],
      programa:[null, Validators.required],
      nombre:[null, Validators.required],
      cedula_ruc:[null, Validators.required],
      telefono:[null],
      correo:[null, Validators.required],
      direccion:[null],
      total:[null, Validators.required],
      tarjetaCredito:[true]
  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid  && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  async crearFactura(){

    if (this.facturaSeleccionada) {
      //actualizar
      this.FacturarModel = this.registerForm.value;
      //ID de las Marcas
      let marcaLista: any = [];
      const marcaEspera = await this.marca.forEach((element: any) => {
        if (element.item_id) {
          marcaLista.push(element.item_id);
        } else {
          marcaLista.push(element);
        }
      });
      this.FacturarModel.programa = marcaLista;
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
        
        this.facuturarService.updateFacturar(this.facturaSeleccionada._id, this.FacturarModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listafacturar');
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
    }else{
      //crear

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
      }else{
        this.FacturarModel = this.registerForm.value;
        //ID de las Marcas
        let marcaLista: any = [];
        this.marca.forEach((element: any) => {
          marcaLista.push(element.item_id);
        });
        this.FacturarModel.programa = marcaLista;
        
        this.facuturarService.crearFacturar(this.registerForm.value).subscribe((resp) => {
          
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

          this.router.navigateByUrl('/listafacturar');
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


  cancelarGuardado(){
    this.router.navigateByUrl('/listafacturar');
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

