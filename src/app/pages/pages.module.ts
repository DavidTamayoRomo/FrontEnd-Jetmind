import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HttpClientModule} from '@angular/common/http';

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
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';
import { FacturarComponent } from './facturar/facturar.component';
import { FacturasComponent } from './facturar/facturas/facturas.component';
import { UploadsComponent } from './uploads/uploads.component';
import { ContratoFormComponent } from './contrato-form/contrato-form.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ProgramaComponent } from './programa/programa.component';
import { ContratosComponent } from './contrato/contratos/contratos.component';
import { ProgramasComponent } from './programa/programas/programas.component';
import { ContratosAsignarDirectorComponent } from './contratos-asignar-director/contratos-asignar-director.component';
import { CitasTelemarketingComponent } from './citas-telemarketing/citas-telemarketing.component';


import { FlatpickrModule } from 'angularx-flatpickr';
import { ListaCitasComponent } from './citas-telemarketing/lista-citas/lista-citas.component';
import { CalendarioComponent } from './calendario/calendario.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { VigenciaComponent } from './vigencia/vigencia.component';
import { VigenciasComponent } from './vigencia/vigencias/vigencias.component';
import { VerificacionComponent } from './verificacion/verificacion.component';
import { VerificacionesComponent } from './verificacion/verificaciones/verificaciones.component';
import { EnviarVerificacionComponent } from './verificacion/enviar-verificacion/enviar-verificacion.component';
import { HorarioComponent } from './horario/horario.component';
import { HorariosComponent } from './horario/horarios/horarios.component';
import { Peea17charlotteukComponent } from './peea17charlotteuk/peea17charlotteuk.component';
import { ListaComponent } from './peea17charlotteuk/lista/lista.component';
import { Peea18charlotteukComponent } from './peea18charlotteuk/peea18charlotteuk.component';
import { Listapeea18chukComponent } from './peea18charlotteuk/listapeea18chuk/listapeea18chuk.component';
import { Peea17ilvemComponent } from './peea17ilvem/peea17ilvem.component';
import { Listapeea17ilvemComponent } from './peea17ilvem/listapeea17ilvem/listapeea17ilvem.component';
import { Peea18ilvemComponent } from './peea18ilvem/peea18ilvem.component';
import { Listapeea18ilvemComponent } from './peea18ilvem/listapeea18ilvem/listapeea18ilvem.component';
import { Peea17tomatisComponent } from './peea17tomatis/peea17tomatis.component';
import { Listapeea17tomatisComponent } from './peea17tomatis/listapeea17tomatis/listapeea17tomatis.component';
import { Peea18tomatisComponent } from './peea18tomatis/peea18tomatis.component';
import { Listapeea18tomatisComponent } from './peea18tomatis/listapeea18tomatis/listapeea18tomatis.component';
import { AsignarHorariosEstudianteComponent } from './asignar-horarios-estudiante/asignar-horarios-estudiante.component';
import { ListaasignarComponent } from './asignar-horarios-estudiante/listaasignar/listaasignar.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ListaAsistenciaComponent } from './asistencia/lista-asistencia/lista-asistencia.component';




const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

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
    FacturarComponent,
    FacturasComponent,
    UploadsComponent,
    ContratoFormComponent,
    ProgramaComponent,
    ContratosComponent,
    ProgramasComponent,
    ContratosAsignarDirectorComponent,
    CitasTelemarketingComponent,
    ListaCitasComponent,
    CalendarioComponent,
    VigenciaComponent,
    VigenciasComponent,
    VerificacionComponent,
    VerificacionesComponent,
    EnviarVerificacionComponent,
    HorarioComponent,
    HorariosComponent,
    Peea17charlotteukComponent,
    ListaComponent,
    Peea18charlotteukComponent,
    Listapeea18chukComponent,
    Peea17ilvemComponent,
    Listapeea17ilvemComponent,
    Peea18ilvemComponent,
    Listapeea18ilvemComponent,
    Peea17tomatisComponent,
    Listapeea17tomatisComponent,
    Peea18tomatisComponent,
    Listapeea18tomatisComponent,
    AsignarHorariosEstudianteComponent,
    ListaasignarComponent,
    AsistenciaComponent,
    ListaAsistenciaComponent
    
  ],
  exports:[
    DashboardComponent,
    PagesComponent,
  ],
  imports: [
    NgxFileDropModule,
    NgxDropzoneModule,
    CommonModule,
    ShareModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    PipesModule,
    NgWizardModule.forRoot(ngWizardConfig),
    FlatpickrModule.forRoot(),  
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    
  ],
 
})
export class PagesModule { }
