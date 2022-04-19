import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Ciudad } from '../ciudad/ciudad.model';

import { catchError, map, tap } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Ciudades */
  getAllCiudades(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/ciudad`, { headers: headers });
  }
  
  getAllCiudadesSinLimite(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/ciudad/all`, { headers: headers });
  }

  obtenerCiudadById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/ciudad/${id}`, { headers: headers })
  }

  crearCiudad(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/ciudad`, formData, { headers: headers });
  }

  updateCiudad(id:string, ciudad:Ciudad){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/ciudad/${id}`, ciudad, { headers: headers });
  }

  eliminarCiudad( ciudad:Ciudad){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/ciudad/${ciudad._id}`, { headers: headers });
  }


  cargarCiudades (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/ciudad?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const ciudades = resp.data.map((ciudad:any) => new Ciudad(ciudad._id, ciudad.nombre, ciudad.email, ciudad.estado, 'S/N')
        );
        
        return{
          total:resp.totalCiudades,
          ciudades
        };
      })
    )
    
     
  }
  
}
