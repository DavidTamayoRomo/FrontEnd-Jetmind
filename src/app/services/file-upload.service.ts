import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

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


  /* actualizarVoucher(files:any,id:string){
    const url = `${base_url}/utils/uploadsVoucher/${id}/${files}`;
    
    return this.http.put(url);
    
  } */
}
