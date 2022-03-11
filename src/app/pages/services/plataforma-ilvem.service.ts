import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { catchError, map, tap } from 'rxjs/operators';
import { PlataformaIlvem } from '../plataforma-ilvem/plataforma-ilvem.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlataformaIlvemService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get PlataformaIlvems */
  getAllPlataformaIlvems(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/plataformailvem`, { headers: headers });
  }

  obtenerPlataformaIlvemById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/plataformailvem/${id}`, { headers: headers })
  }

  crearPlataformaIlvem(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/plataformailvem`, formData, { headers: headers });
  }

  updatePlataformaIlvem(id:string, PlataformaIlvem:PlataformaIlvem){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/plataformailvem/${id}`, PlataformaIlvem, { headers: headers });
  }

  eliminarPlataformaIlvem( PlataformaIlvem:PlataformaIlvem){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/plataformailvem/${PlataformaIlvem._id}`, { headers: headers });
  }


  cargarPlataformaIlvems (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/plataformailvem?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const plataformaIlvems = resp.data.map((plataformaIlvem:any) => new PlataformaIlvem(plataformaIlvem._id, plataformaIlvem.idDirector, plataformaIlvem.idEstudiante, plataformaIlvem.idDocente
          , plataformaIlvem.clave
          , plataformaIlvem.pin
          , plataformaIlvem.password
          , plataformaIlvem.observaciones
          )
        );
        
        return{
          total:resp.totalPlataformaIlvems,
          plataformaIlvems
        };
      })
    )
    
     
  }
  
}
