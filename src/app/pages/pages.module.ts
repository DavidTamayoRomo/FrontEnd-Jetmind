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
import { PerfilComponent } from './perfil/perfil.component';
import { ListaPersonasComponent } from './persona/lista-personas/lista-personas.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { CiudadesComponent } from './ciudad/ciudades/ciudades.component';




@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    RxjsComponent,
    PersonaComponent,
    CiudadComponent,
    SucursalComponent,
    MarcaComponent,
    PerfilComponent,
    ListaPersonasComponent,
    CiudadesComponent,
    
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
    HttpClientModule,
    ComponentsModule,
    PipesModule
  ],
  
})
export class PagesModule { }
