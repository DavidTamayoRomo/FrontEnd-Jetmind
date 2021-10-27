import { Pipe, PipeTransform } from '@angular/core';
import { pipe } from 'rxjs';
import { Persona } from '../models/persona.model';
import { PersonaService } from '../pages/persona/persona.service';
import { CiudadService } from '../pages/services/ciudad.service';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'ciudades'
})
export class CiudadesPipe implements PipeTransform {


  constructor(private ciudadService:CiudadService){ }

  transform( ): any {
    console.log('ENTRE PIPE');
    return 'QUITO';
    /* this.ciudadService.getAllCiudades().subscribe((resp:any)=>{
      pipe(
        map((resp:any)=>{
          if (idCiudad == resp.data._id) {
            console.log(resp.data.nombre);
            return resp.data.nombre;
          }
        })
      )
    }
    ) */
  }

}
