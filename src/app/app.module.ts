import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/** Modulos */
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ModalImagenComponent } from './components/modal-imagen/modal-imagen.component';
import { EncuestaPadresComponent } from './publico/encuesta-padres/encuesta-padres.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ListaEncuestaPadresComponent } from './publico/encuesta-padres/lista-encuesta-padres/lista-encuesta-padres.component';
import { HasRoleDirective } from './has-role.directive';





@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    EncuestaPadresComponent,
    ListaEncuestaPadresComponent,
    //HasRoleDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
