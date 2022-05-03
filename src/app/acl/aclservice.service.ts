import { Injectable } from '@angular/core';
import { PersonaService } from '../pages/persona/persona.service';

@Injectable({
  providedIn: 'root'
})
export class ACLServiceService {

  ACL: any = {
    superAdmin: ['*'],
    rolesContratos: ['Admin_Ventas_role'],
    'contrato/:id': ['Admin_Ventas_role', 'User_Ventas_role'],
    'delete.contrato': ['Admin_Ventas_role', 'User_Ventas_role'],
    'listacontratos': ['Admin_Ventas_role'],
    'listacontratos-asesores': ['Admin_Ventas_role', 'User_Ventas_role'],
    'reporte-contrato/:id': ['Admin_Ventas_role'],
    'reporte-venta-contrato': ['Admin_Ventas_role', 'User_Ventas_role'],
    rolesEstudaintes: ['Admin_Academico_role'],
    'listaestudiantes': [
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-asistencia-estudiante/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ]

  };

  constructor(private personaService: PersonaService) { }

  can(permission: string): boolean {
    let nombreRole = localStorage.getItem('rl');
    const roles = this.ACL[permission];
    //console.log('CAN roles', roles);
    if (!roles) {
      //console.log('No existe rol de esta ruta', roles);
      return false;
    }
    //si contine * devuelve true
    if (roles.includes('*')) {
      //console.log('CAN *', roles);
      return true;
    }
    //console.log('Incluye ROL?', roles?.includes(nombreRole));
    return roles?.includes(nombreRole);
  }

  isRole(roles: string[]): boolean {
    const regexRoles = new RegExp(roles.join('|'), 'i');
    let nombreRole = localStorage.getItem('rl');
    return regexRoles.test(nombreRole);
  }

}
