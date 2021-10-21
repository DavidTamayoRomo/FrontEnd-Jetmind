import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Persona } from 'src/app/models/persona.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  constructor(private http:HttpClient) { }

  private transformarUsuarios(resultados: any[]):Persona[]{
    return resultados.map((user:any) => new Persona(user.tipo,user.idMarca, user.idCiudad, user.idSucursal, user.nombresApellidos, user.email, user.password, user.cedula, user.telefono, user.telefonoDomicilio, user.fechaNaciemiento, user.direccion
      , user.genero, user.estado, user.fotoPerfil, user.fotoCedula1, user.fotoCedula2, user.fechaIngresoEmpresa, user.numeroCuenta, user.addedUser, user.modifiedUser));
  }

  buscar(tabla:string, busqueda:string){
    const url = `${base_url}/utils/busquedaespecifica/coleccion/${tabla}/${busqueda}`;
    return this.http.get(url).pipe(
      map( (resp:any) => {
        return resp.data;
        console.log(resp.data);
      })
    )
  }

}
