import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**Modulos */
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { EncuestaPadresComponent } from './publico/encuesta-padres/encuesta-padres.component';
import { Peea17charlotteukComponent } from './pages/peea17charlotteuk/peea17charlotteuk.component';
import { Peea18charlotteukComponent } from './pages/peea18charlotteuk/peea18charlotteuk.component';
import { Peea17ilvemComponent } from './pages/peea17ilvem/peea17ilvem.component';
import { Peea18ilvemComponent } from './pages/peea18ilvem/peea18ilvem.component';
import { Peea17tomatisComponent } from './pages/peea17tomatis/peea17tomatis.component';
import { Peea18tomatisComponent } from './pages/peea18tomatis/peea18tomatis.component';


const routes: Routes = [

  /** Rutas publicas
   * 
   */
  { path: 'encuestapadres', component: EncuestaPadresComponent},
  { path: 'peea-17-ch-uk/:id/:idContrato', component: Peea17charlotteukComponent , data:{titulo:'PEEA 17'} },
  { path: 'peea-18-ch-uk/:id/:idContrato', component: Peea18charlotteukComponent , data:{titulo:'PEEA 18'} },
  { path: 'peea-17-ilvem/:id/:idContrato', component: Peea17ilvemComponent , data:{titulo:'PEEA 17'} },
  { path: 'peea-18-ilvem/:id/:idContrato', component: Peea18ilvemComponent , data:{titulo:'PEEA 18'} },
  { path: 'peea-17-tomatis/:id/:idContrato', component: Peea17tomatisComponent , data:{titulo:'PEEA 17'} },
  { path: 'peea-18-tomatis/:id/:idContrato', component: Peea18tomatisComponent , data:{titulo:'PEEA 18'} },
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
