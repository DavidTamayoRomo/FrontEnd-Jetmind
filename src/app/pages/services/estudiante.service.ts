import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Estudiante } from '../estudiante/estudiante.model';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }


  /** Get Estudiantes */
  getAllEstudiantes() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/estudiante`, { headers: headers });
  }

  getAllEstudiantesByIdRepresentante(idEstudiante: string,idRepresentante: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/estudiante/${idEstudiante}/${idRepresentante}`, { headers: headers });
  }


  obtenerEstudianteById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/estudiante/${id}`, { headers: headers })
  }

  crearEstudiante(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/estudiante`, formData, { headers: headers });
  }

  updateEstudiante(id: string, estudiante: Estudiante) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/estudiante/${id}`, estudiante, { headers: headers });
  }

  eliminarEstudiante(estudiante: Estudiante) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/estudiante/${estudiante._id}`, { headers: headers });
  }


  cargarEstudiantes(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/estudiante?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const estudiantes = resp.data.map((estudiante: any) => new Estudiante(estudiante._id, estudiante.nombresApellidos, estudiante.email, estudiante.cedula, estudiante.telefono, estudiante.fechaNaciemiento, estudiante.direccion
            , estudiante.genero, estudiante.estado, estudiante.fotoCedula1, estudiante.fotoCedula2, estudiante.idRepresentante, estudiante.addedUser, estudiante.modifiedUser)
          );

          return{
            total:resp.totalEstudiantes,
            estudiantes
          };
        })
      )
  }

  cargarEstudiantes2(idEstudiante: string,idRepresentante: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/estudiante/${idEstudiante}/${idRepresentante}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const estudiantes = resp.data.map((estudiante: any) => new Estudiante(estudiante._id, estudiante.nombresApellidos, estudiante.email, estudiante.cedula, estudiante.telefono, estudiante.fechaNaciemiento, estudiante.direccion
            , estudiante.genero, estudiante.estado, estudiante.fotoCedula1, estudiante.fotoCedula2, estudiante.idRepresentante, estudiante.addedUser, estudiante.modifiedUser)
          );

          return{
            estudiantes
          };
        })
      )
  }

}
