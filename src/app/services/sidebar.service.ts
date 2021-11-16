import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu:any = [
    {
      titulo:'Home',
      icono:'mdi mdi-gauge',
      submenu:[
        { titulo: 'Main',url: '/' },
        { titulo: 'Perfil',url: '/perfil' },
        { titulo: 'Persona',url: '/persona/nuevo' },
        { titulo: 'Lista Personas',url: '/listapersonas' },
        { titulo: 'Ciudad',url: '/ciudad/nuevo' },
        { titulo: 'Lista Ciudades',url: '/listaciudades' },
        { titulo: 'Marca',url: '/marca/nuevo' },
        { titulo: 'Lista Marcas',url: '/listamarcas' },
        { titulo: 'Sucursal',url: '/sucursal/nuevo' },
        { titulo: 'Lista sucursales',url: '/listasucursales' },
        { titulo: 'Representante',url: '/representante/nuevo' },
        { titulo: 'Lista Representantes',url: '/listarepresentantes' },
        { titulo: 'Estudiante',url: '/estudiante/nuevo' },
        { titulo: 'Lista estudiantes',url: '/listaestudiantes' },
        { titulo: 'Programas',url: '/nombrePrograma/nuevo' },
        { titulo: 'Lista programas',url: '/listanombreprogramas' },
        { titulo: 'Contrato',url: '/contrato/nuevo' },
      ]
    }
  ]

  constructor() { }
}
