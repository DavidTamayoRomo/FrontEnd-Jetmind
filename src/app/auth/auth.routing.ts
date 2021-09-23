import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';


const routes: Routes = [
    /**Rutas publicas */
    { path: 'login', component: LoginComponent },
    { path: 'register', component: ResgisterComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
