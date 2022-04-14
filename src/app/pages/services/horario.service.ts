import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Horario } from '../horario/horario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get horario */
  getAllHorario(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/horario`, { headers: headers });
  }

  obtenerHorarioById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/horario/${id}`, { headers: headers })
  }

  obtenerHorarioByCiudadMarcaEstado(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/horario/ciudad-marca-estado`, formData, { headers: headers });
  }

  crearHorario(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/horario`, formData, { headers: headers });
  }

  updateHorario(id:string, horario:Horario){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/horario/${id}`, horario, { headers: headers });
  }

  eliminarHorario( horario:Horario){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/horario/${horario._id}`, { headers: headers });
  }


  cargarHorario (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/horario?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const horarios = resp.data.map((horario:any) => 
        new Horario(horario?._id, horario?.idCiudad, horario?.idMarca, horario?.nombre, horario?.dias, 
          horario?.modalidad, horario?.horaInicio, horario?.horaFin ));
      
        return{
          total:resp.totalHorario,
          horarios
        };
      })
    )
    
     
  }
}
