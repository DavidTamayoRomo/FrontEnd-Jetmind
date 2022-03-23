import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ContratoService } from '../../services/contrato.service';
import { EstudianteService } from '../../services/estudiante.service';
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

  public contrato: any;
  public representante: any;
  public estudiantes: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contratoService: ContratoService,
    private representanteService: RepresentanteService,
    private estudiantesService: EstudianteService,
    private programaService: ProgramaService
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
    //console.log(programa);
    //console.log(programa[0].idNombrePrograma[0].nombre);
    let arrayEstudiantes = [];
    estudiantes.map((element: any) => {

      this.programaService.obtenerProgramaByIdEstudiante(element._id).subscribe((resp: any) => {
        let nombrePorgrama = [];
        resp.data[0].idNombrePrograma.map((progra:any)=>{
          nombrePorgrama.push(progra.nombre);
        })
        arrayEstudiantes.push([element.nombresApellidos, element.cedula, element.email, this.calcularEdad(element.fechaNacimiento), `${nombrePorgrama}`]);
      });
    });

    setTimeout(() => {
      const pdfDefinition: any = {

        content: [
          '\n\n',
          {
            style: 'tableExample',
            table: {
              body: [
                ['Estudiante', 'Cedula', 'Email', 'Edad', 'Programa'],
                ...arrayEstudiantes
              ]
            }
          },

        ]

      }

      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    }, 500);


  }

}
