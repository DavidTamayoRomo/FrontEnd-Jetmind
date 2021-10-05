import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    init_pugings();
  }

}
