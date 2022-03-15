import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { catchError, map, tap } from 'rxjs/operators';
import { ControlCalidadTelemarketing } from '../control-calidad-telemarketing/control-calidad-telemarketing.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ControlCalidadTelemarketingService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get controlCalidadTelemarketing */
  getAllcontrolCalidadTelemarketing(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/controlcalidad`, { headers: headers });
  }

  obtenercontrolCalidadTelemarketingById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/controlcalidad/${id}`, { headers: headers })
  }

  crearcontrolCalidadTelemarketing(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/controlcalidad`, formData, { headers: headers });
  }

  updatecontrolCalidadTelemarketing(id:string, controlCalidadTelemarketing:ControlCalidadTelemarketing){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/controlcalidad/${id}`, controlCalidadTelemarketing, { headers: headers });
  }

  eliminarcontrolCalidadTelemarketing( controlCalidadTelemarketing:ControlCalidadTelemarketing){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/controlcalidad/${controlCalidadTelemarketing._id}`, { headers: headers });
  }


  cargarcontrolCalidadTelemarketing (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/controlcalidad?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const controlCalidadTelemarketing = 
          resp.data.map((controlCalidadTelemarketing:any) => 
          new ControlCalidadTelemarketing(
              controlCalidadTelemarketing._id, controlCalidadTelemarketing.idCitaTelemarketing, controlCalidadTelemarketing.estado,
              controlCalidadTelemarketing.fecha, controlCalidadTelemarketing.tipoPago, controlCalidadTelemarketing.fecha,
              controlCalidadTelemarketing.observaciones, controlCalidadTelemarketing.pregunta1,
              controlCalidadTelemarketing.pregunta2, controlCalidadTelemarketing.pregunta3
             )
        );
        
        return{
          total:resp.totalcontrolCalidadTelemarketing,
          controlCalidadTelemarketing
        };
      })
    )
    
     
  }

}
