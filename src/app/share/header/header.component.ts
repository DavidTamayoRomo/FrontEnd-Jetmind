import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../pages/persona/persona.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent{

  constructor(private personaService:PersonaService) { }

  logout(){
    this.personaService.logout()
  }

}
