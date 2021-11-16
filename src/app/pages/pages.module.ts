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
import { MarcasComponent } from './marca/marcas/marcas.component';
import { SucursalesComponent } from './sucursal/sucursales/sucursales.component';
import { RepresentanteComponent } from './representante/representante.component';
import { RepresentantesComponent } from './representante/representantes/representantes.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudiantesComponent } from './estudiante/estudiantes/estudiantes.component';
import { NombreProgramaComponent } from './nombre-programa/nombre-programa.component';
import { NombreProgramasComponent } from './nombrePrograma/nombre-programas/nombre-programas.component';
import { ContratoComponent } from './contrato/contrato.component';





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
    MarcasComponent,
    SucursalesComponent,
    RepresentanteComponent,
    RepresentantesComponent,
    EstudianteComponent,
    EstudiantesComponent,
    NombreProgramaComponent,
    NombreProgramasComponent,
    ContratoComponent,
    
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
