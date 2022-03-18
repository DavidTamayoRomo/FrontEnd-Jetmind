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
          this.estudianteService.obtenerEstudianteById(resp.data._id).subscribe((resp: any) => {
            this.estudiante = resp.data;
            this.createPDF(this.estudiante[0], this.representante, this.contrato, this.entrevistInicial);
          });
        });
      });
    });
  }

  createPDF(estudiante: any, representante: any, contrato: any, entrevista: any) {

    let array = [];
    if (entrevista.pregunta1 === 'Si') {
      array[0] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAArCAYAAADottG6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALNSURBVGhD7di9b9pAGAZwwGASSGsSJ52yZPKCOnSIOrKzeMiEOrO0S6WIhUqRMkTqEAmJIUollAGxRWxdUOYs/ANMWZg8Vx08PeWFM/7I+ewDFxOJR3qlKIlyvwf57HMyeMPZ4dPKDp9WdvhkY+Hl5S/7Wpwtw1vo1zVkFAPNkcW+F54twjN4JrMYRYfZFxfYErwHXsoi/znLSmiodSew2W8Fkz7enqLnge/dl/HhuYzKt9yywPnNmFsgXTwXfrCcoysF2XkBBcb3ZwS3cXr4CLgzx508cqzAaWM4u8DcpIOPCZ/PsAj1jPAZKEYLY8/1s3m8JLxQWcDVatsHp2wW74PnsP8ggqvIl8LhFCm8NfqKi9brjRMrEvCTRxeund9w4ZTYeKtvQlfoD/J3vjD2BN1asnBKDLyNSbcGjRZejkQBGfjAA691MRHAKRF4G+N2FSpD574UcXjr3rqMFv/hsYwM/KEARQJOEeAtjJoGFAbPX+7jhC3kvfeGFgjAS4OY8HoP0xhwSgh+dtYwdQbPoth5vbD+UwkvIAO/LyC3hPd9D6GocPB/8HjBFp7B936FL8wtsBJcgW7KwSncT96e9lDXFp9G5lMBlSf+4jRuARXV1gC3MeHHd+6ltwqcEnrN+woYEQWunQMUGwl48LwiE8GGDRQ4y0Mb8TE0ywJRcMFBSzZCPCVY4P1vPopGvy7g4JH/MxrfXao5WgtOicRT/AUUvBvycaLxbe4E4JRYeIqvwOzSKAs+4eC4e2IGlz1aCBIbTwkWEF3bzvjgUU9kyUjhKcECoke+fuW8h85uo+1k4RRp/DxWH6ausAL8F4qjH/8XTlkNT7GGaJyyAvQkvnMKlHF4Gf3mn0RWx1OsEZqGW6DYKW0MTlkPT7HHaFdVBnZG/M+ipLI+nuI9jG0ITkkGP4+FYeMjzN50I3BKgvjNZ4dPKzt8WnnDeOAf8bM6Aqkm1qoAAAAASUVORK5CYII=';
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
      
    }

    const pdfDefinition: any = {

      content: [
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
          text: [
            { text: 'Nombre Estudiante: ', style: 'header', bold: true, fontSize: 12, color: 'black' },
            `${estudiante?.nombresApellidos}`,
          ]
        },
        '\n',
        {
          columns: [
            {
              text: [
                { text: 'Edad: ', style: 'header', bold: true, fontSize: 12 },
                `${this.calcularEdad(estudiante?.fechaNacimiento)}`,
              ]
            },
            {
              text: [
                { text: 'Fecha de Nacimiento: ', style: 'header', bold: true, fontSize: 12 },
                `${estudiante?.fechaNacimiento}`,
              ]
            },
          ]
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
              ['Pregunta','Respuesta','imagen'],
              ['Apoyo Académico (R.I.N) ',`${entrevista.pregunta1}`, array[0]],
              ['Evaluaciones continuas', `${entrevista.pregunta2}`, array[0]],
              ['Talleres y conferencias virtuales con psicólogos de amplia trayectoria',`${entrevista.pregunta3}`, array[0]],
              ['Certificado', `${entrevista.pregunta4}`],
              ['¿Asiste a escuela o colegio bilingüe? ', `${entrevista.pregunta5}`, array[0]],
              ['¿En casa alguien habla inglés?', `${entrevista.pregunta6}`, array[0]],
              ['¿Ha estudiando inglés anteriormente?',`${entrevista.pregunta7}`, array[0]],
              ['¿Tiene algún problema de aprendizaje?', `${entrevista.pregunta8}`, array[0]],
              ['¿Por qué ha decidido estudiar inglés?', `${entrevista.pregunta8}`, array[0]],
            ]
          }
        },
        '\n',

      ]

    }

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();

  }




}
