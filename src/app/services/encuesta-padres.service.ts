import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EncuestaPadres } from '../publico/encuesta-padres/encuesta-padres.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EncuestaPadresService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get Encuestas */
  getAllEncuestas(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/encuestapadres`, { headers: headers });
  }

  obtenerencuestaById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/encuestapadres/${id}`, { headers: headers })
  }

  crearencuesta(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/encuestapadres`, formData, { headers: headers });
  }

  
  
  allCiudadSucursalMarca( ciudad:any, sucursal:any, marca:any){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/encuestapadres/busqueda/${ciudad}/${sucursal}/${marca}`, { headers: headers });
  }


  cargarEncuestas (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/encuestapadres?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const encuestas = resp.data.map((encuesta:any) => new EncuestaPadres(encuesta._id, encuesta.idEstudiante, encuesta.idCiudad, encuesta.idMarca
            ,encuesta.idDocente,encuesta.pregunta1,encuesta.pregunta2,encuesta.pregunta3,encuesta.pregunta4,encuesta.pregunta5,encuesta.pregunta6,encuesta.pregunta7)
        );
        
        return{
          total:resp.totalEncuestas,
          encuestas
        };
      })
    )
    
     
  }
}
