import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


import { catchError, map, tap } from 'rxjs/operators';
import { Campania } from '../campania/campania.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CampaniaService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Campanias */
  getAllCampanias(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/campania`, { headers: headers });
  }

  obtenercampaniaById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/campania/${id}`, { headers: headers })
  }

  crearcampania(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/campania`, formData, { headers: headers });
  }

  updatecampania(id:string, campania:Campania){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/campania/${id}`, campania, { headers: headers });
  }

  eliminarcampania( campania:Campania){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/campania/${campania._id}`, { headers: headers });
  }


  cargarCampanias (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/campania?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const campanias = resp.data.map((campania:any) => new Campania(campania._id, campania.nombre, campania.fecha_activacion, campania.fecha_finalizacion
          , campania.idMarca)
        );
        
        return{
          total:resp.totalCampanias,
          campanias
        };
      })
    )
    
     
  }
}
