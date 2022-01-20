import { Component, OnInit } from '@angular/core';
import { NombrePrograma } from './nombre-programa.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NombreProgramaService } from '../services/nombre-programa.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { CiudadService } from '../services/ciudad.service';
import { MarcaService } from '../services/marca.service';

@Component({
  selector: 'app-nombre-programa',
  templateUrl: './nombre-programa.component.html',
  styles: [
  ]
})
export class NombreProgramaComponent implements OnInit {

  public nombreProgramaSeleccionada: any;
  NombreProgramaModel = new NombrePrograma();

  public dropdownListCiudades: any = [];
  public dropdownListMarcas: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettings1: IDropdownSettings = {};
  public ciudad: any = [];
  public marca: any = [];

  constructor(
    private fb: FormBuilder,
    private nombreProgramaService: NombreProgramaService,
    private ciudadService: CiudadService,
    private marcaService: MarcaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarnombreProgramabyId(id);
    });
    /** Servicio que me devuelva las CIUDADES de la base de datos */
    this.recuperarDatosCiudad();
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

    this.dropdownSettings1 = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  recuperarDatosCiudad() {
    this.ciudadService.getAllCiudades().subscribe((resp: any) => {
      let nombreciudades: any = [];
      resp.data.forEach((element: any) => {
        nombreciudades.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListCiudades = nombreciudades;
      if (this.nombreProgramaSeleccionada) {
        this.nombreProgramaSeleccionada.idCiudad.map((c: any) => {
          const findCiudadPersona = this.dropdownListCiudades.find(
            (item: any) => {
              return item.item_id === c;
            }
          );
          if (findCiudadPersona) {
            this.onItemSelect(findCiudadPersona);
            this.registerForm.get('idCiudad')?.setValue(this.ciudad);
          }
        });
      }
      
    });
  }
  recuperarDatosMarcas() {
    this.marcaService.getAllMarcas().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;
      if (this.nombreProgramaSeleccionada) {
        this.nombreProgramaSeleccionada.idMarca.map((m: any) => {
          const findMarcaPersona = this.dropdownListMarcas.find(
            (item: any) => item.item_id === m
          );
          if (findMarcaPersona) {
            this.onItemSelectmarca(findMarcaPersona);
            this.registerForm.get('idMarca')?.setValue(this.marca);
          }
        });
      }
      
    });
  }

  async cargarnombreProgramabyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.nombreProgramaService.obtenernombreProgramaById(id)
      .subscribe((resp: any) => {
        this.nombreProgramaSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }


  LlenarForm(resp: any) {
    const {
      idCiudad,
      idMarca,
      nombre,
      estado,
      observaciones
    } = resp.data;
    this.nombreProgramaSeleccionada = resp.data;
    this.registerForm.setValue({
      idCiudad,
      idMarca,
      nombre,
      estado,
      observaciones
    });
  }

  public registerForm = this.fb.group({
    idCiudad: [null, Validators.required],
    idMarca: [null, [Validators.required]],
    nombre: [null],
    estado: [true],
    observaciones: [null]
  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  async crearnombrePrograma() {

    if (this.nombreProgramaSeleccionada) {
      //actualizar
      this.NombreProgramaModel = this.registerForm.value;

      //ID de las Marcas
      let marcaLista: any = [];
      const marcaEspera = await this.marca.forEach((element: any) => {
        if (element.item_id) {
          marcaLista.push(element.item_id);
        } else {
          marcaLista.push(element);
        }
      });
      this.NombreProgramaModel.idMarca = marcaLista;
      //ID de las ciudades
      let ciudadLista: any = [];
      const ciudadEspera = await this.ciudad.forEach((element: any) => {
        if (element.item_id) {
          ciudadLista.push(element.item_id);
        } else {
          ciudadLista.push(element);
        }
      });
      this.NombreProgramaModel.idCiudad = ciudadLista;

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

        this.nombreProgramaService.updatenombrePrograma(this.nombreProgramaSeleccionada._id, this.NombreProgramaModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listanombreprogramas');
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

      this.NombreProgramaModel = this.registerForm.value;

      //ID de las ciudades
      let ciudadLista: any = [];
      this.ciudad.forEach((element: any) => {
        ciudadLista.push(element.item_id);
      });
      this.NombreProgramaModel.idCiudad = ciudadLista;
      //ID de las Marcas
      let marcaLista: any = [];
      this.marca.forEach((element: any) => {
        marcaLista.push(element.item_id);
      });
      this.NombreProgramaModel.idMarca = marcaLista;

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
        this.nombreProgramaService.crearnombrePrograma(this.NombreProgramaModel).subscribe((resp) => {

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

          this.router.navigateByUrl('/listanombreprogramas');
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
    this.router.navigateByUrl('/listanombreprogramas')
  }



  /** CIUDAD */
  /** Item Seleccionado */
  onItemSelect(item: any) {
    this.ciudad.push(item);
    console.log(this.ciudad);
  }
  /** Todos los items Seleccionados */
  onSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }
  /** Deselccionar item */
  findByItemIdIndexCiudad(id: any) {
    return this.ciudad.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelect(item: any) {
    //verificar esto no se queda asi
    console.log(item);
    console.log("entre");
    if (item.item_id) {
      console.log("entre 1");
      const index = this.findByItemIdIndexCiudad(item.item_id);
      const newArray = (index > -1) ? [
        ...this.ciudad.slice(0, index),
        ...this.ciudad.slice(index + 1)
      ] : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    } else {
      console.log("entre 2");
      const index = this.ciudad.indexOf(item);
      const newArray = (index > -1) ? [
        ...this.ciudad.slice(0, index),
        ...this.ciudad.slice(index + 1)
      ] : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    }
  }


  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
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
