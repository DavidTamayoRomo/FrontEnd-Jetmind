import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu:any = [
    {
      titulo:'Home',
      icono:'mdi mdi-home',
      submenu:[
        { titulo: 'Main',url: '/' },
        /* { titulo: 'Perfil',url: '/perfil' },  */
      ]
    },

    {
      titulo: 'Ciudad',
      icono: 'mdi mdi-city',
      submenu: [
        { titulo: 'Ciudad',url: '/ciudad/nuevo' },
        { titulo: 'Lista Ciudades',url: '/listaciudades' },
      ]
    },
    {
      titulo: 'Marca',
      icono: 'mdi mdi-cards-outline',
      submenu: [
        { titulo: 'Marca',url: '/marca/nuevo' },
        { titulo: 'Lista Marcas',url: '/listamarcas' },
      ]
    },
    {
      titulo: 'Sucursal',
      icono: 'mdi mdi-arrange-send-to-back',
      submenu: [
        { titulo: 'Sucursal',url: '/sucursal/nuevo' },
        { titulo: 'Lista sucursales',url: '/listasucursales' },
      ]
    },
    {
      titulo: 'Vigencia',
      icono: 'mdi mdi-timer',
      submenu: [
        { titulo: 'Crear Vigencia',url: '/vigencia/nuevo' },
        { titulo: 'Lista Vigencias',url: '/listavigencias' },
      ]
    },
    {
      titulo: 'Nombre de Programas',
      icono: 'mdi mdi-book',
      submenu: [
        { titulo: 'Programas',url: '/nombrePrograma/nuevo' },
        { titulo: 'Lista programas',url: '/listanombreprogramas' },
        
      ]
    },
    {
      titulo: 'Personas',
      icono: 'mdi mdi-account-key',
      submenu: [
        { titulo: 'Persona',url: '/persona/nuevo' },
        { titulo: 'Lista Personas',url: '/listapersonas' },
      ]
    },
    {
      titulo: 'Rerpesentantes',
      icono: 'mdi mdi-account-star-variant',
      submenu: [
        { titulo: 'Representante',url: '/representante/nuevo' },
        { titulo: 'Lista Representantes',url: '/listarepresentantes' },
      ]
    },
    {
      titulo: 'Estudiantes',
      icono: 'mdi mdi-account-settings',
      submenu: [
        { titulo: 'Estudiante',url: '/estudiante/nuevo' },
        { titulo: 'Lista estudiantes',url: '/listaestudiantes' },
      ]
    },
    {
      titulo: 'Programa Estudiante',
      icono: 'mdi mdi-account-settings',
      submenu: [
        { titulo: 'Programa',url: '/programa/nuevo' },
        { titulo: 'Lista Programa',url: '/listaprogramas' },
      ]
    },
    
    {
      titulo: 'Contratos',
      icono: 'mdi mdi-book-open-page-variant',
      submenu: [
        { titulo: 'Contrato',url: '/contrato/nuevo' },
        { titulo: 'Lista Contratos',url: '/listacontratos' },
        /* { titulo: 'Contratos 1',url: '/contrato1/nuevo' }, */
      ]
    },
    {
      titulo: 'Verificacion',
      icono: 'mdi mdi-verified',
      submenu: [
        { titulo: 'Lista verificacion',url: '/listaverificacion' },
      ]
    },
    {
      titulo: 'Facturas',
      icono: 'mdi mdi-briefcase',
      submenu: [
        { titulo: 'Facturar',url: '/facturar/nuevo' },
        { titulo: 'Lista Facturar',url: '/listafacturar' },
      ]
    },
    {
      titulo: 'Directores',
      icono: 'mdi mdi-earth',
      submenu: [
        
        { titulo: 'Asignar Director',url: '/asignardirector' },
      ]
    },
    {
      titulo: 'Telemarketing',
      icono: 'mdi mdi-camera-front-variant',
      submenu: [
        
        { titulo: 'Crear citas',url: '/citasTelemarketing/nuevo' },
        { titulo: 'Lista citas',url: '/listacitas' },
        { titulo: 'Calendario',url: '/calendario' },
      ]
    },
    
    

  ]

  constructor() { }
}
