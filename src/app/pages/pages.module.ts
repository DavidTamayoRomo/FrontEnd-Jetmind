import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http'

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ShareModule } from '../share/share.module';
import { AppRoutingModule } from '../app-routing.module';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PersonaComponent } from './persona/persona.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CiudadComponent } from './ciudad/ciudad.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { MarcaComponent } from './marca/marca.component';




@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    RxjsComponent,
    PersonaComponent,
    CiudadComponent,
    SucursalComponent,
    MarcaComponent,
  ],
  exports:[
    DashboardComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  
})
export class PagesModule { }
