import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EntrevistaInicialCHUK } from '../entrevista-inicial-chuk/entrevista-inicial-chuk.model';
import { tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EntrevistaInicialCHUKService {

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
    return this.http.get(`${base_url}/entrevistainicialChUk`, { headers: headers });
  }

  obtenerEntrevistaById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entrevistainicialChUk/${id}`, { headers: headers })
  }

  crearEntrevista(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/entrevistainicialChUk`, formData, { headers: headers });
  }

  updateEntrevista(id:string, entrevista:EntrevistaInicialCHUK){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/entrevistainicialChUk/${id}`, entrevista, { headers: headers });
  }

  eliminarEntrevista( entrevista:EntrevistaInicialCHUK){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/entrevistainicialChUk/${entrevista._id}`, { headers: headers });
  }


  cargarEntrevistas (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entrevistainicialChUk?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const entrevistas = resp.data.map((entrevista:any) => 
          new EntrevistaInicialCHUK(
              entrevista._id, entrevista.fecha, entrevista.tiempoCapacitacion, entrevista.estudiantes,
              entrevista.pregunta1, entrevista.pregunta2, entrevista.pregunta3, entrevista.pregunta4,
              entrevista.pregunta5, entrevista.pregunta6, entrevista.pregunta7, entrevista.pregunta8
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
