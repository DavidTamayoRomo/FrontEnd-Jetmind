import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { EntregaLibros } from '../entrega-libros/entrega-libros.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EntregaLibrosService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get EntregaLibros */
  getAllEntregaLibros(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entregalibro`, { headers: headers });
  }

  obtenerentregalibroById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entregalibro/${id}`, { headers: headers })
  }

  crearentregalibro(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/entregalibro`, formData, { headers: headers });
  }

  updateentregalibro(id:string, entregalibro:EntregaLibros){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/entregalibro/${id}`, entregalibro, { headers: headers });
  }

  eliminarentregalibro( entregalibro:EntregaLibros){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/entregalibro/${entregalibro._id}`, { headers: headers });
  }


  cargarEntregaLibros (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/entregalibro?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {  
        const entregaLibros = resp.data.map((entregalibro:any) => 
          new EntregaLibros(entregalibro._id, entregalibro.idDocente, entregalibro.idEstudiante, entregalibro.fechaEntrega)
        );
        return{
          total:resp.totalEntregaLibros,
          entregaLibros
        };
      })
    ) 
  }
}
