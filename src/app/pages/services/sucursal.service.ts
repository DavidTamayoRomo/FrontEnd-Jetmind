import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http:HttpClient) { }

  /** Get Sucursales */
  getAllSucursales(){
    return this.http.get(`${base_url}/sucursal`);
   }
}
