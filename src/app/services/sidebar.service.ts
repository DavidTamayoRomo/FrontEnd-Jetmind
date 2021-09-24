import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu:any = [
    {
      titulo:'Home',
      icono:'mdi mdi-gauge',
      submenu:[
        { titulo: 'Main',url: '/' },
        { titulo: 'Rxjs',url: 'rxjs' },
      ]
    }
  ]

  constructor() { }
}
