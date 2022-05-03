import { Injectable } from '@angular/core';
import { PersonaService } from '../pages/persona/persona.service';

@Injectable({
  providedIn: 'root'
})
export class ACLServiceService {

  ACL: any = {
    superAdmin: ['*'],
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
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-estudiantes': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    Representantes:[],
    'listarepresentantes':[
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Admin_Ventas_role'
    ],
    rolesContratos: ['Admin_Ventas_role'],
    'contrato/:id': ['Admin_Ventas_role', 'User_Ventas_role'],
    'listacontratos': ['Admin_Ventas_role'],
    'listacontratos-asesores': ['Admin_Ventas_role', 'User_Ventas_role'],
    'reporte-contrato/:id': ['Admin_Ventas_role'],
    'reporte-venta-contrato': ['Admin_Ventas_role', 'User_Ventas_role'],
    facturas: ['Admin_Ventas_role', 'User_Ventas_role'],
    'facturar/:id': ['Admin_Ventas_role', 'User_Ventas_role'],
    'listafacturar': ['Admin_Ventas_role', 'User_Ventas_role'],
    verificacion: [],
    'verificacion/:id': ['Admin_Ventas_role'],
    'listaverificacion': ['Admin_Ventas_role'],
    'aceptacionverificacion/:id': ['Admin_Ventas_role'],
    'reporteVerificacion': ['Admin_Ventas_role'],
    nombrePrograma: ['Admin_Ventas_role', 'User_Ventas_role'],
    'lista-programas': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'nombrePrograma/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    programas: [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'programa/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listaprogramas': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'asignardirector': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    horario:[],
    'horario/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    peaa:[],
    'listahorarios': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listapeea-17-ch-uk': [
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
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    asignarHorario:[],
    'asignarhorarioestudiante/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'asignarhorariosestudiantes': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    asistencia:[],
    'asistencia/:id': [
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'asistencia-tomatis/:id': [
      'Admin_Tomatis_Academico_role',
      'Docente_Tomatis_Academico_role'
    ],
    'asistencia-recuperacion/:id': [
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'asistencias': [
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'reporte-asistencia-docente': [
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    entrevistaInicial:[],
    'entrevistainicialchuk/:id/:idContrato': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listaentrevistainicialchuk': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'reporte-entrevistainicialchuk/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'entrevistainicialil/:id/:idContrato': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listaentrevistainicialil': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'reporte-entrevistainicialil/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'entrevistainicialtm/:id/:idContrato': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'listaentrevistainicialtm': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'reporte-entrevistainicialtm/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    cambioHorario:[],
    'cambiohorario-agregar/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    'cambiohorario-cambiar/:id': [
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_Tomatis_Academico_role',
      'Admin_UK_Academico_role'
    ],
    agendaEntregaInformes:[],
    'agenda-entrega-informes':[
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    registroLlamadas:[],
    'registrollamada/:id':[
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'registrollamadas':[
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    entregaLibros:[],
    'entregalibros/:id':[
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    'entregalibros':[
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Docente_Ilvem_Academico_role',
      'Admin_UK_Academico_role',
      'Docente_UK_Academico_role'
    ],
    plataformaCharlotte:[],
    'platafoma-charlotte/:id':[
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role'
    ],
    'lista-platafoma-charlotte':[
      'Admin_Charlotte_Academico_role',
      'Docente_Charlotte_Academico_role'
    ],
    plataformaIlvem:[],
    'platafoma-ilvem/:id':[
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role'
    ],
    'lista-platafoma-ilvem':[
      'Docente_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role'
    ],
    'lista-encuesta-padres':[
      'Admin_Charlotte_Academico_role',
      'Admin_Ilvem_Academico_role',
      'Admin_UK_Academico_role'
    ],
    Telemarketing: [],
    'citasTelemarketing/:id': [
      'Admin_Telemarketing_role',
      'User_Telemarketing_role'
    ],
    'listacitas': [
      'Admin_Telemarketing_role',
      'User_Telemarketing_role'
    ],
    'citasTelemarketing-reporte': [
      'Admin_Telemarketing_role',
      'User_Telemarketing_role'
    ],
    'control-calidad-telemarketing/:id/:idCita': [
      'Admin_Telemarketing_role',
    ],
    'lista-control-calidad-telemarketing': [
      'Admin_Telemarketing_role',
    ],
    'calendario': [
      'Admin_Telemarketing_role',
    ],




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
