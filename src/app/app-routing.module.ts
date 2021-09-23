import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ResgisterComponent } from './auth/resgister/resgister.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  /**Rutas protegidas */
  {
    path:'', 
    component:PagesComponent,
    children:[
      /**Rutas que necesitan autenticacion */
      {path:'dashboard', component:DashboardComponent},
      {path:'', redirectTo:'/dashboard', pathMatch:'full'},
    ]
  },
  
  /**Rutas publicas */
  {path:'login', component:LoginComponent},
  {path:'register', component:ResgisterComponent},

  /**Redirecciones */
  {path:'**', component: NopagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
