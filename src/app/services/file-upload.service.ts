import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tabla:string,
    atributo:string,
    id:string
    ){
    try {
      const url = `${base_url}/utils/uploads/${tabla}/${atributo}/${id}`;
      const formData = new FormData();
      formData.append('imagen',archivo);
      const resp = await fetch(url,{
        method: 'PUT',
        //headers: {  'x-token': localStorage.getItem('token') },
        body: formData
      });
      return resp;
    } catch (error) {
      return false;
    }
  }
}
