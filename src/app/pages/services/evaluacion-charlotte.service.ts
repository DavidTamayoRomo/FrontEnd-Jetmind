import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { catchError, map, tap } from 'rxjs/operators';
import { EvaluacionCharlotte } from '../evaluacion-charlotte/evaluacion-charlotte.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EvaluacionCharlotteService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get evaluacioncharlotte */
  getAllevaluacioncharlotte(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/evaluacion-charlotte`, { headers: headers });
  }

  obtenerevaluacioncharlotteById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/evaluacion-charlotte/${id}`, { headers: headers })
  }

  crearevaluacioncharlotte(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/evaluacion-charlotte`, formData, { headers: headers });
  }

  updateevaluacioncharlotte(id:string, evaluacioncharlotte:EvaluacionCharlotte){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/evaluacion-charlotte/${id}`, evaluacioncharlotte, { headers: headers });
  }

  eliminarevaluacioncharlotte( evaluacioncharlotte:EvaluacionCharlotte){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/evaluacion-charlotte/${evaluacioncharlotte._id}`, { headers: headers });
  }


  cargarevaluacioncharlotte (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/evaluacion-charlotte?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const evaluacioncharlotte = resp.data.map((evaluacioncharlotte:any) => 
        new EvaluacionCharlotte(evaluacioncharlotte._id, evaluacioncharlotte.idDocente, evaluacioncharlotte.idHorario, evaluacioncharlotte.idEstudiante
          , evaluacioncharlotte.plataforma)
        );
        
        return{
          total:resp.totalevaluacioncharlotte,
          evaluacioncharlotte
        };
      })
    )
    
     
  }
}
