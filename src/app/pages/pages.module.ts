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
import { EntrevistaInicialCHUKComponent } from './entrevista-inicial-chuk/entrevista-inicial-chuk.component';
import { ListaEntrevistaCHUKComponent } from './entrevista-inicial-chuk/lista-entrevista-chuk/lista-entrevista-chuk.component';
import { EntrevistaInicialILComponent } from './entrevista-inicial-il/entrevista-inicial-il.component';
import { ListaEntrevistaILComponent } from './entrevista-inicial-il/lista-entrevista-il/lista-entrevista-il.component';
import { CambioHorarioComponent } from './cambio-horario/cambio-horario.component';
import { RetirarEstudianteComponent } from './cambio-horario/retirar-estudiante/retirar-estudiante.component';
import { AgregarEstudianteComponent } from './cambio-horario/agregar-estudiante/agregar-estudiante.component';
import { CambiarEstudianteComponent } from './cambio-horario/cambiar-estudiante/cambiar-estudiante.component';
import { AgendaEntregaInformesComponent } from './agenda-entrega-informes/agenda-entrega-informes.component';
import { ListaAgendaComponent } from './agenda-entrega-informes/lista-agenda/lista-agenda.component';
import { CampaniaComponent } from './campania/campania.component';
import { ListaCampaniaComponent } from './campania/lista-campania/lista-campania.component';
import { RegistroLlamadasComponent } from './registro-llamadas/registro-llamadas.component';
import { ListaRegistroLlamadasComponent } from './registro-llamadas/lista-registro-llamadas/lista-registro-llamadas.component';
import { EntregaLibrosComponent } from './entrega-libros/entrega-libros.component';
import { ListaEntregaLibrosComponent } from './entrega-libros/lista-entrega-libros/lista-entrega-libros.component';
import { PlataformaCharlotteComponent } from './plataforma-charlotte/plataforma-charlotte.component';
import { ListaPlataformaCharlotteComponent } from './plataforma-charlotte/lista-plataforma-charlotte/lista-plataforma-charlotte.component';
import { EvaluacionCharlotteComponent } from './evaluacion-charlotte/evaluacion-charlotte.component';
import { PlataformaIlvemComponent } from './plataforma-ilvem/plataforma-ilvem.component';
import { ListaPlataformaIlvemComponent } from './plataforma-ilvem/lista-plataforma-ilvem/lista-plataforma-ilvem.component';
import { ControlCalidadTelemarketingComponent } from './control-calidad-telemarketing/control-calidad-telemarketing.component';
import { ListaControlCalidadTelemarketingComponent } from './control-calidad-telemarketing/lista-control-calidad-telemarketing/lista-control-calidad-telemarketing.component';
import { ReportePeea18ilvemComponent } from './peea18ilvem/reporte-peea18ilvem/reporte-peea18ilvem.component';
import { ReportePeea17charlotteComponent } from './peea17charlotteuk/reporte-peea17charlotte/reporte-peea17charlotte.component';
import { ReportePeea18charlotteComponent } from './peea18charlotteuk/reporte-peea18charlotte/reporte-peea18charlotte.component';
import { ReportePeea17tomatisComponent } from './peea17tomatis/reporte-peea17tomatis/reporte-peea17tomatis.component';
import { ReportePeea18tomatisComponent } from './peea18tomatis/reporte-peea18tomatis/reporte-peea18tomatis.component';
import { ReproteEntrevistaInicialChukComponent } from './entrevista-inicial-chuk/reprote-entrevista-inicial-chuk/reprote-entrevista-inicial-chuk.component';
import { AngularEmojisModule } from 'angular-emojis';




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
    ListaAsistenciaComponent,
    EntrevistaInicialCHUKComponent,
    ListaEntrevistaCHUKComponent,
    EntrevistaInicialILComponent,
    ListaEntrevistaILComponent,
    CambioHorarioComponent,
    RetirarEstudianteComponent,
    AgregarEstudianteComponent,
    CambiarEstudianteComponent,
    AgendaEntregaInformesComponent,
    ListaAgendaComponent,
    CampaniaComponent,
    ListaCampaniaComponent,
    RegistroLlamadasComponent,
    ListaRegistroLlamadasComponent,
    EntregaLibrosComponent,
    ListaEntregaLibrosComponent,
    PlataformaCharlotteComponent,
    ListaPlataformaCharlotteComponent,
    EvaluacionCharlotteComponent,
    PlataformaIlvemComponent,
    ListaPlataformaIlvemComponent,
    ControlCalidadTelemarketingComponent,
    ListaControlCalidadTelemarketingComponent,
    ReportePeea18ilvemComponent,
    ReportePeea17charlotteComponent,
    ReportePeea18charlotteComponent,
    ReportePeea17tomatisComponent,
    ReportePeea18tomatisComponent,
    ReproteEntrevistaInicialChukComponent
    
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
    AngularEmojisModule,
    
  ],
 
})
export class PagesModule { }
