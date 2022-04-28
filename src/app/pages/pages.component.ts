import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

// @ts-ignore
declare function init_pugings();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  year = new Date().getFullYear();
  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    init_pugings();
    this.sidebarService.cargarMenu();
  }

}
