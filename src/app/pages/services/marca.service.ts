import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Marca } from '../marca/marca.model';
import { catchError, map, tap } from 'rxjs/operators';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get MArcas */
  getAllMarcas() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/marca`, { headers: headers });
  }


  obtenerMarcaById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/marca/${id}`, { headers: headers })
  }

  crearMarca(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/marca`, formData, { headers: headers });
  }

  updateMarca(id: string, marca: Marca) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/marca/${id}`, marca, { headers: headers });
  }

  eliminarMarca(marca: Marca) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/marca/${marca._id}`, { headers: headers });
  }


  cargarMarcas(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/marca?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const marcas = resp.data.map((marca: any) => new Marca(marca._id, marca.nombre, marca.logo)
          );

          return{
            total:resp.totalMarcas,
            marcas
          };
        })
      )


  }
}
