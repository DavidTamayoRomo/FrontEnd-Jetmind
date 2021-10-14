import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient, private router:Router) { }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${base_url}/persona/renew`, { headers: headers }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.meta.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );

  }

  crearPersona(formData: any) {
    return this.http.post(`${base_url}/persona`, formData);
  }

  loginPersona(formData: any) {
    return this.http.post(`${base_url}/persona/signin`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.meta.token);
        })
      );
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
