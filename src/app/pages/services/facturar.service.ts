import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facturar } from '../facturar/facturar.model';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FacturarService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Facturar */
  getAllFacturar(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/facturar`, { headers: headers });
  }

  obtenerFacturarById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/facturar/${id}`, { headers: headers })
  }

  crearFacturar(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/Facturar`, formData, { headers: headers });
  }

  updateFacturar(id:string, facturar:Facturar){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/facturar/${id}`, facturar, { headers: headers });
  }

  eliminarFacturar( facturar:Facturar){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/facturar/${facturar._id}`, { headers: headers });
  }


  cargarFacturar (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/facturar?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const facturas = resp.data.map((facturar:any) => 
        new Facturar(facturar?._id, facturar?.idContrato, facturar?.programa, facturar?.nombre, facturar?.cedula_ruc, 
          facturar?.telefono, facturar?.correo, facturar?.direccion, facturar?.total, facturar?.tarjetaCredito, facturar?.voucher, 
          facturar?.estado ));
        
        
        return{
          total:resp.totalFacturar,
          facturas
        };
      })
    )
    
     
  }
}
