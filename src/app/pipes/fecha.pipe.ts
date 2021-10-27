import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: any): any {
    let date = new Date(fecha);
    let fechaConvertida = date.getFullYear()+'/' + (date.getMonth()+1) + '/'+date.getDate();
    return fechaConvertida;
  }

}
