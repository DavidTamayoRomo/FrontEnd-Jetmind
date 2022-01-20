import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { CiudadesPipe } from './ciudades.pipe';
import { FechaPipe } from './fecha.pipe';
import { RepresentantePipe } from './representantetransform.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    CiudadesPipe,
    FechaPipe,
    RepresentantePipe
  ],
  exports: [
    ImagenPipe,
    RepresentantePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
