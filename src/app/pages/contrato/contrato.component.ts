import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';
import {
  NgWizardConfig,
  NgWizardService,
  StepChangedArgs,
  StepValidationArgs,
  STEP_STATE,
  THEME,
} from 'ng-wizard';
import { FormBuilder } from '@angular/forms';
import { RepresentanteService } from '../services/representante.service';
import { ModalUploadService } from '../../services/modal-upload.service';
import Swal from 'sweetalert2';
import { EstudianteService } from '../services/estudiante.service';
import { ContratoService } from '../services/contrato.service';
import { FacturarService } from '../services/facturar.service';
import { ProgramaService } from '../services/programa.service';
import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenComponent } from '../../components/modal-imagen/modal-imagen.component';



@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styles: [],
})
export class ContratoComponent implements OnInit {
  
  
  
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: 'Terminar',
          class: 'btn btn-info',
          event: () => {
            //construir JSON para enviar al BackEnd
            this.crearObjeto();
            //Para limpiar local storage
            //this.limpiarLocalStorage();

          },
        },
      ],
    },
  };

  public executeNextRepresentante: boolean | any;
  public executeBackRepresentante: boolean | any;
  public executeNextEstudiante: boolean | any;
  public executeBackEstudiante: boolean | any;
  public executeNextContrato: boolean | any;
  public executeBackContrato: boolean | any;
  public executeNextFacturacion: boolean | any;
  public executeBackFacturacion: boolean | any;

  step: any;
  dataRepresentante: any;
  dataEstudiante: any;
  dataContrato: any;
  dataFacturacion: any;

  public tablaEstudiantes: any;

  constructor(
    private ngWizardService: NgWizardService,
    private fb: FormBuilder,
    private representanteService: RepresentanteService,
    private estudianteService: EstudianteService,
    private contratoService: ContratoService,
    private programaSercice: ProgramaService,
    private facturacionService: FacturarService,
    private modalImagenServices: ModalUploadService,
    private fileuploadService: FileUploadService
  ) {

    }

  ngOnInit(): void {
    this.llenarTablaEstudiantes();

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
      
  }

  public registerForm = this.fb.group({
    fecha: [null],
    estado: [null],
    idRepresentante: [null],
    tipoPago: [null],
    estadoVenta: [null],
    abono: [null],
    valorMatricula: [null],
    valorTotal: [null],
    numeroCuotas: [null],
    formaPago: [null],
    comentario: [null],
    directorAsignado: [null],
    estadoPrograma: [null],
    fechaAprobacion: [null],
  });

  crearObjeto() {

    let representante = JSON.parse(localStorage.getItem('representanteContrato') as string);
    let estudiantes = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);
    let facturacion = JSON.parse(localStorage.getItem('facturacionContrato') as string);
    let contrato = JSON.parse(localStorage.getItem('contrato') as string);
    let voucher = JSON.parse(localStorage.getItem('files') as string);

    let objeto = {
      representante,
      estudiantes,
      facturacion,
      contrato,
      voucher
    }



    //Este metodo esta creado para guardar el objecto creado en el local storage
    //de las tablas representante, estudiante, contrato y facturacion
    //crea representante

    //TODO: Controlar cuando el representante ya exista en la base de datos (Porque si existe va a dar error)
    this.representanteService.crearRepresentante(representante).subscribe((resp: any) => {
      console.log(resp);
      console.log("Representante creado creado");
      estudiantes.forEach((objetoEstudiantePrograma: any) => {
        Object.assign(objetoEstudiantePrograma.estudiante, { idRepresentante: [resp.data._id] });
        setTimeout(() => {
          //crea estudiate
          this.estudianteService.crearEstudiante(objetoEstudiantePrograma.estudiante).subscribe((resp: any) => {
            console.log(resp);
            console.log("Estudiante creado");
            //crear el Programa del estudiante

            let ciudad: any = [];
            objetoEstudiantePrograma.programa.idCiudad.forEach((element: any) => {
              ciudad.push(element.item_id);
            });
            let marca: any = [];
            objetoEstudiantePrograma.programa.idMarca.forEach((element: any) => {
              marca.push(element.item_id);
            });
            let nombrePrograma: any = [];
            objetoEstudiantePrograma.programa.idNombrePrograma.forEach((element: any) => {
              nombrePrograma.push(element.item_id);
            });
            let sucursal: any = [];
            objetoEstudiantePrograma.programa.idSucursal.forEach((element: any) => {
              sucursal.push(element.item_id);
            });

            Object.assign(objetoEstudiantePrograma.programa,
              { idEstudiante: [resp.data._id], idCiudad: ciudad, idMarca: marca, idNombrePrograma: nombrePrograma, idSucursal: sucursal });

            setTimeout(() => {
              //Crear el programa
              this.programaSercice.crearPrograma(objetoEstudiantePrograma.programa).subscribe((resp: any) => {
                console.log(resp);
                console.log("Programa creado");
              });
            }, 900);

          });
        }, 900);

      });

      //Crear contrato
      Object.assign(contrato, { idRepresentante: resp.data._id });
      this.contratoService.crearContrato(contrato).subscribe((resp: any) => {
        console.log(resp);
        console.log("Contrato creado");
        //subir imagenes al contrato
        this.fileuploadService.actualizarFoto(voucher, 'contratos', 'voucher', resp.data._id).then((resp: any) => {
          console.log(resp);
        });
        //Crear facturacion
        Object.assign(facturacion, { idContrato: resp.data._id });
        this.facturacionService.crearFacturar(facturacion).subscribe((resp: any) => {
          console.log(resp);
          console.log("Contrato facturacion");
        });
      });

    });

    console.log(objeto);
  }

  //this.ngWizardService.navigateTo('estudiante');//informacion importante --navigateTo-- es para navegar entre los pasos




  editarEstudiante(index: any) {
    console.log(index);
    let objetosEstudiateProgramaCopia = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);
    let estudiante = objetosEstudiateProgramaCopia[index].estudiante;
    let programa = objetosEstudiateProgramaCopia[index].programa;

    //abrir modal
    this.abrirModal();


    
    //this.registerForm.controls.nombresApellidos.setValue('David');
    //this.modalImagenComponent.setRegisterForm(estudiante.nombresApellidos);


    /* this.modalImagenServices.llenarCampos(estudiante.nombresApellidos,estudiante.email,estudiante.cedula,estudiante.telefono,estudiante.fechaNacimiento
      ,estudiante.direccion,estudiante.genero,estudiante.estado,programa.idMarca,programa.idCiudad,programa.idSucursal,programa.idNombrePrograma);  */
  }

  borrarEstudiante(index: any) {

    let objetosEstudiateProgramaCopia = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);

    Swal.fire({
      title: 'Desea eliminar el/la estudiante ?',
      text: `Esta a punto de borrar a ${objetosEstudiateProgramaCopia[index].estudiante.nombresApellidos}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar este estudiante'
    }).then((result) => {
      if (result.isConfirmed) {
        //Borrar elemento de un array
        objetosEstudiateProgramaCopia.splice(index, 1);

        localStorage.setItem('objetosEstudiatePrograma', JSON.stringify(objetosEstudiateProgramaCopia));

        Swal.fire(
          'Borrado!',
          `El estudiante a sido eliminada con éxito.`,
          'success'
        )
        this.llenarTablaEstudiantes();
      }
    })



  }



  crearContrato() { }

  showPreviousStep(event?: Event) {
    // console.log(event);
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    // console.log(event);
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    // console.log(event);
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    this.step = args.step;
  }

  isValidTypeBoolean: boolean = true;

  isValidEnterStepRepresentante(args: StepValidationArgs) {
    this.executeBackRepresentante = true;
    setTimeout(() => {
      this.executeBackRepresentante = false;
    }, 1000);
    return true;
  }

  isValidExitStepRepresentante(args: StepValidationArgs) {
    this.executeNextRepresentante = true;
    setTimeout(() => {
      this.executeNextRepresentante = false;
    }, 1000);
    return true;
  }
  isValidEnterStepEstudiante(args: StepValidationArgs) {
    this.executeBackEstudiante = true;
    setTimeout(() => {
      this.executeBackEstudiante = false;
    }, 1000);
    return true;
  }
  isValidExitStepEstudiante(args: StepValidationArgs) {
    this.executeNextEstudiante = true;
    setTimeout(() => {
      this.executeNextEstudiante = false;
    }, 1000);
    return true;
  }

  isValidEnterStepContrato(args: StepValidationArgs) {
    this.executeBackContrato = true;
    setTimeout(() => {
      this.executeBackContrato = false;
    }, 1000);
    return true;
  }
  isValidExitStepContrato(args: StepValidationArgs) {
    this.executeNextContrato = true;
    setTimeout(() => {
      this.executeNextContrato = false;
    }, 1000);
    return true;
  }

  isValidEnterStepFacturacion(args: StepValidationArgs) {
    this.executeBackFacturacion = true;
    setTimeout(() => {
      this.executeBackFacturacion = false;
    }, 1000);
    return true;
  }
  isValidExitStepFacturacion(args: StepValidationArgs) {
    this.executeNextFacturacion = true;
    setTimeout(() => {
      this.executeNextFacturacion = false;
    }, 1000);
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    // console.log(args);
    return of(true);
  }

  limpiarLocalStorage() {
    localStorage.removeItem('representanteContrato');
    localStorage.removeItem('objetosEstudiatePrograma');
    localStorage.removeItem('facturacionContrato');
    localStorage.removeItem('files');
    localStorage.removeItem('contrato');
  }

  setDataFormRepresentante(event: any) {
    this.dataRepresentante = event;
    localStorage.setItem(
      'representanteContrato',
      JSON.stringify(this.dataRepresentante)
    );
  }

  setDataFormEstudiante(event: any) {
    this.dataEstudiante = event;
    localStorage.setItem(
      'estudianteContrato',
      JSON.stringify(this.dataEstudiante)
    );
  }

  setDataFormContrato(event: any) {
    //TODO> Revizar el guardado de esta funcion
    this.dataContrato = event;
    localStorage.setItem(
      'contrato',
      JSON.stringify(this.dataContrato)
    );
  }

  setDataFormFacturacion(event: any) {
    this.dataFacturacion = event;
    localStorage.setItem(
      'facturacionContrato',
      JSON.stringify(this.dataFacturacion)
    );
  }

  validFormRepresentante(event: any) {
    if (event) {
      setTimeout(() => {
        const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.remove('disabled');
          buttonNext.disabled = false;
        }
      }, 1000);
    } else {
      setTimeout(() => {
        const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          //buttonNext.classList.add('disabled');
          //buttonNext.disabled = true;
        }
      }, 1000);
    }
  }
  validFormEstudiante(event: any) {
    if (event) {
      setTimeout(() => {
        const buttonNext: any =
          document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.remove('disabled');
          buttonNext.disabled = false;
        }
      }, 1000);
    } else {
      setTimeout(() => {
        const buttonNext: any =
          document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          //buttonNext.classList.add('disabled');
          //buttonNext.disabled = true;
        }
      }, 1000);
    }
  }

  validFormContrato(event: any) {
    if (event) {
      setTimeout(() => {
        const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.remove('disabled');
          buttonNext.disabled = false;
        }
      }, 1000);
    } else {
      setTimeout(() => {
        const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          //buttonNext.classList.add('disabled');
          //buttonNext.disabled = true;
        }
      }, 1000);
    }
  }

  validFormFacturacion(event: any) {
    if (event) {
      setTimeout(() => {
        const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.remove('disabled');
          buttonNext.disabled = false;
        }
      }, 1000);
    } else {
      setTimeout(() => {
        const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          //buttonNext.classList.add('disabled');
          //buttonNext.disabled = true;
        }
      }, 1000);
    }
  }


  /* AgregarNuevoEstudiante() {
    const ocultarForm: any =document.getElementsByClassName('tab-pane step-content')[2];
    ocultarForm.hidden = false;
    console.log(ocultarForm);
  } */
  abrirModal() {

    this.modalImagenServices.abrirModal();
  }

  llenarTablaEstudiantes() {
    console.log('llenar tabla');
    let data = localStorage.getItem("objetosEstudiatePrograma") as string;
    this.tablaEstudiantes = JSON.parse(data);

  }

  eventoCargarEstudiante(event: any) {
    if (event) {
      this.llenarTablaEstudiantes();
    }

  }

}
