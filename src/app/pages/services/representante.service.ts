import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Representante } from '../representante/representante.model';
import { environment } from '../../../environments/environment';
import { tap, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  constructor(private http: HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Representantes */
  getAllRepresentantes() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/representante`, { headers: headers });
  }
  
  getAllRepresentantesSinLimite() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/representante/all`, { headers: headers });
  }


  obtenerRepresentanteById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/representante/${id}`, { headers: headers })
  }

  crearRepresentante(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/representante`, formData, { headers: headers });
  }

  updateRepresentante(id: string, representante: Representante) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/representante/${id}`, representante, { headers: headers });
  }

  eliminarRepresentante(representante: Representante) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/representante/${representante._id}`, { headers: headers });
  }


  cargarRepresentantes(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/representante?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const representantes = resp.data.map((representante: any) => new Representante(representante._id, representante.nombresApellidos, representante.email, representante.cedula, representante.telefono, representante.fechaNaciemiento, representante.direccion
            , representante.genero, representante.estado, representante.fotoCedula1, representante.fotoCedula2, representante.lugarTrabajo, representante.numeroEmergencia, representante.telefonoOficina, representante.telefonoDomicilio, representante.addedUser, representante.modifiedUser)
          );

          return{
            total:resp.totalRepresentantes,
            representantes
          };
        })
      )


  }
}
