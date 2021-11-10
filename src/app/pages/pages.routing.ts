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
