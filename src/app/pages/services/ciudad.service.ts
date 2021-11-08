import { HttpClient } from '@angular/common/http';
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

  /** Get Ciudades */
  getAllCiudades(){
    return this.http.get(`${base_url}/ciudad`);
  }

  obtenerCiudadById(id:string){
    return this.http.get(`${base_url}/ciudad/${id}`)
  }

  crearCiudad(formData: any) {
    console.log(formData)
    return this.http.post(`${base_url}/ciudad`, formData);
  }

  updateCiudad(id:string, ciudad:Ciudad){
    return this.http.put(`${base_url}/ciudad/${id}`, ciudad);
  }

  eliminarCiudad( ciudad:Ciudad){
    return this.http.delete(`${base_url}/ciudad/${ciudad._id}`);
  }


  cargarCiudades (skip: number = 0){
    return this.http.get(`${base_url}/ciudad?skip=${skip}`)
    .pipe(
      tap( (resp:any) => {
        
        const ciudades = resp.data.map((ciudad:any) => new Ciudad(ciudad._id, ciudad.nombre, ciudad.email, ciudad.estado, 'S/N')
        );
        
        return;
      })
    )
    
     
  }
  
}
