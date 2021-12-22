import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona/persona.service';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public persona:Persona = new Persona();

  constructor(private personaService:PersonaService) { 
    /**Imagen de perfil */
    this.persona = personaService.persona;
  }

  ngOnInit(): void {
  }

}
