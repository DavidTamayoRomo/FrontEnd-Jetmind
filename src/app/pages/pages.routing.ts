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




const routes: Routes = [
    /**Rutas protegidas */
    {
        path: '',
        component: PagesComponent,
        canActivate:[AuthGuard],
        children: [
            /**Rutas que necesitan autenticacion */
            { path: 'dashboard', component: DashboardComponent, data:{titulo:'Home'} },
            // Rutas persona 
            //{ path: 'persona', component: PersonaComponent, data:{titulo:'Persona'} },
            { path: 'persona/:id', component: PersonaComponent, data:{titulo:'Actualizar Persona'} },
            { path: 'listapersonas', component: ListaPersonasComponent, data:{titulo:'Lista Personas'} },

            { path: 'ciudad/:id', component: CiudadComponent, data:{titulo:'Ciudad'} },
            { path: 'listaciudades', component: CiudadesComponent, data:{titulo:'Lista de ciudades'} },

            { path: 'marca/:id', component: MarcaComponent, data:{titulo:'Marca'} },
            { path: 'listamarcas', component: MarcasComponent, data:{titulo:'Lista de marcas'} },
            
            { path: 'sucursal/:id', component: SucursalComponent, data:{titulo:'Sucursal'} },
            { path: 'listasucursales', component: SucursalesComponent, data:{titulo:'Lista de sucursales'} },
            
            { path: 'representante/:id', component: RepresentanteComponent, data:{titulo:'Representante'} },
            { path: 'listarepresentantes', component: RepresentantesComponent, data:{titulo:'Lista de representantes'} },
            
            { path: 'estudiante/:id', component: EstudianteComponent, data:{titulo:'Estudiante'} },
            { path: 'listaestudiantes', component:EstudiantesComponent , data:{titulo:'Lista de estudiantes'} },
            
            { path: 'nombrePrograma/:id', component: NombreProgramaComponent, data:{titulo:'Nombre Programa'} },
            { path: 'listanombreprogramas', component:NombreProgramasComponent , data:{titulo:'Lista de los programas'} },

            { path: 'contrato/:id', component: ContratoComponent, data:{titulo:'Contrato'} },
            { path: 'listacontratos', component:ContratosComponent , data:{titulo:'Lista de los contratos'} },
            
            { path: 'contrato1/:id', component: ContratoFormComponent, data:{titulo:'Contrato'} },
            //{ path: 'listacontratos', component: , data:{titulo:'Lista de contratos'} },
            
            { path: 'facturar/:id', component: FacturarComponent, data:{titulo:'Facturar'} },
            { path: 'listafacturar', component:FacturasComponent , data:{titulo:'Lista de las facturas'} },
            
            { path: 'programa/:id', component: ProgramaComponent, data:{titulo:'Programa'} },
            { path: 'listaprogramas', component:ProgramasComponent , data:{titulo:'Lista de los programas'} },

            { path: 'perfil', component: PerfilComponent, data:{titulo:'Perfil'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
