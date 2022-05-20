import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {


  transform(img: string, tipo: any): string {
    //return  `${environment.base_url}/utils/uploads/${tipo}/${img}`;
    return  `${environment.base_url}/utils/getDigitalOCean/${img}`;
  }

}
