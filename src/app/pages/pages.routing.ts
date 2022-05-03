import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PersonaComponent } from './persona/persona.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ListaPersonasComponent } from './persona/lista-personas/lista-personas.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { CiudadesComponent } from './ciudad/ciudades/ciudades.component';
import { MarcaComponent } from './marca/marca.component';
import { MarcasComponent } from './marca/marcas/marcas.component';
import { SucursalComponent } from './sucursal/sucursal.component';
import { SucursalesComponent } from './sucursal/sucursales/sucursales.component';
import { RepresentanteComponent } from './representante/representante.component';
import { RepresentantesComponent } from './representante/representantes/representantes.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudiantesComponent } from './estudiante/estudiantes/estudiantes.component';
import { NombreProgramaComponent } from './nombre-programa/nombre-programa.component';
import { NombreProgramasComponent } from './nombrePrograma/nombre-programas/nombre-programas.component';
import { ContratoComponent } from './contrato/contrato.component';
import { FacturarComponent } from './facturar/facturar.component';
import { FacturasComponent } from './facturar/facturas/facturas.component';
import { ContratoFormComponent } from './contrato-form/contrato-form.component';
import { ProgramaComponent } from './programa/programa.component';
import { ContratosComponent } from './contrato/contratos/contratos.component';
import { ProgramasComponent } from './programa/programas/programas.component';
import { ContratosAsignarDirectorComponent } from './contratos-asignar-director/contratos-asignar-director.component';
import { CitasTelemarketingComponent } from './citas-telemarketing/citas-telemarketing.component';
import { ListaCitasComponent } from './citas-telemarketing/lista-citas/lista-citas.component';
import { CalendarioComponent } from './calendario/calendario.component';
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
import { AgregarEstudianteComponent } from './cambio-horario/agregar-estudiante/agregar-estudiante.component';
import { CambiarEstudianteComponent } from './cambio-horario/cambiar-estudiante/cambiar-estudiante.component';
import { AgendaEntregaInformesComponent } from './agenda-entrega-informes/agenda-entrega-informes.component';
import { CampaniaComponent } from './campania/campania.component';
import { ListaCampaniaComponent } from './campania/lista-campania/lista-campania.component';
import { RegistroLlamadasComponent } from './registro-llamadas/registro-llamadas.component';
import { ListaRegistroLlamadasComponent } from './registro-llamadas/lista-registro-llamadas/lista-registro-llamadas.component';
import { EntregaLibrosComponent } from './entrega-libros/entrega-libros.component';
import { ListaEntregaLibrosComponent } from './entrega-libros/lista-entrega-libros/lista-entrega-libros.component';
import { PlataformaCharlotteComponent } from './plataforma-charlotte/plataforma-charlotte.component';
import { ListaPlataformaCharlotteComponent } from './plataforma-charlotte/lista-plataforma-charlotte/lista-plataforma-charlotte.component';
import { PlataformaIlvemComponent } from './plataforma-ilvem/plataforma-ilvem.component';
import { ListaPlataformaIlvemComponent } from './plataforma-ilvem/lista-plataforma-ilvem/lista-plataforma-ilvem.component';
import { EvaluacionCharlotteComponent } from './evaluacion-charlotte/evaluacion-charlotte.component';
import { ControlCalidadTelemarketingComponent } from './control-calidad-telemarketing/control-calidad-telemarketing.component';
import { ListaControlCalidadTelemarketingComponent } from './control-calidad-telemarketing/lista-control-calidad-telemarketing/lista-control-calidad-telemarketing.component';
import { ReportePeea17ilvemComponent } from './peea17ilvem/reporte-peea17ilvem/reporte-peea17ilvem.component';
import { ReportePeea18ilvemComponent } from './peea18ilvem/reporte-peea18ilvem/reporte-peea18ilvem.component';
import { ReportePeea17charlotteComponent } from './peea17charlotteuk/reporte-peea17charlotte/reporte-peea17charlotte.component';
import { ReportePeea18charlotteComponent } from './peea18charlotteuk/reporte-peea18charlotte/reporte-peea18charlotte.component';
import { ReportePeea17tomatisComponent } from './peea17tomatis/reporte-peea17tomatis/reporte-peea17tomatis.component';
import { ReportePeea18tomatisComponent } from './peea18tomatis/reporte-peea18tomatis/reporte-peea18tomatis.component';
import { ReproteEntrevistaInicialChukComponent } from './entrevista-inicial-chuk/reprote-entrevista-inicial-chuk/reprote-entrevista-inicial-chuk.component';
import { ReporteContratoComponent } from './contrato-form/reporte-contrato/reporte-contrato.component';
import { ReporteEntrevistaInicialIlComponent } from './entrevista-inicial-il/reporte-entrevista-inicial-il/reporte-entrevista-inicial-il.component';
import { ReporteCitasTelemarketingComponent } from './citas-telemarketing/reporte-citas-telemarketing/reporte-citas-telemarketing.component';
import { ReporteVentasContratoComponent } from './contrato/reporte-ventas-contrato/reporte-ventas-contrato.component';
import { EntrevistaInicialTmComponent } from './entrevista-inicial-tm/entrevista-inicial-tm.component';
import { ListaEntrevistaTmComponent } from './entrevista-inicial-tm/lista-entrevista-tm/lista-entrevista-tm.component';
import { ReporteEntrevistaTmComponent } from './entrevista-inicial-tm/reporte-entrevista-tm/reporte-entrevista-tm.component';
import { ReporteAsistenciaComponent } from './estudiante/reporte-asistencia/reporte-asistencia.component';
import { DocenteReporteComponent } from './persona/docente/docente-reporte/docente-reporte.component';
import { AsistenciaTomatisComponent } from './asistencia/asistencia-tomatis/asistencia-tomatis.component';
import { AsistenciaRecuperacionComponent } from './asistencia/asistencia-recuperacion/asistencia-recuperacion.component';
import { ReporteComponent } from './verificacion/reporte/reporte.component';
import { ReporteEstudiantesComponent } from './estudiante/reporte-estudiantes/reporte-estudiantes.component';
import { ListaEncuestaPadresComponent } from '../publico/encuesta-padres/lista-encuesta-padres/lista-encuesta-padres.component';
import { EstadoEstudianteComponent } from './estudiante/estado-estudiante/estado-estudiante.component';
import { VistaAsesorComponent } from './contrato/vista-asesor/vista-asesor.component';
import { ReporteTomaAsistenciaComponent } from './asistencia/reporte-toma-asistencia/reporte-toma-asistencia.component';
import { AdminVentasRoleGuard } from '../guards/admin-ventas-role.guard';
import { UserVentasRoleGuard } from '../guards/user-ventas-role.guard';
import { AclGuard } from '../guards/acl.guard';




