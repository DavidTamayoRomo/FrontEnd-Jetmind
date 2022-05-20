import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { GenerarPasswordComponent } from './password/generar-password/generar-password.component';
import { OlvidoPasswordComponent } from './password/olvido-password/olvido-password.component';


const routes: Routes = [
    /**Rutas publicas */
    { path: 'login', component: LoginComponent },
    { path: 'register', component: ResgisterComponent },
    { path: 'password/:id', component: GenerarPasswordComponent },
    { path: 'password-recuperar', component: OlvidoPasswordComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
