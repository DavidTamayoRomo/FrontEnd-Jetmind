import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CitaTelemarketing } from '../citas-telemarketing/citaTelemarketing.model';
import { tap, map } from 'rxjs/operators';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CitasTelemarketingService {

  constructor(private http:HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  /** Get CitasTelemarketing */
  getAllCitasTelemarketing(){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/telemarketing`, { headers: headers });
  }

  obtenerCitasTelemarketingById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/telemarketing/${id}`, { headers: headers })
  }

  crearCitasTelemarketing(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/telemarketing`, formData, { headers: headers });
  }

  updateCitasTelemarketing(id:string, telemarketing:CitaTelemarketing){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/telemarketing/${id}`, telemarketing, { headers: headers });
  }

  eliminartelemarketing( telemarketing:CitaTelemarketing){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/telemarketing/${telemarketing._id}`, { headers: headers });
  }


  cargarCitasTelemarketing (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/telemarketing?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const citasTelemarketing = resp.data.map((telemarketing:any) => 
        new CitaTelemarketing(telemarketing._id, telemarketing.revisado, telemarketing.fecha, 
          telemarketing.idPrograma, telemarketing.estado, telemarketing.nombreApellidoRepresentante , telemarketing.telefono
          , telemarketing.ciudad , telemarketing.actividadEconomica , telemarketing.estudiante , telemarketing.observaciones  
          , telemarketing.tarjeraCredito , telemarketing.tarjeta , telemarketing.forma , telemarketing.fechaCita
          , telemarketing.asignado , telemarketing.observacionesAsesor  )
        );
        
        return{
          total:resp.totalCitasTelemarketing,
          citasTelemarketing
        };
      })
    )
    
     
  }


}
