import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PersonaService } from '../pages/persona/persona.service';
import { RoleService } from '../pages/services/role.service';

@Injectable({
  providedIn: 'root'
})
export class AdminVentasRoleGuard implements CanActivate {
  constructor(
    private personaService: PersonaService,
    private roleService: RoleService,
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let nombreRole = localStorage.getItem('rl');
    console.log('LOCAL STORAGE', nombreRole);

    if (nombreRole == 'Admin_Ventas_role') {
      return true;
    } else {
      console.log('No tiene permisos');
      return false;
    }

    /* const respuesta:boolean = await of(
      this.roleService.obtenerRoleById(this.personaService.role).pipe(
        map(resp: any) => {
        console.log('Role guard ENTRE busqueda', resp);
        if (resp.data.nombre == 'Admin_Ventas_role') {
          console.log('Persona canactivate', resp.data.nombre);
          return true;
        } else {
          console.log('No tiene permisos');
          return false;
        }
        }
      )
    ).toPromise();
    return respuesta; */

    /* const respuesta:any =  this.roleService.obtenerRoleById(this.personaService.role).toPromise();
    console.log('Role guard ENTRE busqueda', respuesta);
    if (respuesta.__zone_symbol__value.data.nombre == 'Admin_Ventas_role') {
      return true;
    } else {
      console.log('No tiene permisos');
      return false;
    } */

  }

}
