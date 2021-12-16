import { Component, OnChanges, OnInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
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
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CiudadService } from '../services/ciudad.service';
import { SucursalService } from '../services/sucursal.service';
import { MarcaService } from '../services/marca.service';
import { NombreProgramaService } from '../services/nombre-programa.service';



@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styles: [],
})
export class ContratoComponent implements OnInit {
  
 
  public dropdownListCiudades: any = [];
  public dropdownListSucursales: any = [];
  public dropdownListMarcas: any = [];
  public dropdownListNombreProgramas: any = [];

  public selectedItemsCiudades: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public ciudad: any = [];
  public sucursal: any = [];
  public marca: any = [];
  public nombrePrograma: any = [];
  public programaSeleccionada: any;
  
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
  public mostraModal:boolean = true;

  constructor(
    private ngWizardService: NgWizardService,
    private fb: FormBuilder,
    private representanteService: RepresentanteService,
    private estudianteService: EstudianteService,
    private contratoService: ContratoService,
    private programaSercice: ProgramaService,
    private facturacionService: FacturarService,
    private modalImagenServices: ModalUploadService,
    private fileuploadService: FileUploadService,
    private ciudadService: CiudadService,
    private sucursalService: SucursalService,
    private marcaService: MarcaService,
    private nombreProgramaService: NombreProgramaService
  ) {

    }

  ngOnInit(): void {
    this.llenarTablaEstudiantes();

    /** Servicio que me devuelva las CIUDADES de la base de datos */
    this.recuperarDatosCiudad();
    /** Servicio que me devuelva las SUCURSALES de la base de datos */
    this.recuperarDatosSucursales();
    /** Servicio que me devuelva las MARCAS de la base de datos */
    this.recuperarDatosMarcas();
    /** Servicio que me devuelva las ROLE de la base de datos */
    this.recuperarDatosnombreProgramas();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true
    };

    /* this.selectedItemsCiudades = {
      "item_id": "613a389282cbc52ac8a87a13",
      "nombre": "Quito"
    }; */

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
        /* this.fileuploadService.actualizarVoucher(voucher, resp.data._id).subscribe((resp: any) => {
          console.log(resp);
        }); */
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


  @ViewChild('nombresApellidos') nombresApellidos1: ElementRef;
  @ViewChild('email') email1: ElementRef;
  @ViewChild('cedula') cedula1: ElementRef;
  @ViewChild('telefono') telefono1: ElementRef;
  @ViewChild('fechaNacimiento') fechaNacimiento1: ElementRef;
  @ViewChild('direccion') direccion1: ElementRef;
  @ViewChild('genero') genero1: ElementRef;
  @ViewChild('idCiudad') idCiudad1: ElementRef;
  @ViewChild('idSucursal') idSucursal1: ElementRef;
  @ViewChild('idMarca') idMarca1: ElementRef;
  @ViewChild('idNombrePrograma') idNombrePrograma1: ElementRef;

  editarEstudiante(index: any) {
    console.log(index);
    let objetosEstudiateProgramaCopia = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);
    let estudiante = objetosEstudiateProgramaCopia[index].estudiante;
    let programa = objetosEstudiateProgramaCopia[index].programa;

    //abrir modal
    this.abrirModalEstudiante();
    this.nombresApellidos1.nativeElement.value=estudiante.nombresApellidos;
    this.email1.nativeElement.value=estudiante.email;
    this.cedula1.nativeElement.value=estudiante.cedula;
    this.telefono1.nativeElement.value=estudiante.telefono;
    this.fechaNacimiento1.nativeElement.value=estudiante.fechaNacimiento;
    this.direccion1.nativeElement.value=estudiante.direccion;
    this.genero1.nativeElement.value=estudiante.genero;

    //Guardar en el local storage
    objetosEstudiateProgramaCopia[index]
    
    this.llenarTablaEstudiantes();
    //this.registerForm.controls.nombresApellidos.setValue('David');
    //this.modalImagenComponent.setRegisterForm(estudiante.nombresApellidos);

