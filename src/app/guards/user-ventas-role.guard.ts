import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserVentasRoleGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let nombreRole = localStorage.getItem('rl');
    console.log('LOCAL STORAGE', nombreRole);

    if (nombreRole == 'User_Ventas_role') {
      console.log('LOCAL STORAGE true', nombreRole);
      return true;
    } else {
      console.log('LOCAL STORAGE false', nombreRole);
      this.router.navigateByUrl('/listacontratos-asesores');
      return false;
    }
  } 

}
