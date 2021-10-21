import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalImagenComponent } from './modal-imagen/modal-imagen.component';



@NgModule({
  declarations: [
    ModalImagenComponent,
  ],
  exports:[
    ModalImagenComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
