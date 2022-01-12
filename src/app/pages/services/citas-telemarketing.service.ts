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
    return this.http.get(`${base_url}/citastelemarketing`, { headers: headers });
  }

  obtenerCitasTelemarketingById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/citastelemarketing/${id}`, { headers: headers })
  }

  crearCitasTelemarketing(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/citastelemarketing`, formData, { headers: headers });
  }

  updateCitasTelemarketing(id:string, telemarketing:CitaTelemarketing){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/citastelemarketing/${id}`, telemarketing, { headers: headers });
  }

  eliminartelemarketing( telemarketing:CitaTelemarketing){
    const headers = this.retornarHeader();
    return this.http.delete(`${base_url}/citastelemarketing/${telemarketing._id}`, { headers: headers });
  }


  cargarCitasTelemarketing (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/citastelemarketing?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const citasTelemarketing = resp.data.map((telemarketing:any) => 
        new CitaTelemarketing(telemarketing._id, telemarketing.revisado, telemarketing.fecha, 
          telemarketing.idMarca, telemarketing.estado, telemarketing.nombreApellidoRepresentante , telemarketing.telefono
          , telemarketing.ciudad , telemarketing.actividadEconomica , telemarketing.estudiante , telemarketing.observaciones  
          , telemarketing.tarjeraCredito , telemarketing.tarjeta , telemarketing.forma, telemarketing.idSucursal 
          , telemarketing.zoom, telemarketing.terreno ,telemarketing.fechaCita , telemarketing.email
          , telemarketing.asignado, telemarketing.codigoLead , telemarketing.observacionesAsesor, telemarketing.addedUser )
        );
        
        return{
          total:resp.totalCitasTelemarketing,
          citasTelemarketing
        };
      })
    )
    
     
  }


}
