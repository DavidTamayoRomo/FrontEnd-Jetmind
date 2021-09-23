import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ResgisterComponent } from './resgister/resgister.component';



@NgModule({
  declarations: [
    LoginComponent,
    ResgisterComponent,
  ],
  exports: [
    LoginComponent,
    ResgisterComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
