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

  constructor() { }
}