    localStorage.setItem('indexEdit', index);

  }

  editarEstudianteModal() {
    
    if (localStorage.getItem('indexEdit')) {
      let objetoEstudiante = {nombresApellidos:this.nombresApellidos1.nativeElement.value,email:this.email1.nativeElement.value,
        cedula:this.cedula1.nativeElement.value,telefono:this.telefono1.nativeElement.value,fechaNacimiento:this.fechaNacimiento1.nativeElement.value,direccion:this.direccion1.nativeElement.value,
        genero:this.genero1.nativeElement.value,estado:"Inactivo"};
      
      //TODO: Guardar  el programa  
      
      /* let objetoPrograma = {idMarca:this.idMarca1.nativeElement.value,idCiudad:this.idCiudad1.nativeElement.value,idSucursal:this.idSucursal1.nativeElement.value,
        idNombrePrograma:this.idNombrePrograma1.nativeElement.value}; */
      
      let objetosEstudiateProgramaCopia = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);
      
      objetosEstudiateProgramaCopia[Number(localStorage.getItem('indexEdit'))].estudiante = objetoEstudiante;

      localStorage.setItem('objetosEstudiatePrograma', JSON.stringify(objetosEstudiateProgramaCopia));
      this.llenarTablaEstudiantes();

    }
 
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


  cerrarModalEstudiante(){
    this.mostraModal = true;
  }
  abrirModalEstudiante(){
    this.mostraModal = false;
  }



  /**
   * ===================================================
   *  Multi select dropDown
   * ===================================================
   */
  /** CIUDAD */
  /** Item Seleccionado */
  onItemSelect(item: any) {
    this.ciudad.push(item);
    console.log(this.ciudad);
  }
  /** Todos los items Seleccionados */
  onSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }
  /** Deselccionar item */
  findByItemIdIndexCiudad(id: any) {
    return this.ciudad.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelect(item: any) {
    //verificar esto no se queda asi
    console.log(item);
    console.log("entre");
    if (item.item_id) {
      console.log("entre 1");
      const index = this.findByItemIdIndexCiudad(item.item_id);
      const newArray = (index > -1) ? [
        ...this.ciudad.slice(0, index),
        ...this.ciudad.slice(index + 1)
      ] : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    } else {
      console.log("entre 2");
      const index = this.ciudad.indexOf(item);
      const newArray = (index > -1) ? [
        ...this.ciudad.slice(0, index),
        ...this.ciudad.slice(index + 1)
      ] : this.ciudad;
      this.ciudad = newArray;
      console.log(this.ciudad);
    }
  }


  /**
   * ==========================================================
   * Funciones para recuperar datos de la base de datos
   * ==========================================================
   */

   recuperarDatosCiudad() {
    this.ciudadService.getAllCiudades().subscribe((resp: any) => {
      let nombreciudades: any = [];
      resp.data.forEach((element: any) => {
        nombreciudades.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListCiudades = nombreciudades;
    });
  }
  recuperarDatosSucursales() {
    this.sucursalService.getAllSucursales().subscribe((resp: any) => {
      let nombreSucursal: any = [];
      resp.data.forEach((element: any) => {
        nombreSucursal.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListSucursales = nombreSucursal;
    });
  }
  recuperarDatosMarcas() {
    this.marcaService.getAllMarcas().subscribe((resp: any) => {
      let nombremarcas: any = [];
      resp.data.forEach((element: any) => {
        nombremarcas.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListMarcas = nombremarcas;

    });
  }
  recuperarDatosnombreProgramas() {
    this.nombreProgramaService.getAllnombrePrograma().subscribe((resp: any) => {
      let nombrePrograma: any = [];
      resp.data.forEach((element: any) => {
        nombrePrograma.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownListNombreProgramas = nombrePrograma;

    });
  }


  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.ciudad = items;
    console.log(this.ciudad);
  }

  /** SUCRUSAL */
  /** Item Seleccionado */
  onItemSelectsucursal(item: any) {
    this.sucursal.push(item);
    console.log(this.sucursal);
  }
  /** Todos los items Seleccionados */
  onSelectAllsucursal(items: any) {
    this.sucursal = items;
    console.log(this.sucursal);
  }
  /** Deselccionar item */
  findByItemIdIndexSucursal(id: any) {
    return this.sucursal.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectsucursal(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexSucursal(item.item_id);
    const newArray = (index > -1) ? [
      ...this.sucursal.slice(0, index),
      ...this.sucursal.slice(index + 1)
    ] : this.sucursal;
    this.sucursal = newArray;
    console.log(this.sucursal);
  }
  /** Deselccionar todos los items */
  onDeSelectAllsucursal(items: any) {
    this.sucursal = items;
    console.log(this.sucursal);
  }

  /** MARCA */
  /** Item Seleccionado */
  onItemSelectmarca(item: any) {
    this.marca.push(item);
    console.log(this.marca);
  }
  /** Todos los items Seleccionados */
  onSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }
  /** Deselccionar item */
  findByItemIdIndexMarca(id: any) {
    return this.marca.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectmarca(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexMarca(item.item_id);
    const newArray = (index > -1) ? [
      ...this.marca.slice(0, index),
      ...this.marca.slice(index + 1)
    ] : this.marca;
    this.marca = newArray;
    console.log(this.marca);
  }
  /** Deselccionar todos los items */
  onDeSelectAllmarca(items: any) {
    this.marca = items;
    console.log(this.marca);
  }


  /** Nombre Programa */
  /** Item Seleccionado */
  onItemSelectNombrePrograma(item: any) {
    this.nombrePrograma.push(item);
    console.log(this.nombrePrograma);
  }
  /** Todos los items Seleccionados */
  onSelectAllNombrePrograma(items: any) {
    this.nombrePrograma = items;
    console.log(this.nombrePrograma);
  }
  /** Deselccionar item */
  findByItemIdIndexNombrePrograma(id: any) {
    return this.nombrePrograma.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectNombrePrograma(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexNombrePrograma(item.item_id);
    const newArray = (index > -1) ? [
      ...this.nombrePrograma.slice(0, index),
      ...this.nombrePrograma.slice(index + 1)
    ] : this.nombrePrograma;
    this.nombrePrograma = newArray;
    console.log(this.nombrePrograma);
  }
  /** Deselccionar todos los items */
  onDeSelectAllNombrePrograma(items: any) {
    this.nombrePrograma = items;
    console.log(this.nombrePrograma);
  }


}
