import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
    /**Rutas protegidas */
    {
        path: '',
        component: PagesComponent,
        children: [
            /**Rutas que necesitan autenticacion */
            { path: 'dashboard', component: DashboardComponent, data:{titulo:'Home'} },
            { path: 'rxjs', component: RxjsComponent, data:{titulo:'Rxjs'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
