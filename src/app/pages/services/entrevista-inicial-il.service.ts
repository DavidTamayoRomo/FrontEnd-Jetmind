import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { EntrevistaInicialIL } from '../entrevista-inicial-il/entrevista-inicial-il.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class entrevistainicialilvemService {

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
    return this.http.get(`${base_url}/entrevistainicialilvem`, { headers: headers });
  }

  obtenerEntrevistaById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entrevistainicialilvem/${id}`, { headers: headers })
  }

  crearEntrevista(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/entrevistainicialilvem`, formData, { headers: headers });
  }

  updateEntrevista(id:string, entrevista:EntrevistaInicialIL){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/entrevistainicialilvem/${id}`, entrevista, { headers: headers });
  }

  eliminarEntrevista( entrevista:EntrevistaInicialIL){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/entrevistainicialilvem/${entrevista._id}`, { headers: headers });
  }


  cargarEntrevistas (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entrevistainicialilvem?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const entrevistas = resp.data.map((entrevista:any) => 
          new EntrevistaInicialIL(
              entrevista._id, entrevista.fecha, entrevista.tiempoCapacitacion, entrevista.estudiantes,
              entrevista.pregunta1, entrevista.pregunta2, entrevista.pregunta3, entrevista.pregunta4,
              entrevista.pregunta5, entrevista.pregunta6
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
