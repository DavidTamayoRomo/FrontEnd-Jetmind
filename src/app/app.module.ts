import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/** Modulos */
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { ModalImagenComponent } from './components/modal-imagen/modal-imagen.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';



@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
