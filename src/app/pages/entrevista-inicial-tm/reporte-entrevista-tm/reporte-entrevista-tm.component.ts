import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoService } from '../../services/contrato.service';
import { EstudianteService } from '../../services/estudiante.service';
import { RepresentanteService } from '../../services/representante.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EntrevistaInicialTmService } from '../../services/entrevista-inicial-tm.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-reporte-entrevista-tm',
  templateUrl: './reporte-entrevista-tm.component.html',
  styles: [
  ]
})
export class ReporteEntrevistaTmComponent implements OnInit {

  public entrevistInicial: any;
  public contrato: any;
  public representante: any;
  public estudiante: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private entrevistaInciialService: EntrevistaInicialTmService,
    private contratoService: ContratoService,
    private representanteService: RepresentanteService,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      console.log(id);
      this.cargarDatos(id);
    });
  }


  calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
    }

    return edad;
  }

  cargarDatos(id: string) {
    this.entrevistaInciialService.obtenerEntrevistaById(id).subscribe((resp: any) => {
      this.entrevistInicial = resp.data;
      console.log(resp.data);
      this.contratoService.obtenerContratoById(resp.data.idContrato).subscribe((resp: any) => {
        this.contrato = resp.data;
        console.log(resp.data);
        this.representanteService.obtenerRepresentanteById(resp.data.idRepresentante).subscribe((resp: any) => {
          this.representante = resp.data;
          this.estudianteService.getAllEstudiantesByIdRepresentante(resp.data._id).subscribe((resp: any) => {
            this.estudiante = resp.data;
            this.createPDF(this.estudiante[0], this.representante, this.contrato, this.entrevistInicial);
          });
        });
      });
    });
  }


  createPDF(estudiante: any, representante: any, contrato: any, entrevista: any) {

    let estudiantesEntrevista: any = [];
    let asuntosTratados: any = [];
    let docenteHorario:any = [];
    entrevista.estudiantes1.map((resp: any) => {
      this.estudianteService.obtenerEstudianteById(resp.estudiantes[0].idEstudainte).subscribe((resp2: any) => {
        estudiantesEntrevista.push([resp.estudiantes[0].nombreEstudiante, resp2.data.cedula, this.calcularEdad(resp2.data.fechaNacimiento),
        resp.tiempoCapacitacion, resp.observaciones]);
        asuntosTratados.push([resp.estudiantes[0].nombreEstudiante, resp.pregunta1, resp.pregunta2, resp.pregunta3]);
      });
      resp.estudiantes.map((resp3:any)=>{
        docenteHorario.push([resp.estudiantes[0].nombreEstudiante, resp3.idDocente[0].nombre, resp3.idHorario[0].nombre]);
      });
    });



    setTimeout(() => {
      const pdfDefinition: any = {

        content: [

          {
            image: this.imagenTM,
            width: 200,
            alignment: 'center',
          },
          '\n\n',
          {
            text: 'ENTREVISTA INICIAL TOMATIS',
            style: 'header',
            alignment: 'center',
            color: '#E84B20',
            bold: true,
            fontsize: 26,
          },
          '\n\n',
          {
            text: 'DATOS PERSONALES DEL ESTUDIANTE',
            style: 'header',
            alignment: 'center',
            color: '#E84B20',
            bold: true
          },
          '\n\n',

          {
            columns: [
              {
                text: [
                  { text: 'Nombre Representante: ', style: 'header', bold: true, fontSize: 12, color: 'black' },
                  `${representante?.nombresApellidos}`,
                ]
              },
              {
                text: [
                  { text: 'Cedula: ', style: 'header', bold: true, fontSize: 12 },
                  `${representante?.cedula}`,
                ]
              },
            ]
          },
          '\n\n',
          {
            style: 'tableExample',
            table: {
              body: [
                ['Nombre', 'Cedula', 'Edad', 'tiempoCapacitacion', 'Observaciones'],
                ...estudiantesEntrevista,
              ]
            }
          },
          '\n',
          {
            text: [
              { text: 'Dirección: ', style: 'header', bold: true, fontSize: 12, color: 'black' },
              `${representante?.direccion}`,
            ]
          },
          '\n\n',
          {
            text: 'ASUNTOS TRATADOS',
            style: 'header',
            color: '#E84B20',
            bold: true
          },
          '\n\n',
          {
            style: 'tableExample',
            table: {
              body: [
                ['Nombre', 'Recomendaciones del Especialista', 'Motivo de la Consulta', 'Observaciones Durante la Entrevista'],
                ...asuntosTratados,
              ]
            }
          },
          '\n\n',
          {
            text: 'HORARIOS ASIGNADOS',
            style: 'header',
            color: '#E84B20',
            bold: true
          },
          '\n\n',
          {
            style: 'tableExample',
            table: {
              body: [
                ['Estudiante','Docente','Horario'],
                ...docenteHorario
              ]
            }
          },
          '\n\n',

          {
            text: 'ACUERDOS',
            style: 'header',
            color: '#E84B20',
            bold: true
          },
          '\n\n',
          {
            text: '1.- Puntualidad: Llegar 5 minutos antes del horario establecido\n 2.- La asistencia debe ser constante y continua durante 13 días de Lunes a Vierne - Reforzar en casa\n 3.- No hay Modificación de Horarios\n 4.- El cierre de Fase será vía Online\n 5.- Si el Paciente se encuentra con dificultades de salud por favor que no asista. (Se debe presentar el certificado médico para recuperar la inasistencia\n 6.- Si tiene 3 inasistencias seguidas se cancela la fase\n 7.- Para salvaguardar la seguridad de todos, el aforo del centro es limitado, solo podrán ingresar los especialistas y los paciente'
          }

        ]

      }

      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    }, 500);


  }

  public imagenTM: any = 'data:image/png;base64,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'

}
