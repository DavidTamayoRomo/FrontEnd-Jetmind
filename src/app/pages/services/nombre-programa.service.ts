import { Injectable } from '@angular/core';


import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NombrePrograma } from '../nombre-programa/nombre-programa.model';
import { tap } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class NombreProgramaService {

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
  getAllnombrePrograma() {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/nombrePrograma`, { headers: headers });
  }

  obtenernombreProgramaById(id: string) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/nombrePrograma/${id}`, { headers: headers })
  }

  crearnombrePrograma(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/nombrePrograma`, formData, { headers: headers });
  }

  updatenombrePrograma(id: string, nombrePrograma: NombrePrograma) {
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/nombrePrograma/${id}`, nombrePrograma, { headers: headers });
  }

  eliminarnombrePrograma(nombrePrograma: NombrePrograma) {
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/nombrePrograma/${nombrePrograma._id}`, { headers: headers });
  }


  cargarnombrePrograma(skip: number = 0) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/nombrePrograma?skip=${skip}`, { headers: headers })
      .pipe(
        tap((resp: any) => {

          const nombreProgramas = resp.data.map((nombreProgramas: any) => new NombrePrograma(nombreProgramas._id, nombreProgramas.idCiudad, nombreProgramas.idMarca,
             nombreProgramas.nombre, nombreProgramas.estado, nombreProgramas.pdf, nombreProgramas.observaciones) )
          

          return{
            total:resp.totalnombreProgramas,
            nombreProgramas
          };
        })
      )
  }

}
