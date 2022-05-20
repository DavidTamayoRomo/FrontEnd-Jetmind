import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';
import { RouterModule } from '@angular/router';
import { GenerarPasswordComponent } from './password/generar-password/generar-password.component';
import { OlvidoPasswordComponent } from './password/olvido-password/olvido-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    ResgisterComponent,
    GenerarPasswordComponent,
    OlvidoPasswordComponent,
  ],
  exports: [
    LoginComponent,
    ResgisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
