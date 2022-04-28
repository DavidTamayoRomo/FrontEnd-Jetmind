import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [];

 /*  menu: any = [
    {
      titulo: 'Home',
      icono: 'mdi mdi-home',
      submenu: [
        { titulo: 'Main', url: '/' },
        // { titulo: 'Perfil',url: '/perfil' },
      ]
    },
    

    {
      titulo: 'Ciudad',
      icono: 'mdi mdi-city',
      submenu: [
        { titulo: 'Ciudad', url: '/ciudad/nuevo' },
        { titulo: 'Lista Ciudades', url: '/listaciudades' },
      ]
    },
    {
      titulo: 'Marca',
      icono: 'mdi mdi-cards-outline',
      submenu: [
        { titulo: 'Marca', url: '/marca/nuevo' },
        { titulo: 'Lista Marcas', url: '/listamarcas' },
      ]
    },
    {
      titulo: 'Sucursal',
      icono: 'mdi mdi-arrange-send-to-back',
      submenu: [
        { titulo: 'Sucursal', url: '/sucursal/nuevo' },
        { titulo: 'Lista sucursales', url: '/listasucursales' },
      ]
    },
    {
      titulo: 'Vigencia',
      icono: 'mdi mdi-timer',
      submenu: [
        { titulo: 'Crear Vigencia', url: '/vigencia/nuevo' },
        { titulo: 'Lista Vigencias', url: '/listavigencias' },
      ]
    },
    {
      titulo: 'Campaña',
      icono: 'mdi mdi-equal-box',
      submenu: [
        { titulo: 'Crear ', url: '/campania/nuevo' },
        { titulo: 'Lista ', url: '/listacampania' },
      ]
    },
    {
      titulo: 'Nombre de Programas',
      icono: 'mdi mdi-book',
      submenu: [
        { titulo: 'Programas', url: '/nombrePrograma/nuevo' },
        { titulo: 'Lista programas', url: '/listanombreprogramas' },

      ]
    },
    {
      titulo: 'Personas',
      icono: 'mdi mdi-account-key',
      submenu: [
        { titulo: 'Persona', url: '/persona/nuevo' },
        { titulo: 'Lista Personas', url: '/listapersonas' },
        { titulo: 'Reporte Docentes', url: '/reporte-docente-horarios' },
      ]
    },
    {
      titulo: 'Rerpesentantes',
      icono: 'mdi mdi-account-star-variant',
      submenu: [
        { titulo: 'Representante', url: '/representante/nuevo' },
        { titulo: 'Lista Representantes', url: '/listarepresentantes' },
      ]
    },
    {
      titulo: 'Estudiantes',
      icono: 'mdi mdi-account-settings',
      submenu: [
        { titulo: 'Estudiante', url: '/estudiante/nuevo' },
        { titulo: 'Estado Estudiante', url: '/estado-estudiante' },
        { titulo: 'Lista estudiantes', url: '/listaestudiantes' },
        { titulo: 'Reporte estudiantes', url: '/reporte-estudiantes' },
      ]
    },
    {
      titulo: 'Programa Estudiante',
      icono: 'mdi mdi-account-settings',
      submenu: [
        { titulo: 'Programa', url: '/programa/nuevo' },
        { titulo: 'Lista Programa', url: '/listaprogramas' },
      ]
    },

    {
      titulo: 'Contratos',
      icono: 'mdi mdi-book-open-page-variant',
      submenu: [
        { titulo: 'Contrato', url: '/contrato/nuevo' },
        { titulo: 'Lista Contratos', url: '/listacontratos' },
        { titulo: 'Contratos asesores', url: '/listacontratos-asesores' },
        { titulo: 'Reporte Contratos', url: '/reporte-venta-contrato' },
        // { titulo: 'Contratos 1',url: '/contrato1/nuevo' },
      ]
    },
    {
      titulo: 'Verificacion',
      icono: 'mdi mdi-verified',
      submenu: [
        { titulo: 'Lista verificacion', url: '/listaverificacion' },
        { titulo: 'Reporte verificacion', url: '/reporteVerificacion' },
      ]
    },
    {
      titulo: 'Facturas',
      icono: 'mdi mdi-briefcase',
      submenu: [
        { titulo: 'Facturar', url: '/facturar/nuevo' },
        { titulo: 'Lista Facturar', url: '/listafacturar' },
      ]
    },
    {
      titulo: 'Telemarketing',
      icono: 'mdi mdi-camera-front-variant',
      submenu: [

        { titulo: 'Crear citas', url: '/citasTelemarketing/nuevo' },
        { titulo: 'Lista citas', url: '/listacitas' },
        { titulo: 'Reporte citas', url: '/citasTelemarketing-reporte' },
        { titulo: 'Control Calidad Citas Telemarketing', url: '/control-calidad-telemarketing/idcontrol/idCita' },
        { titulo: 'Lista Control Calidad Citas Telemarketing', url: '/lista-control-calidad-telemarketing' },
        { titulo: 'Calendario', url: '/calendario' },
      ]
    },
    {
      titulo: 'Directores',
      icono: 'mdi mdi-earth',
      submenu: [

        { titulo: 'Asignar Director', url: '/asignardirector' },
      ]
    },
    
    {
      titulo: 'Horario',
      icono: 'mdi mdi-calendar-clock',
      submenu: [
        { titulo: 'Crear horario', url: '/horario/nuevo' },
        { titulo: 'Lista horarios', url: '/listahorarios' },
      ]
    },
    {
      titulo: 'Asignar Horario',
      icono: 'mdi mdi-brightness-auto',
      submenu: [
        { titulo: 'Crear', url: '/asignarhorarioestudiante/nuevo' },
        { titulo: 'Lista', url: '/asignarhorariosestudiantes' },
      ]
    },
    {
      titulo: 'Cambiar horario',
      icono: 'mdi mdi-alarm-multiple',
      submenu: [
        { titulo: 'Agregar - Retirar', url: '/cambiohorario-agregar/nuevo' },
        { titulo: 'Cambiar Grupo', url: '/cambiohorario-cambiar/nuevo' },
      ]
    },
    {
      titulo: 'Asistencia',
      icono: 'mdi mdi-checkbox-multiple-marked',
      submenu: [
        { titulo: 'Crear', url: '/asistencia/nuevo' },
        { titulo: 'Crear tomatis', url: '/asistencia-tomatis/nuevo' },
        { titulo: 'Recuperacion', url: '/asistencia-recuperacion/nuevo' },
        { titulo: 'Lista', url: '/asistencias' },
        { titulo: 'Reporte asistencia Docente', url: '/reporte-asistencia-docente' },
      ]
    },
    {
      titulo: 'Agenda de entrega de informes',
      icono: 'mdi mdi-calendar-multiple',
      submenu: [
        { titulo: 'Calendario', url: '/agenda-entrega-informes' },
      ]
    },
    {
      titulo: 'registro llamadas',
      icono: 'mdi mdi-phone-classic',
      submenu: [
        { titulo: 'Crear', url: '/registrollamada/nuevo' },
        { titulo: 'Lista', url: '/registrollamadas' },
      ]
    },
    {
      titulo: 'Entrega libros',
      icono: 'mdi mdi-book-variant',
      submenu: [
        { titulo: 'Crear', url: '/entregalibros/nuevo' },
        { titulo: 'Lista', url: '/entregalibros' },
      ]
    },
    {
      titulo: 'Encuesta Padres',
      icono: 'mdi mdi-notification-clear-all',
      submenu: [
        { titulo: 'Encuesta', url: '/encuestapadres' },
        { titulo: 'Lista Encuesta', url: '/lista-encuesta-padres' }
      ]
    },
    {
      titulo: 'Plataforma Charlotte',
      icono: 'mdi mdi-basket-unfill',
      submenu: [
        { titulo: 'Crear', url: '/platafoma-charlotte/nuevo' },
        { titulo: 'Lista', url: '/lista-platafoma-charlotte' },
      ]
    },
    {
      titulo: 'Plataforma Ilvem',
      icono: 'mdi mdi-basket-fill',
      submenu: [
        { titulo: 'Crear', url: '/platafoma-ilvem/nuevo' },
        { titulo: 'Lista', url: '/lista-platafoma-charlotte' },
      ]
    },
    {
      titulo: 'Evaluacion Charlotte',
      icono: 'mdi mdi-clipboard-outline',
      submenu: [
        { titulo: 'Crear', url: '/evaluacion-charlotte/nuevo' },
        { titulo: 'Lista', url: '/lista-evaluacion-charlotte' },
      ]
    },
    {
      titulo: 'Entrevista Incial CH UK',
      icono: 'mdi mdi-checkbox-multiple-marked',
      submenu: [
        { titulo: 'Crear', url: '/entrevistainicialchuk/nuevo/idcontrato' },
        { titulo: 'Lista', url: '/listaentrevistainicialchuk' },
      ]
    },
    {
      titulo: 'Entrevista Incial Ilvem',
      icono: 'mdi mdi-checkbox-multiple-marked',
      submenu: [
        { titulo: 'Crear', url: '/entrevistainicialil/nuevo/idcontrato' },
        { titulo: 'Lista', url: '/listaentrevistainicialil' },
      ]
    },
    {
      titulo: 'Entrevista Incial TOMATIS',
      icono: 'mdi mdi-checkbox-multiple-marked',
      submenu: [
        { titulo: 'Crear', url: '/entrevistainicialtm/nuevo/idcontrato' },
        { titulo: 'Lista', url: '/listaentrevistainicialtm' },
      ]
    },
    
    {
      titulo: 'PEEA 17 Charlotte - Uk',
      icono: 'mdi mdi-buffer',
      submenu: [
        { titulo: 'Crear PEEA 17', url: '/peea-17-ch-uk/nuevo/idcontrato' },
        { titulo: 'Lista PEEA 17', url: '/listapeea-17-ch-uk' },
      ]
    },
    {
      titulo: 'PEEA 18 Charlotte - Uk',
      icono: 'mdi mdi-buffer',
      submenu: [
        { titulo: 'Crear PEEA 18', url: '/peea-18-ch-uk/nuevo/idcontrato' },
        { titulo: 'Lista PEEA 18', url: '/listapeea-18-ch-uk' },
      ]
    },
    {
      titulo: 'PEEA 17 Ilvem',
      icono: 'mdi mdi-buffer',
      submenu: [
        { titulo: 'Crear PEEA 17', url: '/peea-17-ilvem/nuevo/idcontrato' },
        { titulo: 'Lista PEEA 17', url: '/lista-peea-17-ilvem' },
      ]
    },
    {
      titulo: 'PEEA 18 Ilvem',
      icono: 'mdi mdi-buffer',
      submenu: [
        { titulo: 'Crear PEEA 18', url: '/peea-18-ilvem/nuevo/idcontrato' },
        { titulo: 'Lista PEEA 18', url: '/lista-peea-18-ilvem' },
      ]
    },
    {
      titulo: 'PEEA 17 Tomatis',
      icono: 'mdi mdi-buffer',
      submenu: [
        { titulo: 'Crear PEEA 17', url: '/peea-17-tomatis/nuevo/idcontrato' },
        { titulo: 'Lista PEEA 17', url: '/lista-peea-17-tomatis' },
      ]
    },
    {
      titulo: 'PEEA 18 Tomatis',
      icono: 'mdi mdi-buffer',
      submenu: [
        { titulo: 'Crear PEEA 18', url: '/peea-18-tomatis/nuevo/idcontrato' },
        { titulo: 'Lista PEEA 18', url: '/lista-peea-18-tomatis' },
      ]
    },
    {
      titulo: 'PEEA',
      icono: 'mdi mdi-buffer',
      submenu: [
        { titulo: 'Lista PEEA 17 CH UK', url: '/listapeea-17-ch-uk' },
        { titulo: 'Lista PEEA 18 CH UK', url: '/listapeea-18-ch-uk' },
        { titulo: 'Lista PEEA 17 IL', url: '/lista-peea-17-ilvem' },
        { titulo: 'Lista PEEA 18 IL', url: '/lista-peea-18-ilvem' },
        { titulo: 'Lista PEEA 18 TM', url: '/lista-peea-18-ilvem' },
      ]
    },
    
    

  ] */

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu'));
  }
}
