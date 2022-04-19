import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Sucursal } from '../sucursal/sucursal.model';
import { tap, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Sucursales */
  getAllSucursales(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/sucursal`, { headers: headers });
  }
  
  getAllSucursalesSinLimite(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/sucursal/all`, { headers: headers });
  }

  
  obtenerSucursalById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/sucursal/${id}`, { headers: headers })
  }

  crearSucursal(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/sucursal`, formData, { headers: headers });
  }

  updateSucursal(id: string, sucursal: Sucursal) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/sucursal/${id}`, sucursal, { headers: headers });
  }

  eliminarSucursal(sucursal: Sucursal) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/sucursal/${sucursal._id}`, { headers: headers });
  }


  cargarSucursales(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/sucursal?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const sucursales = resp.data.map((sucursal: any) => 
            new Sucursal(sucursal._id, sucursal.idMarcas, sucursal.nombre, sucursal.sector, sucursal.descripcion, sucursal.estado)
          );

          return{
            total:resp.totalSucursales,
            sucursales
          };
        })
      )
  }

}
