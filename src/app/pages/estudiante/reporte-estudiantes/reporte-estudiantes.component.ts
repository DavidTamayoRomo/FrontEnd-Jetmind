import { Component, OnInit } from '@angular/core';
import { ProgramaService } from '../../services/programa.service';

@Component({
  selector: 'app-reporte-estudiantes',
  templateUrl: './reporte-estudiantes.component.html',
  styles: [
  ]
})
export class ReporteEstudiantesComponent implements OnInit {

  public respuesta:any;

  constructor(
    private programaService: ProgramaService,

  ) { }

  ngOnInit(): void {
    this.obtenerDatos({
      "idCiudad": ["613a389282cbc52ac8a87a13","618984e64fdd230e906c5ac6"],
      "idMarca": ["613a53447f51e7211092c8de"],
      "idSucursal": ["613a5496611f153bb0ea93f1"]
    });
  }



  obtenerDatos(datos: any) {
    this.programaService.allByCiudadMarcaSucursalNombreprograma(datos).subscribe((resp: any) => {
      console.log(resp);
      this.respuesta = resp.data;
    });
  }

}
