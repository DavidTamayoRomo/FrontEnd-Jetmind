import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { Persona } from '../../models/persona.model';
import { PersonaInterface } from '../../interfaces/persona.interface';



const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient, private router:Router) { }

  public persona:Persona = new Persona();

  retornarHeader(){
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  validarToken(): Observable<boolean> {
    const headers = this.retornarHeader();

    return this.http.get(`${base_url}/persona/renew`, { headers: headers }).pipe(
      tap((resp: any) => {
        this.persona = resp.meta.token;
        const {tipo,
          idMarca,
          idCiudad,
          idSucursal,
          nombresApellidos,
          email,
          password,
          cedula,
          telefono,
          telefonoDomicilio,
          fechaNacimiento,
          direccion,
          genero,
          estado,
          fotoPerfil,
          fotoCedula1,
          fotoCedula2,
          fechaIngresoEmpresa,
          numeroCuenta,
          addedUser,
          modifiedUser,
          _id} = resp.data;
  
          this.persona = new Persona(
            tipo,
            idMarca,
            idCiudad,
            idSucursal,
            nombresApellidos,
            email,
            password,
            cedula,
            telefono,
            telefonoDomicilio,
            fechaNacimiento,
            direccion,
            genero,
            estado,
            fotoPerfil,
            fotoCedula1,
            fotoCedula2,
            fechaIngresoEmpresa,
            numeroCuenta,
            addedUser,
            modifiedUser,
            _id
          );
        localStorage.setItem('token', resp.meta.token);
      }),
      map(resp => true),
      catchError(error => of(false))
    );

  }

  crearPersona(formData: any) {
    const headers = this.retornarHeader();
    return this.http.post(`${base_url}/persona`, formData, { headers: headers });
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

  cargarPersonas (skip: number = 0){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/persona?skip=${skip}`, { headers: headers })
    .pipe(
      tap( (resp:any) => {
        
        const personas = resp.data.map((user:any) => new Persona(user.tipo,user.idMarca, user.idCiudad, user.idSucursal, user.nombresApellidos, user.email, user.password, user.cedula, user.telefono, user.telefonoDomicilio, user.fechaNaciemiento, user.direccion
          , user.genero, user.estado, user.fotoPerfil, user.fotoCedula1, user.fotoCedula2, user.fechaIngresoEmpresa, user.numeroCuenta, user.addedUser, user.modifiedUser, user._id)
        );
        console.log(personas)
        return {
          total:resp.totalUsuarios,
          personas
        };
      })
    )
    
  }

  eliminarPersonas( persona:Persona){
    const headers = this.retornarHeader();
    console.log(persona._id);
    return this.http.delete(`${base_url}/persona/${persona._id}`, { headers: headers });
  }

  obtenerPersonaById(id:string){
    const headers = this.retornarHeader();
    return this.http.get(`${base_url}/persona/${id}`, { headers: headers })
  }

  updatePersona(id:string, persona:Persona){
    const headers = this.retornarHeader();
    return this.http.put(`${base_url}/persona/${id}`, persona, { headers: headers });
  }

}


