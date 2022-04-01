import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrevistaInicialCHUKService } from '../../services/entrevista-inicial-chuk.service';
import { ContratoService } from '../../services/contrato.service';
import { RepresentanteService } from '../../services/representante.service';
import { EstudianteService } from '../../services/estudiante.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-reprote-entrevista-inicial-chuk',
  templateUrl: './reprote-entrevista-inicial-chuk.component.html',
  styles: [
  ]
})
export class ReproteEntrevistaInicialChukComponent implements OnInit {


  public entrevistInicial: any;
  public contrato: any;
  public representante: any;
  public estudiante: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private entrevistaInciialService:EntrevistaInicialCHUKService,
    private contratoService:ContratoService,
    private representanteService: RepresentanteService,
    private estudianteService: EstudianteService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
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
      this.contratoService.obtenerContratoById(this.entrevistInicial.idContrato).subscribe((resp: any) => {
        this.contrato = resp.data;
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

    /* let array = [];
    if (entrevista.pregunta1 === 'Si') {
      //array[0] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAArCAYAAADottG6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALNSURBVGhD7di9b9pAGAZwwGASSGsSJ52yZPKCOnSIOrKzeMiEOrO0S6WIhUqRMkTqEAmJIUollAGxRWxdUOYs/ANMWZg8Vx08PeWFM/7I+ewDFxOJR3qlKIlyvwf57HMyeMPZ4dPKDp9WdvhkY+Hl5S/7Wpwtw1vo1zVkFAPNkcW+F54twjN4JrMYRYfZFxfYErwHXsoi/znLSmiodSew2W8Fkz7enqLnge/dl/HhuYzKt9yywPnNmFsgXTwXfrCcoysF2XkBBcb3ZwS3cXr4CLgzx508cqzAaWM4u8DcpIOPCZ/PsAj1jPAZKEYLY8/1s3m8JLxQWcDVatsHp2wW74PnsP8ggqvIl8LhFCm8NfqKi9brjRMrEvCTRxeund9w4ZTYeKtvQlfoD/J3vjD2BN1asnBKDLyNSbcGjRZejkQBGfjAA691MRHAKRF4G+N2FSpD574UcXjr3rqMFv/hsYwM/KEARQJOEeAtjJoGFAbPX+7jhC3kvfeGFgjAS4OY8HoP0xhwSgh+dtYwdQbPoth5vbD+UwkvIAO/LyC3hPd9D6GocPB/8HjBFp7B936FL8wtsBJcgW7KwSncT96e9lDXFp9G5lMBlSf+4jRuARXV1gC3MeHHd+6ltwqcEnrN+woYEQWunQMUGwl48LwiE8GGDRQ4y0Mb8TE0ywJRcMFBSzZCPCVY4P1vPopGvy7g4JH/MxrfXao5WgtOicRT/AUUvBvycaLxbe4E4JRYeIqvwOzSKAs+4eC4e2IGlz1aCBIbTwkWEF3bzvjgUU9kyUjhKcECoke+fuW8h85uo+1k4RRp/DxWH6ausAL8F4qjH/8XTlkNT7GGaJyyAvQkvnMKlHF4Gf3mn0RWx1OsEZqGW6DYKW0MTlkPT7HHaFdVBnZG/M+ipLI+nuI9jG0ITkkGP4+FYeMjzN50I3BKgvjNZ4dPKzt8WnnDeOAf8bM6Aqkm1qoAAAAASUVORK5CYII=';
    }
    if (entrevista.pregunta2 === 'Si') {
      
    }
    if (entrevista.pregunta3 === 'Si') {
      
    }
    if (entrevista.pregunta4 === 'Si') {
      
    }
    if (entrevista.pregunta5 === 'Si') {
      
    }
    if (entrevista.pregunta6 === 'Si') {
      
    }
    if (entrevista.pregunta7 === 'Si') {
      
    }
    if (entrevista.pregunta8 === 'Si') {
      
    }
    if (entrevista.pregunta8 === 'Si') {
      
    } */

    let estudiantesEntrevista :any = [];
    let docenteHorario:any = [];
    entrevista.estudiantes1.map((resp:any)=>{
      this.estudianteService.obtenerEstudianteById(resp.estudiantes[0].idEstudainte).subscribe((resp2:any)=>{
        estudiantesEntrevista.push([resp.estudiantes[0].nombreEstudiante, resp2.data.cedula, this.calcularEdad(resp2.data.fechaNacimiento),
         resp.tiempoCapacitacion, resp.observaciones]);
      });
      resp.estudiantes.map((resp3:any)=>{
        docenteHorario.push([resp.estudiantes[0].nombreEstudiante, resp3.idDocente[0].nombre, resp3.idHorario[0].nombre]);
      });
    });

    setTimeout(() => {
      const pdfDefinition: any = {

        content: [
  
          {
            image:this.imagenCH,
            width: 200,
            alignment: 'center',
          },
          '\n\n',
          {
            text: 'ENTREVISTA INICIAL ',
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
          '\n\n',
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
                ['Apoyo Académico (R.I.N) ',`${entrevista?.pregunta1}`],
                ['Evaluaciones continuas', `${entrevista?.pregunta2}`],
                ['Talleres y conferencias virtuales con psicólogos de amplia trayectoria',`${entrevista?.pregunta3}`],
                ['Certificado', `${entrevista?.pregunta4}`],
                ['¿Asiste a escuela o colegio bilingüe? ', `${entrevista?.pregunta5}`],
                ['¿En casa alguien habla inglés?', `${entrevista?.pregunta6}`],
                ['¿Ha estudiando inglés anteriormente?',`${entrevista?.pregunta7}`],
                ['¿Tiene algún problema de aprendizaje?', `${entrevista?.pregunta8}`],
                ['¿Por qué ha decidido estudiar inglés?', `${entrevista?.pregunta8}`],
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
  
        ]
  
      }


      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    }, 500);
    

    

  }






  public imagenCH:any = 'data:image/png;base64,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'; 

}
