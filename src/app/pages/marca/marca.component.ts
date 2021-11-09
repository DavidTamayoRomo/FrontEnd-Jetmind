import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import Swal from 'sweetalert2';
import { MarcaService } from '../services/marca.service';
import { Marca } from './marca.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styles: [
  ]
})
export class MarcaComponent implements OnInit {

  public marcaSeleccionada : any;
  public imagenSubir: any;
  public imgTemp: any;

  MarcaModel = new Marca();

  constructor(
    private fb: FormBuilder,
    private marcaService:MarcaService,
    private fileUploadService:FileUploadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarMarcabyId(id);
    });
  }

  cambiarImagen(file:any){
    this.imagenSubir = file.target.files[0];
    if(!file){
      this.imgTemp = null;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'marcas','logo',this.marcaSeleccionada._id)
      .then((resp:any)=>{
        this.cargarMarcabyId(this.marcaSeleccionada._id);
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
          title: 'La imagen se actualizo correctamente'
        })
      })
      .catch(resp=>{
        console.log(resp);
      })
  }

  async cargarMarcabyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.marcaService.obtenerMarcaById(id)
      .subscribe((resp: any) => {
        this.marcaSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp:any){
    const {
      nombre,
      logo
    } = resp.data;
    this.marcaSeleccionada = resp.data; 
    this.registerForm.setValue({
      nombre,
      logo
    });
  }


  public registerForm = this.fb.group({
    nombre: [null, Validators.required],
    logo: [null],
  });


  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid  && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  crearCiudad(){

    if (this.marcaSeleccionada) {
      //actualizar
      this.MarcaModel = this.registerForm.value;
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
        
        this.marcaService.updateMarca(this.marcaSeleccionada._id, this.MarcaModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listamarcas');
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
        this.marcaService.crearMarca(this.registerForm.value).subscribe((resp) => {
          
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

          this.router.navigateByUrl('/listamarcas');
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
    this.router.navigateByUrl('/listamarcas')
  }
}
