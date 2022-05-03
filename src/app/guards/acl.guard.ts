import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ACLServiceService } from '../acl/aclservice.service';

@Injectable({
  providedIn: 'root'
})
export class AclGuard implements CanActivate {
  constructor(
    private aclService: ACLServiceService,
    private router: Router, 
    private route: ActivatedRoute,
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean {

    const routeName = next.routeConfig.path;
    console.log('routeName', routeName);

    //params devuelve si es nuevo o el id para editar
    const params = next.params;
    
    console.log('Route Length: ', routeName.length);
    console.log('Respuesta servicio acl: ', this.aclService.can(routeName));

    if ( routeName.length === 0 || !this.aclService.can(routeName)) {

      // this.router.navigate(['/dashboard'], { queryParams: { returnUrl: state.url } });
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }


}
