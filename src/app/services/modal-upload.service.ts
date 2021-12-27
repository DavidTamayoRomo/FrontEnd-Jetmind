import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  private _ocultarModal:boolean= false;

  get ocultarModal(){
    return this._ocultarModal;
  }

  abrirModal(){
    this._ocultarModal = false;
  }
  
  cerrarModal(){
    this._ocultarModal = true;
  }

  //llenar campos del modal
  llenarCampos(nombresApellidos: string = 'David',
    email: any = '',
    cedula: any=0,
    telefono: any=0,
    fechaNacimiento: any='',
    direccion: any='',
    genero: any='',
    estado:any='',
    idMarca: any='',
    idCiudad: any='',
    idSucursal: any='',
    idNombrePrograma: any=''
    ){
    //Abre el modal
    this._ocultarModal = false;
    console.log('Usando servico',nombresApellidos);
    

  }

  limpiarCampos(){
    this._ocultarModal = true;
  }

  constructor() { }
}
