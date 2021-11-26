import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from '../../pages/persona/persona.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  public persona: Persona = new Persona();

  constructor(private personaService: PersonaService) {
    this.persona = personaService.persona;
  }

  logout() {
    this.personaService.logout();
    localStorage.clear();
  }
}
