import { Injectable } from '@angular/core';
import { PersonaService } from '../pages/persona/persona.service';

@Injectable({
  providedIn: 'root'
})
export class ACLServiceService {

  ACL: any = {
    superAdmin: ['*'],
    rolesEstudaintes: ['Super_Admin_role','Admin_Academico_role'],
    'listaestudiantes': [
      'Super_Admin_role',
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
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-estudiantes': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    Representantes: [],
    'listarepresentantes': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Admin_Ventas_role'
    ],
    rolesContratos: ['Super_Admin_role','Admin_Ventas_role'],
    'contrato/:id': ['Super_Admin_role','Admin_Ventas_role', 'User_Ventas_role'],
    'listacontratos': ['Super_Admin_role','Admin_Ventas_role'],
    'listacontratos-asesores': ['Super_Admin_role','Admin_Ventas_role', 'User_Ventas_role'],
    'reporte-contrato/:id': ['Super_Admin_role','Admin_Ventas_role'],
    'reporte-venta-contrato': ['Super_Admin_role','Admin_Ventas_role', 'User_Ventas_role'],
    facturas: ['Super_Admin_role','Admin_Ventas_role', 'User_Ventas_role'],
    'facturar/:id': ['Super_Admin_role','Admin_Ventas_role', 'User_Ventas_role'],
    'listafacturar': ['Super_Admin_role','Admin_Ventas_role', 'User_Ventas_role'],
    verificacion: [],
    'verificacion/:id': ['Super_Admin_role','Admin_Ventas_role'],
    'listaverificacion': ['Super_Admin_role','Admin_Ventas_role'],
    'aceptacionverificacion/:id': ['Super_Admin_role','Admin_Ventas_role'],
    'reporteVerificacion': ['Super_Admin_role','Admin_Ventas_role'],
    nombrePrograma: ['Super_Admin_role','Admin_Ventas_role', 'User_Ventas_role'],
    'lista-programas': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'nombrePrograma/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    programas: [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'programa/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listaprogramas': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'asignardirector': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    horario: [],
    'horario/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    peaa: [],
    'listahorarios': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listapeea-17-ch-uk': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-peea-17-ch-uk/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'listapeea-18-ch-uk': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-peea-18-ch-uk/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'lista-peea-17-ilvem': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-peea-17-ilvem/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'lista-peea-18-ilvem': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-peea-18-ilvem/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'lista-peea-17-tomatis': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-peea-17-toamtis/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'lista-peea-18-tomatis': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-peea-18-toamtis/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    asignarHorario: [],
    'asignarhorarioestudiante/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'asignarhorariosestudiantes': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    asistencia: [],
    'asistencia/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'asistencia-tomatis/:id': [
      'Super_Admin_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role'
    ],
    'asistencia-recuperacion/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'asistencias': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-asistencia-docente': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    entrevistaInicial: [],
    'entrevistainicialchuk/:id/:idContrato': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listaentrevistainicialchuk': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'reporte-entrevistainicialchuk/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'entrevistainicialil/:id/:idContrato': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listaentrevistainicialil': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'reporte-entrevistainicialil/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'entrevistainicialtm/:id/:idContrato': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listaentrevistainicialtm': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'reporte-entrevistainicialtm/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    cambioHorario: [],
    'cambiohorario-agregar/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'cambiohorario-cambiar/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    agendaEntregaInformes: [],
    'agenda-entrega-informes': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    registroLlamadas: [],
    'registrollamada/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'registrollamadas': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    entregaLibros: [],
    'entregalibros/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'entregalibros': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    plataformaCharlotte: [],
    'platafoma-charlotte/:id': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role'
    ],
    'lista-platafoma-charlotte': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role'
    ],
    plataformaIlvem: [],
    'platafoma-ilvem/:id': [
      'Super_Admin_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role'
    ],
    'lista-platafoma-ilvem': [
      'Super_Admin_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role'
    ],
    'lista-encuesta-padres': [
      'Super_Admin_role',
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_UK_Academico_role'
    ],
    Telemarketing: [],
    'citasTelemarketing/:id': [
      'Super_Admin_role',
      'Admin_Telemarketing_role',
      'User_Telemarketing_role'
    ],
    'listacitas': [
      'Super_Admin_role',
      'Admin_Telemarketing_role',
      'User_Telemarketing_role'
    ],
    'citasTelemarketing-reporte': [
      'Super_Admin_role',
      'Admin_Telemarketing_role',
      'User_Telemarketing_role'
    ],
    'control-calidad-telemarketing/:id/:idCita': [
      'Super_Admin_role',
      'Admin_Telemarketing_role',
    ],
    'lista-control-calidad-telemarketing': [
      'Super_Admin_role',
      'Admin_Telemarketing_role',
    ],
    'calendario': [
      'Super_Admin_role',
      'Admin_Telemarketing_role',
      'User_Telemarketing_role',
    ],




  };

  constructor(private personaService: PersonaService) { }

  can(permission: string): boolean {
    
    let nombreRole = localStorage.getItem('rl');
    const roles = this.ACL[permission];
    //console.log('CAN roles', roles);
    
    if (nombreRole === 'Super_Admin_role') {
      return true;
    }else{
      if (!roles) {
        //console.log('No existe rol de esta ruta', roles);
        return false;
      }else{
        return roles?.includes(nombreRole);
      }
    }

    
  }

  isRole(roles: string[]): boolean {
    const regexRoles = new RegExp(roles.join('|'), 'i');
    let nombreRole = localStorage.getItem('rl');
    return regexRoles.test(nombreRole);
  }

}
