import { Pipe, PipeTransform } from '@angular/core';
import { RepresentanteService } from '../pages/services/representante.service';

@Pipe({
  name: 'representantepipe'
})
export class RepresentantePipe implements PipeTransform {

 

  constructor(private representanteSerice:RepresentanteService) { }

  transform(valor:string): any {
    let nombre;
    this.representanteSerice.obtenerRepresentanteById(valor).subscribe((resp:any)=>{
      nombre =  `${resp.data.nombresApellidos}`;
      console.log(nombre);
      return nombre.toString();
    });    
  }

}
