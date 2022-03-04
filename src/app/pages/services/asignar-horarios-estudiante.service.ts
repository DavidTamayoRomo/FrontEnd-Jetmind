import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsignarHorarioEstudiante } from '../asignar-horarios-estudiante/asignar-horarios-estudiante.model';
import { tap, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AsignarHorariosEstudianteService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get asignarHorariosEstudiantes */
  getAllAsignarHorariosEstudiantes(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/asignarhorarioestudiante`, { headers: headers });
  }
  
  getAllByDocenteHorario(idDocente:any, idHorario:any){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/asignarhorarioestudiante/buscar/${idDocente}/${idHorario}`, { headers: headers });
  }

  obtenerasignarhorarioestudianteById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/asignarhorarioestudiante/${id}`, { headers: headers })
  }

  crearasignarhorarioestudiante(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/asignarhorarioestudiante`, formData, { headers: headers });
  }

  updateasignarhorarioestudiante(id:string, asignarhorarioestudiante:AsignarHorarioEstudiante){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/asignarhorarioestudiante/${id}`, asignarhorarioestudiante, { headers: headers });
  }

  eliminarasignarhorarioestudiante( asignarhorarioestudiante:AsignarHorarioEstudiante){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/asignarhorarioestudiante/${asignarhorarioestudiante._id}`, { headers: headers });
  }


  cargarAsignarHorariosEstudiantes (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/asignarhorarioestudiante?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const asignarHorariosEstudiantes = resp.data.map((asignarhorarioestudiante:any) => 
        new AsignarHorarioEstudiante(asignarhorarioestudiante._id, asignarhorarioestudiante.idDocente, 
          asignarhorarioestudiante.idHorario, asignarhorarioestudiante.idEstudiantes, asignarhorarioestudiante.estado)
        );
        
        return{
          total:resp.totalasignarHorariosEstudiantes,
          asignarHorariosEstudiantes
        };
      })
    )
    
     
  }
}
