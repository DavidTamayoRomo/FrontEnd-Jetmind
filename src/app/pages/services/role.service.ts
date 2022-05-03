import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }
   /** Get Role */
   getAllRole(){
    return this.http.get(`${base_url}/role`);
   }

   obtenerRoleById(id: any) {
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/role/${id}`, { headers: headers })
  }
}