const routes: Routes = [
    /**Rutas protegidas */
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            /**Rutas que necesitan autenticacion */
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Home' } },
            // Rutas persona 
            //{ path: 'persona', component: PersonaComponent, data:{titulo:'Persona'} },

            /**Personas */
            { path: 'persona/:id', component: PersonaComponent, data: { titulo: 'Actualizar Persona' } },
            { path: 'listapersonas', component: ListaPersonasComponent, data: { titulo: 'Lista Personas' } },
            { path: 'reporte-docente-horarios', component: DocenteReporteComponent, data: { titulo: 'Reporte de docentes horarios' } },

            /**Ciudad */
            { path: 'ciudad/:id', component: CiudadComponent, data: { titulo: 'Ciudad' } },
            { path: 'listaciudades', component: CiudadesComponent, data: { titulo: 'Lista de ciudades' } },

            /**Marca */
            { path: 'marca/:id', component: MarcaComponent, data: { titulo: 'Marca' } },
            { path: 'listamarcas', component: MarcasComponent, data: { titulo: 'Lista de marcas' } },

            /**Sucursal */
            { path: 'sucursal/:id', component: SucursalComponent, data: { titulo: 'Sucursal' } },
            { path: 'listasucursales', component: SucursalesComponent, data: { titulo: 'Lista de sucursales' } },

            /**Representantes */
            { path: 'representante/:id', canActivate: [AclGuard], component: RepresentanteComponent, data: { titulo: 'Representante' } },
            { path: 'listarepresentantes', canActivate: [AclGuard], component: RepresentantesComponent, data: { titulo: 'Lista de representantes' } },

            /** Estudiantes */
            { path: 'estudiante/:id', component: EstudianteComponent, data: { titulo: 'Estudiante' } },
            { path: 'listaestudiantes', component: EstudiantesComponent, data: { titulo: 'Lista de estudiantes' } },
            { path: 'estado-estudiante', component: EstadoEstudianteComponent, data: { titulo: 'Cambiar estado del estudiantes' } },
            { path: 'reporte-asistencia-estudiante/:id', component: ReporteAsistenciaComponent, data: { titulo: 'Asistencia del estudiantes' } },
            { path: 'reporte-estudiantes', component: ReporteEstudiantesComponent, data: { titulo: 'Reporte de Estudiantes' } },


            /**Contratos */
            { path: 'contrato/:id', component: ContratoComponent, canActivate: [AclGuard], data: { titulo: 'Contrato' } },
            { path: 'listacontratos', component: ContratosComponent, canActivate: [AclGuard], data: { titulo: 'Lista de los contratos' } },
            { path: 'listacontratos-asesores', component: VistaAsesorComponent, canActivate: [AclGuard], data: { titulo: 'Lista de los contratos' } },
            { path: 'reporte-contrato/:id', component: ReporteContratoComponent, canActivate: [AclGuard], data: { titulo: 'contratos' } },
            { path: 'reporte-venta-contrato', component: ReporteVentasContratoComponent, canActivate: [AclGuard], data: { titulo: 'Reporte ventas' } },

            { path: 'contrato1/:id', component: ContratoFormComponent, data: { titulo: 'Contrato' } },
            //{ path: 'listacontratos', component: , data:{titulo:'Lista de contratos'} },

            /**Factura */
            { path: 'facturar/:id', component: FacturarComponent, data: { titulo: 'Facturar' } },
            { path: 'listafacturar', component: FacturasComponent, data: { titulo: 'Lista de las facturas' } },

            /**Nombre programa */
            { path: 'nombrePrograma/:id', component: NombreProgramaComponent, data: { titulo: 'Nombre Programa' } },
            { path: 'listanombreprogramas', component: NombreProgramasComponent, data: { titulo: 'Lista de los programas' } },

            /**Programa */
            { path: 'programa/:id', component: ProgramaComponent, data: { titulo: 'Programa' } },
            { path: 'listaprogramas', component: ProgramasComponent, data: { titulo: 'Lista de los programas' } },

            /**Home */
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

            /**Academico */
            { path: 'asignardirector', component: ContratosAsignarDirectorComponent, data: { titulo: 'Lista para asignar contratos a director' } },


            /**Telemarketing */
            { path: 'citasTelemarketing/:id', component: CitasTelemarketingComponent, data: { titulo: 'Crear Citas Telemarketing' } },
            { path: 'listacitas', component: ListaCitasComponent, data: { titulo: 'Lista Citas Telemarketing' } },
            { path: 'citasTelemarketing-reporte', component: ReporteCitasTelemarketingComponent, data: { titulo: 'Lista Citas Telemarketing' } },
            { path: 'control-calidad-telemarketing/:id/:idCita', component: ControlCalidadTelemarketingComponent, data: { titulo: 'Control de calidad Citas Telemarketing' } },
            { path: 'lista-control-calidad-telemarketing', component: ListaControlCalidadTelemarketingComponent, data: { titulo: 'Lista Control de calidad Citas Telemarketing' } },
            { path: 'calendario', component: CalendarioComponent, data: { titulo: 'Calendario' } },

            /**Vigencia */
            { path: 'vigencia/:id', component: VigenciaComponent, data: { titulo: 'Vigencia' } },
            { path: 'listavigencias', component: VigenciasComponent, data: { titulo: 'Lista de vigencias' } },

            /**Verificacion */
            { path: 'verificacion/:id', component: VerificacionComponent, data: { titulo: 'Verificacion' } },
            { path: 'listaverificacion', component: VerificacionesComponent, data: { titulo: 'Lista de verificacion' } },
            { path: 'aceptacionverificacion/:id', component: EnviarVerificacionComponent, data: { titulo: 'Aceptar verificacion' } },
            { path: 'reporteVerificacion', component: ReporteComponent, data: { titulo: 'Reporte Verificacion' } },

            /**Horario */
            { path: 'horario/:id', component: HorarioComponent, data: { titulo: 'Horario' } },
            { path: 'listahorarios', component: HorariosComponent, data: { titulo: 'Lista de Horarios' } },

            /**PEAA */
            //{ path: 'peea-17-ch-uk/:id/:idContrato', component: Peea17charlotteukComponent , data:{titulo:'PEEA 17'} },
            { path: 'listapeea-17-ch-uk', component: ListaComponent, data: { titulo: 'Lista de PEEA 17' } },
            { path: 'reporte-peea-17-ch-uk/:id', component: ReportePeea17charlotteComponent, data: { titulo: 'Lista de PEEA 17' } },

            //{ path: 'peea-18-ch-uk/:id/:idContrato', component: Peea18charlotteukComponent , data:{titulo:'PEEA 18'} },
            { path: 'listapeea-18-ch-uk', component: Listapeea18chukComponent, data: { titulo: 'Lista de PEEA 18' } },
            { path: 'reporte-peea-18-ch-uk/:id', component: ReportePeea18charlotteComponent, data: { titulo: 'Lista de PEEA 18' } },

            //{ path: 'peea-17-ilvem/:id/:idContrato', component: Peea17ilvemComponent , data:{titulo:'PEEA 17'} },
            { path: 'lista-peea-17-ilvem', component: Listapeea17ilvemComponent, data: { titulo: 'Lista de PEEA 17' } },
            { path: 'reporte-peea-17-ilvem/:id', component: ReportePeea17ilvemComponent, data: { titulo: 'Reporte Lista de PEEA 17' } },

            //{ path: 'peea-18-ilvem/:id/:idContrato', component: Peea18ilvemComponent , data:{titulo:'PEEA 18'} },
            { path: 'lista-peea-18-ilvem', component: Listapeea18ilvemComponent, data: { titulo: 'Lista de PEEA 18' } },
            { path: 'reporte-peea-18-ilvem/:id', component: ReportePeea18ilvemComponent, data: { titulo: 'Reporte de PEEA 18' } },

            //{ path: 'peea-17-tomatis/:id/:idContrato', component: Peea17tomatisComponent , data:{titulo:'PEEA 17'} },
            { path: 'lista-peea-17-tomatis', component: Listapeea17tomatisComponent, data: { titulo: 'Lista de PEEA 17' } },
            { path: 'reporte-peea-17-toamtis/:id', component: ReportePeea17tomatisComponent, data: { titulo: 'Reporte de PEEA 17' } },

            //{ path: 'peea-18-tomatis/:id/:idContrato', component: Peea18tomatisComponent , data:{titulo:'PEEA 18'} },
            { path: 'lista-peea-18-tomatis', component: Listapeea18tomatisComponent, data: { titulo: 'Lista de PEEA 18' } },
            { path: 'reporte-peea-18-toamtis/:id', component: ReportePeea18tomatisComponent, data: { titulo: 'Reporte de PEEA 18' } },


            /**Asignar Horario */
            { path: 'asignarhorarioestudiante/:id', component: AsignarHorariosEstudianteComponent, data: { titulo: 'Asignar Horario Estudiante' } },
            { path: 'asignarhorariosestudiantes', component: ListaasignarComponent, data: { titulo: 'Lista de Asignar Horario Estudiante' } },

            /**Asistencia */
            { path: 'asistencia/:id', component: AsistenciaComponent, data: { titulo: 'Asistencia' } },
            { path: 'asistencia-tomatis/:id', component: AsistenciaTomatisComponent, data: { titulo: 'Asistencia' } },
            { path: 'asistencia-recuperacion/:id', component: AsistenciaRecuperacionComponent, data: { titulo: 'Asistencia Recuperacion' } },
            { path: 'asistencias', component: ListaAsistenciaComponent, data: { titulo: 'Lista Asistencia' } },
            { path: 'reporte-asistencia-docente', component: ReporteTomaAsistenciaComponent, data: { titulo: 'Reporte Asistencia' } },


            /**Entrevista inicial */
            { path: 'entrevistainicialchuk/:id/:idContrato', component: EntrevistaInicialCHUKComponent, data: { titulo: 'Entrvista Inicial CH UK' } },
            { path: 'listaentrevistainicialchuk', component: ListaEntrevistaCHUKComponent, data: { titulo: 'Lista de entrevista incial' } },
            { path: 'reporte-entrevistainicialchuk/:id', component: ReproteEntrevistaInicialChukComponent, data: { titulo: 'Entrevista' } },

            { path: 'entrevistainicialil/:id/:idContrato', component: EntrevistaInicialILComponent, data: { titulo: 'Entrvista Inicial IL' } },
            { path: 'listaentrevistainicialil', component: ListaEntrevistaILComponent, data: { titulo: 'Lista de entrevista incial' } },
            { path: 'reporte-entrevistainicialil/:id', component: ReporteEntrevistaInicialIlComponent, data: { titulo: 'Entrevista IL' } },

            { path: 'entrevistainicialtm/:id/:idContrato', component: EntrevistaInicialTmComponent, data: { titulo: 'Entrvista Inicial Tomatis' } },
            { path: 'listaentrevistainicialtm', component: ListaEntrevistaTmComponent, data: { titulo: 'Lista de entrevista incial' } },
            { path: 'reporte-entrevistainicialtm/:id', component: ReporteEntrevistaTmComponent, data: { titulo: 'Entrevista IL' } },

            /**Cambio Horario */
            { path: 'cambiohorario-agregar/:id', component: AgregarEstudianteComponent, data: { titulo: 'Agregar - Retirar estudiantes' } },
            { path: 'cambiohorario-cambiar/:id', component: CambiarEstudianteComponent, data: { titulo: 'Cambiar estudiantes' } },

            /**Agenda de netrega de informes */
            { path: 'agenda-entrega-informes', component: AgendaEntregaInformesComponent, data: { titulo: 'Agenda de entrega de informes' } },

            /**Campañias */
            { path: 'campania/:id', component: CampaniaComponent, data: { titulo: 'Campaña' } },
            { path: 'listacampania', component: ListaCampaniaComponent, data: { titulo: 'Lista Campañas' } },

            /**Registro llamadas */
            { path: 'registrollamada/:id', component: RegistroLlamadasComponent, data: { titulo: 'Registro llamadas' } },
            { path: 'registrollamadas', component: ListaRegistroLlamadasComponent, data: { titulo: 'Lista registro llamadas' } },

            /**Entrega libros */
            { path: 'entregalibros/:id', component: EntregaLibrosComponent, data: { titulo: 'Entrega libros' } },
            { path: 'entregalibros', component: ListaEntregaLibrosComponent, data: { titulo: 'Lista entrega libros' } },

            /**Plataforma Charloote */
            { path: 'platafoma-charlotte/:id', component: PlataformaCharlotteComponent, data: { titulo: 'Plataforma Charlotte' } },
            { path: 'lista-platafoma-charlotte', component: ListaPlataformaCharlotteComponent, data: { titulo: 'Lista Plataforma Charlotte' } },

            /**Plataforma Ilvem */
            { path: 'platafoma-ilvem/:id', component: PlataformaIlvemComponent, data: { titulo: 'Plataforma Ilvem' } },
            { path: 'lista-platafoma-ilvem', component: ListaPlataformaIlvemComponent, data: { titulo: 'Lista Plataforma Ilvem' } },

            /**Evaluacion Charlotte */
            { path: 'evaluacion-charlotte/:id', component: EvaluacionCharlotteComponent, data: { titulo: 'Evaluacion Charlotte' } },
            //{ path: 'lista-evaluacion-charlotte', component: ListaPlataformaIlvemComponent , data:{titulo:'Lista Plataforma Ilvem'} },

            /**Encuesta para padres */
            { path: 'lista-encuesta-padres', component: ListaEncuestaPadresComponent, data: { titulo: 'Lista Plataforma Ilvem' } },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
