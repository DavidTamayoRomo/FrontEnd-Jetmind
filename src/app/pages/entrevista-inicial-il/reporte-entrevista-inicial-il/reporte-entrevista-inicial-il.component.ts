import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoService } from '../../services/contrato.service';
import { entrevistainicialilvemService } from '../../services/entrevista-inicial-il.service';
import { EstudianteService } from '../../services/estudiante.service';
import { RepresentanteService } from '../../services/representante.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte-entrevista-inicial-il',
  templateUrl: './reporte-entrevista-inicial-il.component.html',
  styles: [
  ]
})
export class ReporteEntrevistaInicialIlComponent implements OnInit {

  public entrevistInicial: any;
  public contrato: any;
  public representante: any;
  public estudiante: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private entrevistaInciialService:entrevistainicialilvemService,
    private contratoService:ContratoService,
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
      this.contratoService.obtenerContratoById( resp.data.idContrato).subscribe((resp: any) => {
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

    let estudiantesEntrevista :any = [];
    let docenteHorario:any = [];
    entrevista.estudiantes1.map((resp:any)=>{
      this.estudianteService.obtenerEstudianteById(resp.estudiantes[0].idEstudainte).subscribe((resp2:any)=>{
        estudiantesEntrevista.push([resp.estudiantes[0].nombreEstudiante, resp2.data.cedula, this.calcularEdad(resp2.data.fechaNacimiento),
         resp.tiempoCapacitacion, resp.observaciones],);
      });
      resp.estudiantes.map((resp3:any)=>{
        docenteHorario.push([resp.estudiantes[0].nombreEstudiante, resp3.idDocente[0].nombre, resp3.idHorario[0].nombre]);
      });
    });



    setTimeout(() => {
      const pdfDefinition: any = {

        content: [
  
          {
            image:this.imagenIL,
            width: 200,
            alignment: 'center',
          },
          '\n\n',
          {
            text: 'ENTREVISTA INICIAL ILVEM',
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
                  ['Nombre','Cedula','Edad','tiempoCapacitacion','Observaciones'],
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
                ['Pregunta','Respuesta'],
                ['Apoyo escolar (10mo de básica) Matemáticas, Lenguaje, CCSS, CCNN todo el año, 1 vez a la semana. Horarios establecidos por la institución, separar los 5 primeros días de cada mes ',`${entrevista.pregunta1}`],
                ['Cambios de Profesores ', `${entrevista?.pregunta2}`],
                ['Cambios de horario siempre que haya disponibilidad ',`${entrevista?.pregunta3}`],
                ['Costos de finalización de la capacitación (certificados)', `${entrevista?.pregunta4}`],
                ['¿Qué lo motivó a tomar la capacitación?', `${entrevista?.pregunta5}`],
                ['Observaciones', `${entrevista?.pregunta6}`],
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
          '\n',
          '\n',
          {
            text: 'ACUERDOS',
            style: 'header',
            color: '#E84B20',
            bold: true
          },
          '\n\n',
          {
            text:'- Puntualidad\n - Respetar los horarios establecidos\n - Reforzar en casa\n - Conectarse de manera regular '
          }
  
        ]
  
      }
  
      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    }, 500);
    

  }


  public imagenIL:any = 'data:image/png;base64,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';
}
