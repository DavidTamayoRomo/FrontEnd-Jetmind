import { Injectable } from '@angular/core';
import { Verificacion } from '../verificacion/verificacion.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Verificaciones */
  getAllVerificaciones(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/verificacion`, { headers: headers });
  }

  
  obtenerVerificacionById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/verificacion/${id}`, { headers: headers })
  }

  crearVerificacion(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/verificacion`, formData, { headers: headers });
  }

  updateVerificacion(id: string, verificacion: Verificacion) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/verificacion/${id}`, verificacion, { headers: headers });
  }

  eliminarVerificacion(verificacion: Verificacion) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/verificacion/${verificacion._id}`, { headers: headers });
  }

  reporteVerificacion(datos:any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/verificacion/verificacion-reporte`, datos,{ headers: headers });
  }

  cargarVerificaciones(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/verificacion?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const verificaciones = resp.data.map((verificacion: any) => 
            new Verificacion(verificacion._id, verificacion.estado, verificacion.idContrato, 
              verificacion.fechaVerificacion,verificacion.cobranza, verificacion.addedUser)
          );

          return{
            total:resp.totalVerificaciones,
            verificaciones
          };
        })
      )
  }

}
