import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**Modulos */
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { EncuestaPadresComponent } from './publico/encuesta-padres/encuesta-padres.component';


const routes: Routes = [

  /** Rutas publicas
   * path: '/dashboard', PagesRouting
   */
  { path: 'encuestapadres', component: EncuestaPadresComponent},
  /** Rutas Protegidas
   * path: '/auth', AuthRouting
   */

  /**Redirecciones */
  { path: '**', component: NopagefoundComponent },
];

@NgModule({
  imports: 
  [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
