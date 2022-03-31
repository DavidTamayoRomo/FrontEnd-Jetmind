import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { EntrevistaInicialTM } from '../entrevista-inicial-tm/entrevista-inicial-tm.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EntrevistaInicialTmService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Entrevistas */
  getAllEntrevistas(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entrevistainicialtomatis`, { headers: headers });
  }

  obtenerEntrevistaById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entrevistainicialtomatis/${id}`, { headers: headers })
  }

  crearEntrevista(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/entrevistainicialtomatis`, formData, { headers: headers });
  }

  updateEntrevista(id:string, entrevista:EntrevistaInicialTM){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/entrevistainicialtomatis/${id}`, entrevista, { headers: headers });
  }

  eliminarEntrevista( entrevista:EntrevistaInicialTM){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/entrevistainicialtomatis/${entrevista._id}`, { headers: headers });
  }


  cargarEntrevistas (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entrevistainicialtomatis?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const entrevistas = resp.data.map((entrevista:any) => 
          new EntrevistaInicialTM(
              entrevista._id, entrevista.estudiantes,
              entrevista.observaciones, 
            )
        );
        
        return{
          total:resp.totalEntrevistas,
          entrevistas
        };
      })
    )
    
     
  }

}
