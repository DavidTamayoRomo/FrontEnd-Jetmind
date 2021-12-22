import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contrato } from '../contrato-form/contrato.model';
import { tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Contratos */
  getAllContratos(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/contrato`, { headers: headers });
  }

  obtenerContratoById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/contrato/${id}`, { headers: headers })
  }

  crearContrato(formData: Contrato) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/contrato`, formData, { headers: headers });
  }

  updatecontrato(id:string, contrato:Contrato){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/contrato/${id}`, contrato, { headers: headers });
  }

  eliminarcontrato( contrato:Contrato){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/contrato/${contrato._id}`, { headers: headers });
  }


  cargarContratos (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/contrato?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const contratos = resp.data.map((contrato:any) => new Contrato(contrato._id, contrato.fecha, 
          contrato.estado, contrato.idRepresentante, contrato.tipoPago,contrato.estadoVenta,contrato.abono
          ,contrato.valorMatricula,contrato.valorTotal,contrato.numeroCuotas,contrato.formaPago,contrato.comentario,
          contrato.directorAsignado,contrato.fechaAprobacion, contrato.voucher));
        
        return{
          total:resp.totalContratos,
          contratos
        };
      })
    )
    
     
  }
}
