import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from '../../services/modal-upload.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {



  constructor(public modalImagenServices: ModalUploadService ) { }

  ngOnInit(): void {
    this.cerrarModal();
  }

  cerrarModal(){
    this.modalImagenServices.cerrarModal();
  }

}
