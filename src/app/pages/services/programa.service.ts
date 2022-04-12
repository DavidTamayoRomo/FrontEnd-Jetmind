import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Programa } from '../programa/programa.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(private http: HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Programa */
  getAllProgramas() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/programa`, { headers: headers });
  }


  obtenerProgramaById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/programa/${id}`, { headers: headers })
  }
  
  obtenerProgramaByIdEstudiante(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/programa/idEstudiante/${id}`, { headers: headers })
  }

  crearPrograma(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/programa`, formData, { headers: headers });
  }

  updatePrograma(id: string, programa: Programa) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/programa/${id}`, programa, { headers: headers });
  }

  eliminarPrograma(programa: Programa) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/programa/${programa._id}`, { headers: headers });
  }
  
  allByCiudadMarcaSucursalNombreprograma(datos: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/programa/reporte-estudiante`, datos, { headers: headers });
  }


  cargarPrograma(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/programa?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const programas = resp.data.map((programa: any) => new Programa( programa._id, programa.idMarca, programa.idCiudad, 
            programa.idSucursal, programa.idNombrePrograma, programa.tipo, programa.modalidad, programa.idEstudiante) );

          return{
            total:resp.totalPrograma,
            programas
          };
        })
      )


  }
}
