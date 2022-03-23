import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ContratoService } from '../../services/contrato.service';
import { EstudianteService } from '../../services/estudiante.service';
import { MarcaService } from '../../services/marca.service';
import { ProgramaService } from '../../services/programa.service';
import { RepresentanteService } from '../../services/representante.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte-contrato',
  templateUrl: './reporte-contrato.component.html',
  styles: [
  ]
})
export class ReporteContratoComponent implements OnInit {

  public configuracionPorcentaje: number = 1.15;

  public contrato: any;
  public representante: any;
  public estudiantes: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contratoService: ContratoService,
    private representanteService: RepresentanteService,
    private estudiantesService: EstudianteService,
    private programaService: ProgramaService,
    private marcaService: MarcaService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarDatos(id);
    });
  }

  cargarDatos(idContrato: any) {


    this.contratoService.obtenerContratoById(idContrato).subscribe((resp: any) => {
      this.contrato = resp.data;
      this.representanteService.obtenerRepresentanteById(resp.data.idRepresentante).subscribe((resp: any) => {
        this.representante = resp.data;
        this.estudiantesService.getAllEstudiantesByIdRepresentante(resp.data._id).subscribe((resp: any) => {
          this.estudiantes = resp.data;
          this.createPDF(this.contrato, this.representante, this.estudiantes);
        });

      });

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

  createPDF(contrato: any, representante: any, estudiantes: any) {

    let arrayEstudiantes = [];
    estudiantes.map((element: any) => {

      this.programaService.obtenerProgramaByIdEstudiante(element._id).subscribe((resp: any) => {
        let nombrePorgrama = [];
        let nombreMarca = [];
        resp.data[0].idNombrePrograma.map((progra: any) => {
          console.log(progra);
          nombrePorgrama.push(progra.nombre);
          this.marcaService.obtenerMarcaById(progra.idMarca).subscribe((resp: any) => {

            nombreMarca.push(resp.data.nombre);
            console.log(resp.data.nombre);
          });

        })
        setTimeout(() => {
          arrayEstudiantes.push([element.nombresApellidos, element.cedula, this.calcularEdad(element.fechaNacimiento), `${nombreMarca}`, `${nombrePorgrama}`]);
        }, 600);

      });
    });

    let matricula = 0;
    if (contrato.valorMatricula == undefined) {
      matricula = 0;
    }else{
      matricula = contrato.valorMatricula;
    }
    
    let cuotas = 0;
    let valorMensual = 0;
    if (contrato.valorMatricula == undefined) {
      cuotas = 0;
      
    }else{
      cuotas = contrato.numeroCuotas;
      valorMensual = (( contrato.valorTotal  * this.configuracionPorcentaje) - matricula) / cuotas;
    }

    

    setTimeout(() => {
      const pdfDefinition: any = {

        content: [
          {
            columns: [
              {
                text: 'Contrato Digital'
              },
              /* {
                image: this.imagenJetmind,
                width: 200,
                alignment: 'center',
              }, */
              {
                text: 'CÓDIGO: ' + contrato.codigo,
                bold: true,
                fontSize: 12
              }
            ]
          },
          '\n\n',
          {
            text: `En la ciudad de Quito, Distrito Metropolitano, en la fecha ${contrato.fecha}, comparecen a la celebración del presente Contrato de Prestación de Servicios por una parte la Compañía ILVEM Y CHARLOTTE, la misma que está legalmente constituida en la República del Ecuador`
          },
          '\n\n',
          {
            text: `DATOS TITULAR DEL CONTRATO`
          },
          '\n\n',
          {
            style: 'tableExample',
            table: {
              body: [
                ['Nombre', representante.nombresApellidos],
                ['Cedula', representante.cedula],
                ['Telefono', representante.telefono],
                ['Telefono Domicilio', representante.telefonoDomicilio],
                ['Direccion', representante.direccion],
                ['Email', representante.email],
              ]
            }
          },
          '\n\n',
          {
            text: `DATOS ESTUDIANTES DEL CONTRATO`
          },
          '\n\n',
          {
            style: 'tableExample',
            table: {
              body: [
                ['Estudiante', 'Cedula', 'Edad', 'Marca', 'Programas Adquiridos'],
                ...arrayEstudiantes
              ]
            }
          },
          '\n\n',
          {
            text: `OBSERVACIONES DEL CONTRATO`
          },
          '\n\n',
          {
            text: contrato.comentario,
          },
          '\n\n',
          {
            text: 'Asesor comercial: ' + contrato.addedUser.nombresApellidos,
          },
          '\n\n',
          {
            text: `Toda promoción aplica restricciones, para que una beca se mantenga vigente, es requisito obligatorio que el(los) estudiantes principal(es) se encuentren en estado activo, es decir; que estén recibiendo normalmente el entrenamiento`
          },

          '\n\n',
          {
            text: `DATOS ECONOMICOS DEL CONTRATO`
          },
          '\n\n',
          {
            style: 'tableExample',
            table: {
              body: [
                ['Forma de pago', contrato.formaPago],
                ['Valor Total', '$ '+contrato.valorTotal],
                ['Valor Matricula', '$ '+matricula],
                ['Numero de cuotas', cuotas],
                ['Valor Mensual', '$ '+valorMensual] 
              ]
            }
          },



        ]


      }

      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    }, 1000);


  }




  public imagenJetmind: any = '';


}
