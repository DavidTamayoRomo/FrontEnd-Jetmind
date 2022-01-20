import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {  Vigencia } from '../vigencia/vigencia.model';
import { tap, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VigenciaService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Vigencias */
  getAllVigencias(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/vigencia`, { headers: headers });
  }

  
  obtenerVigenciaById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/vigencia/${id}`, { headers: headers })
  }

  crearVigencia(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/vigencia`, formData, { headers: headers });
  }

  updateVigencia(id: string, vigencia: Vigencia) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/vigencia/${id}`, vigencia, { headers: headers });
  }

  eliminarVigencia(vigencia: Vigencia) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/vigencia/${vigencia._id}`, { headers: headers });
  }


  cargarVigencias(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/vigencia?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const vigencias = resp.data.map((vigencia: any) => 
            new Vigencia(vigencia._id, vigencia.idCiudad, vigencia.fechaInicio, vigencia.fechaCierre, vigencia.addedUser)
          );

          return{
            total:resp.totalVigencias,
            vigencias
          };
        })
      )
  }

}
