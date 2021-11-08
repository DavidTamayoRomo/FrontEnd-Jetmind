import { HttpClient } from '@angular/common/http';
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

  /** Get MArcas */
  getAllMarcas() {
    return this.http.get(`${base_url}/marca`);
  }


  obtenerMarcaById(id: string) {
    return this.http.get(`${base_url}/marca/${id}`)
  }

  crearMarca(formData: any) {
    return this.http.post(`${base_url}/marca`, formData);
  }

  updateMarca(id: string, marca: Marca) {
    return this.http.put(`${base_url}/marca/${id}`, marca);
  }

  eliminarMarca(marca: Marca) {
    return this.http.delete(`${base_url}/marca/${marca._id}`);
  }


  cargarMarcas(skip: number = 0) {
    return this.http.get(`${base_url}/marca?skip=${skip}`)
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
