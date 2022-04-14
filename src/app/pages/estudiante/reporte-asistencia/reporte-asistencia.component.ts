import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AsistenciaService } from '../../services/asistencia.service';
import { EstudianteService } from '../../services/estudiante.service';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import jsPDF from 'jspdf';
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-reporte-asistencia',
  templateUrl: './reporte-asistencia.component.html',
  styles: [
  ]
})
export class ReporteAsistenciaComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;

  estudiante: any;
  asistencias: any;
  contadorAsistencias: any;
  contadorAusencias: any;

  constructor(
    private estudianteService: EstudianteService,
    private asistenciaService: AsistenciaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.datosEstudiante(id);
      this.asistenciasEstudiante(id);
    });
  }

  public downloadAsPDF() {

    const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 

     

  }

  datosEstudiante(idEstudiante: any) {
    this.estudianteService.obtenerEstudianteById(idEstudiante).subscribe((resp: any) => {
      console.log('Estudiante: ', resp);
      this.estudiante = resp.data;
    });
  }

  asistenciasEstudiante(idEstudiante: any) {
    this.asistenciaService.asistenciaByEstudiante(idEstudiante).subscribe((resp: any) => {
      console.log('Asistencias: ', resp);
      this.asistencias = resp.data;
      this.contadorAsistencias = this.asistencias.filter((asistencia: any) => asistencia.prueba.estado == true).length;
      this.contadorAusencias = this.asistencias.filter((asistencia: any) => asistencia.prueba.estado == false).length; 
    });

  }



}
