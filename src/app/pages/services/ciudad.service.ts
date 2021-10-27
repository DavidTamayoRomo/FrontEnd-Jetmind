import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

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

}
