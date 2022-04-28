import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { PersonaService } from '../../pages/persona/persona.service';
import { Persona } from '../../models/persona.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {
  public persona:Persona = new Persona();
  public imagenPerfil:any = '';
  //menuItems:any[];

  constructor(public sidebarService:SidebarService, private personaService:PersonaService) {
    /**MENU */
    //this.menuItems = sidebarService.menu;
    /**Imagen de perfil */
    this.persona = personaService.persona;
  }

  ngOnInit(): void {
  }

  logout(){
    this.personaService.logout()
  }

}
