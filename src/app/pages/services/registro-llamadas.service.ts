import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { catchError, map, tap } from 'rxjs/operators';
import { RegistroLlamadas } from '../registro-llamadas/registro-llamadas.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RegistroLlamadasService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get registros */
  getAllregistros(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/registrollamada`, { headers: headers });
  }

  obtenerregistroById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/registrollamada/${id}`, { headers: headers })
  }

  crearregistro(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/registrollamada`, formData, { headers: headers });
  }

  updateregistro(id:string, registro:RegistroLlamadas){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/registrollamada/${id}`, registro, { headers: headers });
  }

  eliminarregistro( registro:RegistroLlamadas){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/registrollamada/${registro._id}`, { headers: headers });
  }


  cargarregistros (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/registrollamada?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const registros = resp.data.map((registro:any) => new RegistroLlamadas(registro._id, registro.idEstudiante, registro.fecha, registro.comenterio
          , registro.numeroTelefonico)
        );
        
        return{
          total:resp.totalRegistros,
          registros
        };
      })
    )
    
     
  }

}
