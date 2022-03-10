import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { catchError, map, tap } from 'rxjs/operators';
import { PlataformaCharlotte } from '../plataforma-charlotte/plataforma-charlotte.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlataformaCharlotteService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get PlataformaCharlottes */
  getAllPlataformaCharlottes(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/plataformacharlotte`, { headers: headers });
  }

  obtenerplataformaCharlotteById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/plataformacharlotte/${id}`, { headers: headers })
  }

  crearplataformaCharlotte(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/plataformacharlotte`, formData, { headers: headers });
  }

  updateplataformaCharlotte(id:string, plataformaCharlotte:PlataformaCharlotte){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/plataformacharlotte/${id}`, plataformaCharlotte, { headers: headers });
  }

  eliminarplataformaCharlotte( plataformaCharlotte:PlataformaCharlotte){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/plataformacharlotte/${plataformaCharlotte._id}`, { headers: headers });
  }


  cargarPlataformaCharlottes (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/plataformacharlotte?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const plataformaCharlottes = resp.data.map((plataformaCharlotte:any) => 
        new PlataformaCharlotte(plataformaCharlotte._id, plataformaCharlotte.idEstudiante, plataformaCharlotte.nivel, plataformaCharlotte.fechaEntrega
          , plataformaCharlotte.fechaActivacion, plataformaCharlotte.fechaFin)
        );
        
        return{
          total:resp.totalPlataformaCharlottes,
          plataformaCharlottes
        };
      })
    )
    
     
  }
}
