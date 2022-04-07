import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { AgendaEntregaInformes } from '../agenda-entrega-informes/agenda-entrega-informes.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AgendaEntregaInformesService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Agendas */
  getAllAgendas(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/agenda`, { headers: headers });
  }

  obteneragendaById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/agenda/${id}`, { headers: headers })
  }

  crearagenda(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/agenda`, formData, { headers: headers });
  }

  updateagenda(id:string, agenda:AgendaEntregaInformes){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/agenda/${id}`, agenda, { headers: headers });
  }

  eliminaragenda( agenda:AgendaEntregaInformes){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/agenda/${agenda._id}`, { headers: headers });
  }
  
  allCiudadSucursalMarca( ciudad:any, sucursal:any, marca:any){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/agenda/busqueda/${ciudad}/${sucursal}/${marca}`, { headers: headers });
  }


  cargarAgendas (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/agenda?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const agendas = resp.data.map((agenda:any) => new AgendaEntregaInformes(agenda._id, agenda.fechaInicio, agenda.fechaFin, agenda.idEstudiantes
            ,agenda.idDocente)
        );
        
        return{
          total:resp.totalAgendas,
          agendas
        };
      })
    )
    
     
  }

}
