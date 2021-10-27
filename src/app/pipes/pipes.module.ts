import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { CiudadesPipe } from './ciudades.pipe';
import { FechaPipe } from './fecha.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    CiudadesPipe,
    FechaPipe
  ],
  exports: [
    ImagenPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
