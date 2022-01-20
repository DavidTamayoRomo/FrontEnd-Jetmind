import { Component, OnInit } from '@angular/core';
import { Vigencia } from './vigencia.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder } from '@angular/forms';
import { VigenciaService } from '../services/vigencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CiudadService } from '../services/ciudad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vigencia',
  templateUrl: './vigencia.component.html',
  styles: [
  ]
})
export class VigenciaComponent implements OnInit {

  public vigenciaSeleccionada : any;

  VigenciaModel = new Vigencia();

  public dropdownListCiudades: any = [];
  public ciudad: any = [];


  public dropdownSettings: IDropdownSettings = {};

  constructor(
    private fb: FormBuilder,
    private vigenciaService:VigenciaService,
    private ciudadService:CiudadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarVigenciabyId(id);
    });

    /** Servicio que me devuelva las CIUDADES de la base de datos */
    this.recuperarDatosCiudad();
   
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  async cargarVigenciabyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.vigenciaService.obtenerVigenciaById(id)
      .subscribe((resp: any) => {
        this.vigenciaSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp:any){
    const {
      idCiudad,
      estado,
      fechaInicio,
      fechaCierre
    } = resp.data;
    this.vigenciaSeleccionada = resp.data; 
    this.registerForm.setValue({
      idCiudad,
      estado,
      fechaInicio,
      fechaCierre
    });
  }

  public registerForm = this.fb.group({
    idCiudad: [null],
    estado: [true],
    fechaInicio: [null],
    fechaCierre: [null]
  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid  && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  crearVigencia(){

    if (this.vigenciaSeleccionada) {
      //actualizar

      //ID de las ciudades
      let ciudadLista: any = [];
      this.ciudad.forEach((element: any) => {
        ciudadLista.push(element.item_id);
      });
      this.vigenciaSeleccionada.idCiudad = ciudadLista;

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
        
        this.vigenciaService.updateVigencia(this.vigenciaSeleccionada._id, this.vigenciaSeleccionada).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listavigencias');
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

      this.VigenciaModel = this.registerForm.value;

      //crear
      //ID de las ciudades
      let ciudadLista: any = [];
      this.ciudad.forEach((element: any) => {
        ciudadLista.push(element.item_id);
      });
      this.VigenciaModel.idCiudad = ciudadLista;

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
        this.vigenciaService.crearVigencia(this.VigenciaModel).subscribe((resp) => {
          
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

          this.router.navigateByUrl('/listavigencias');
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
    this.router.navigateByUrl('/listavigencias')
  }



  recuperarDatosCiudad() {
    this.ciudadService.getAllCiudades().subscribe((resp: any) => {
      let nombreciudades: any = [];
      resp.data.forEach((element: any) => {
        nombreciudades.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListCiudades = nombreciudades;
      if (this.vigenciaSeleccionada) {
        this.vigenciaSeleccionada.idCiudad.map((c: any) => {
          const findCiudad = this.dropdownListCiudades.find(
            (item: any) => {
              return item.item_id === c;
            }
          );
          if (findCiudad) {
            this.onItemSelect(findCiudad);
            this.registerForm.get('idCiudad')?.setValue(this.ciudad);
          }
        });
      }
    });
  }


  /** CIUDAD */
  /** Item Seleccionado */
  onItemSelect(item: any) {
    this.ciudad=[item];
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
    });
  }
  onDeSelect(item: any) {
    //verificar esto no se queda asi
    console.log(item);
    console.log('entre');
    if (item.item_id) {
      console.log('entre 1');
      const index = this.findByItemIdIndexCiudad(item.item_id);
      const newArray =
        index > -1
          ? [...this.ciudad.slice(0, index), ...this.ciudad.slice(index + 1)]
          : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    } else {
      console.log('entre 2');
      const index = this.ciudad.indexOf(item);
      const newArray =
        index > -1
          ? [...this.ciudad.slice(0, index), ...this.ciudad.slice(index + 1)]
          : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    }
  }

  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }


}
