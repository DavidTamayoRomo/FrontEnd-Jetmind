import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { PersonaService } from '../../pages/persona/persona.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems:any[];

  constructor(private sidebarService:SidebarService, private personaService:PersonaService) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
  }

  logout(){
    this.personaService.logout()
  }

}
