import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Asistencia } from '../asistencia/asistencia.model';
import { tap, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Asistencias */
  getAllAsistencias(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/asistencia`, { headers: headers });
  }

  obtenerAsistenciaById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/asistencia/${id}`, { headers: headers })
  }

  crearAsistencia(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/asistencia`, formData, { headers: headers });
  }

  updateAsistencia(id:string, asistencia:Asistencia){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/asistencia/${id}`, asistencia, { headers: headers });
  }

  eliminarAsistencia( asistencia:Asistencia){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/asistencia/${asistencia._id}`, { headers: headers });
  }

  asistenciaByEstudiante( idEstudiante:any){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/asistencia/byEstudainte/${idEstudiante}`, { headers: headers });
  }


  cargarAsistencias (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/asistencia?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const asistencias = resp.data.map((asistencia:any) => new Asistencia(asistencia._id, asistencia.idDocente, asistencia.idHorario, asistencia.temaTratado
            ,asistencia.fecha,asistencia.ausentes,asistencia.presentes,asistencia.prueba)
        );
        
        return{
          total:resp.totalAsistencias,
          asistencias
        };
      })
    )
    
     
  }

}
