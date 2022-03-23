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
import { FormBuilder, Validators } from '@angular/forms';
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
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';



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
  public estudianteSeleccionado: any;


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
  public mostraModal: boolean = true;

  public contadorEstudiantes: number = 0;

  public ContratoModel: any;

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
    private nombreProgramaService: NombreProgramaService,
    private router: Router
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

  });

  crearObjeto() {

    let representante = JSON.parse(localStorage.getItem('representanteContrato') as string);
    let estudiantes = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);
    let facturacion = JSON.parse(localStorage.getItem('facturacionContrato') as string);
    let contrato = JSON.parse(localStorage.getItem('contrato') as string);
    let voucher = JSON.parse(localStorage.getItem('files') as string);
    let abonolocalStorage = JSON.parse(localStorage.getItem('contratoAbono') as string);

    //Verificar campos vacios de cada objeto

    //representante
    if (representante == null) {
      Swal.fire('Agrege datos del Representante');
    } else
      if (representante.nombresApellidos == null) {
        Swal.fire('Agrege nombres y Apellidos del Representante');
      } else
        if (representante.email == null) {
          Swal.fire('Agrege un correo electronico representante');
        } else
          if (representante.cedula == null) {
            Swal.fire('Agrege una cedula representante');
          } else
            if (representante.telefono == null) {
              Swal.fire('Agrege un telefono representante');
            } else
              if (representante.fechaNacimiento == null) {
                Swal.fire('Agrege una fecha de nacimiento representante');
              } else
                if (estudiantes == null || estudiantes.length == 0) {
                  Swal.fire('Agrege al menos un estudiante');
                } else
                  if (contrato == null) {
                    Swal.fire('Agrege al datos al contrato');
                  } else
                    if (contrato.tipoPago == null) {
                      Swal.fire('Agrege tipo de pago al contrato');
                    } else
                      if (contrato.estadoVenta == null) {
                        Swal.fire('Agrege estado de la venta al contrato');
                      } else
                        if (contrato.valorTotal == null) {
                          Swal.fire('Agrege estado al contrato');
                        } else
                          if (contrato.formaPago == null) {
                            Swal.fire('Agrege forma de pago al contrato');
                          } else
                            if (facturacion == null) {
                              Swal.fire('Agrege datos para la facturacion');
                            } else
                              if (facturacion.nombre == null) {
                                Swal.fire('Agrege Nombre o razon social para la facturacion');
                              } else
                                if (facturacion.cedula_ruc == null) {
                                  Swal.fire('Agrege cedula o ruc para la facturacion');
                                } else
                                  if (facturacion.correo == null) {
                                    Swal.fire('Agrege correo para la facturacion');
                                  }
                                  else {

                                    console.log('Entre al else');

                                    //-------------------------------------------------

                                    let objeto = {
                                      representante,
                                      estudiantes,
                                      facturacion,
                                      contrato,
                                      voucher
                                    }

                                    console.log(objeto);



                                    //Este metodo esta creado para guardar el objecto creado en el local storage
                                    //de las tablas representante, estudiante, contrato y facturacion
                                    //crea representante

                                    //TODO: Controlar cuando el representante ya exista en la base de datos (Porque si existe va a dar error)
                                    this.representanteService.crearRepresentante(representante).subscribe((resp: any) => {
                                      console.log(resp);
                                      console.log("Representante creado creado");
                                      const Toast = Swal.mixin({
                                        toast: true,
                                        position: 'top-end',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                          toast.addEventListener('mouseenter', Swal.stopTimer);
                                          toast.addEventListener('mouseleave', Swal.resumeTimer);
                                        },
                                      });
                                      Toast.fire({
                                        icon: 'success',
                                        title: 'Se creo el representante correctamente',
                                      });
                                      let listaMarcasContratos = [];
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

                                              //ver las marcas q existen en el contrato
                                              listaMarcasContratos.push(element);

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
                                          const Toast = Swal.mixin({
                                            toast: true,
                                            position: 'top-end',
                                            showConfirmButton: false,
                                            timer: 3000,
                                            timerProgressBar: true,
                                            didOpen: (toast) => {
                                              toast.addEventListener('mouseenter', Swal.stopTimer);
                                              toast.addEventListener('mouseleave', Swal.resumeTimer);
                                            },
                                          });
                                          Toast.fire({
                                            icon: 'success',
                                            title: 'Se crearon los estudiantes correctamente',
                                          });
                                        }, 900);



                                      });

                                      //Crear contrato

                                      this.ContratoModel = contrato;


                                      if (abonolocalStorage) {
                                        let objetoAbono = abonolocalStorage;
                                        if (contrato.tipoPago == "Plan" && contrato.estadoVenta == "OK") {
                                          objetoAbono = abonolocalStorage;
                                          this.ContratoModel.valorMatricula = "0";
                                          this.ContratoModel.abono = [];
                                          this.ContratoModel.abono = objetoAbono;
                                        }
                                        if (contrato.tipoPago == "Plan" && contrato.estadoVenta == "Abono") {
                                          objetoAbono = abonolocalStorage;
                                          this.ContratoModel.abono = [];
                                          this.ContratoModel.abono = objetoAbono;
                                        }
                                        if (contrato.tipoPago == "Plan" && contrato.estadoVenta == "Saldo") {
                                          objetoAbono = abonolocalStorage;
                                          this.ContratoModel.abono = [];
                                          this.ContratoModel.abono = objetoAbono;
                                        }
                                        if (contrato.tipoPago == "Contado" && contrato.estadoVenta == "OK") {
                                          objetoAbono = abonolocalStorage;
                                          this.ContratoModel.valorMatricula = "0";
                                          this.ContratoModel.numeroCuotas = "0";
                                          this.ContratoModel.abono = [];
                                          this.ContratoModel.abono = objetoAbono;
                                        }
                                        if (contrato.tipoPago == "Contado" && contrato.estadoVenta == "Abono") {
                                          objetoAbono = abonolocalStorage;
                                          this.ContratoModel.valorMatricula = "0";
                                          this.ContratoModel.numeroCuotas = "0";
                                          this.ContratoModel.abono = [];
                                          this.ContratoModel.abono = objetoAbono;
                                        }
                                        if (contrato.tipoPago == "Contado" && contrato.estadoVenta == "Saldo") {
                                          objetoAbono = abonolocalStorage;
                                          this.ContratoModel.valorMatricula = "0";
                                          this.ContratoModel.numeroCuotas = "0";
                                          this.ContratoModel.abono = [];
                                          this.ContratoModel.abono = objetoAbono;
                                        }
                                      }

                                      Object.assign(this.ContratoModel, { idRepresentante: resp.data._id, fechaAprobacion: "", estadoPrograma: "Cliente no atendido" });

                                      setTimeout(() => {

                                        //lista de marcas que se va a guardar en el contrato (para no repetir las marcas)
                                        let hash = {};
                                        listaMarcasContratos = listaMarcasContratos.filter(o => hash[o.item_id] ? false : hash[o.item_id] = true);
                                        this.ContratoModel.marcasVendidas = listaMarcasContratos;

                                        let respuestaContrato: any;
                                        this.contratoService.crearContrato(this.ContratoModel).subscribe((resp: any) => {
                                          console.log(resp);
                                          console.log("Contrato creado");
                                          //Carga de imagenes al contrato
                                          respuestaContrato = resp.data;
                                          respuestaContrato.voucher = voucher;
                                          this.contratoService.updateVouchersContrato(respuestaContrato._id, respuestaContrato).subscribe((resp: any) => {
                                            console.log(resp);
                                          });

                                          const Toast = Swal.mixin({
                                            toast: true,
                                            position: 'top-end',
                                            showConfirmButton: false,
                                            timer: 3000,
                                            timerProgressBar: true,
                                            didOpen: (toast) => {
                                              toast.addEventListener('mouseenter', Swal.stopTimer);
                                              toast.addEventListener('mouseleave', Swal.resumeTimer);
                                            },
                                          });
                                          Toast.fire({
                                            icon: 'success',
                                            title: 'Se creo el contrato correctamente',
                                          });
                                          //Crear facturacion
                                          /* let programaLista: any = [];
                                          facturacion.programa.forEach((element: any) => {
                                            if (element.item_id) {
                                              programaLista.push(element.item_id);
                                            } else {
                                              programaLista.push(element);
                                            }
                                          }); */
                                          setTimeout(() => {
                                            //Object.assign(facturacion, { idContrato: resp.data._id, programa: programaLista });
                                            Object.assign(facturacion, { idContrato: resp.data._id });
                                            this.facturacionService.crearFacturar(facturacion).subscribe((resp: any) => {
                                              console.log(resp);
                                              console.log("Contrato facturacion");
                                              const Toast = Swal.mixin({
                                                toast: true,
                                                position: 'top-end',
                                                showConfirmButton: false,
                                                timer: 3000,
                                                timerProgressBar: true,
                                                didOpen: (toast) => {
                                                  toast.addEventListener('mouseenter', Swal.stopTimer);
                                                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                                                },
                                              });
                                              Toast.fire({
                                                icon: 'success',
                                                title: 'Se la factura  correctamente',
                                              });
                                              //navegar a lista de contratos
                                              this.router.navigateByUrl('/listacontratos');
                                            });
                                          }, 1000);

                                        });
                                      }, 1000);


                                    });

                                    console.log(objeto);

                                    //Para limpiar local storage
                                    this.limpiarLocalStorage();

                                    //-------------------------------------------------

                                  }
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
    /* this.nombresApellidos1.nativeElement.value = estudiante.nombresApellidos;
    this.email1.nativeElement.value = estudiante.email;
    this.cedula1.nativeElement.value = estudiante.cedula;
    this.telefono1.nativeElement.value = estudiante.telefono;
    this.fechaNacimiento1.nativeElement.value = estudiante.fechaNacimiento;
    this.direccion1.nativeElement.value = estudiante.direccion;
    this.genero1.nativeElement.value = estudiante.genero; */
    this.LlenarFormEstudiante(estudiante, programa);




    /* programa.idMarca.map((r: any) => {
      const findMarca = this.dropdownListMarcas.find(
        (item: any) => item.item_id === r
      );
      if (findMarca) {
        this.onItemSelectmarca(findMarca);
        console.log(findMarca);
        //this.registerForm.get('idRepresentante')?.setValue(this.representante);
      }
    }); */

    //Guardar en el local storage
    objetosEstudiateProgramaCopia[index]

    this.llenarTablaEstudiantes();
    //this.registerForm.controls.nombresApellidos.setValue('David');
    //this.modalImagenComponent.setRegisterForm(estudiante.nombresApellidos);

    localStorage.setItem('indexEdit', index);

  }

  limpiarCamposModalEstudiante() {

    this.registerForm.reset();
    /* this.registerFormEstudiante.get('nombresApellidos')?.setValue('');
    this.registerFormEstudiante.get('email')?.setValue('');
    this.registerFormEstudiante.get('cedula')?.setValue(''); 
    this.registerFormEstudiante.get('telefono')?.setValue(''); 
    this.registerFormEstudiante.get('fechaNacimiento')?.setValue(''); 
    this.registerFormEstudiante.get('direccion')?.setValue(''); 
    this.registerFormEstudiante.get('genero')?.setValue(''); 
    this.registerFormEstudiante.get('idMarca')?.setValue(''); 
    this.registerFormEstudiante.get('idCiudad')?.setValue(''); 
    this.registerFormEstudiante.get('idSucursal')?.setValue(''); 
    this.registerFormEstudiante.get('idNombrePrograma')?.setValue(''); */

  }

  editarEstudianteModal() {

    if (localStorage.getItem('indexEdit')) {
      let objetoEstudiante = {
        nombresApellidos: this.nombresApellidos1.nativeElement.value, email: this.email1.nativeElement.value,
        cedula: this.cedula1.nativeElement.value, telefono: this.telefono1.nativeElement.value, fechaNacimiento: this.fechaNacimiento1.nativeElement.value, direccion: this.direccion1.nativeElement.value,
        genero: this.genero1.nativeElement.value, estado: "Inactivo"
      };

      //TODO: Guardar  el programa  

      /* let objetoPrograma = {idMarca:this.idMarca1.nativeElement.value,idCiudad:this.idCiudad1.nativeElement.value,idSucursal:this.idSucursal1.nativeElement.value,
        idNombrePrograma:this.idNombrePrograma1.nativeElement.value}; */

      let objetosEstudiateProgramaCopia = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);

      objetosEstudiateProgramaCopia[Number(localStorage.getItem('indexEdit'))].estudiante = objetoEstudiante;

      localStorage.setItem('objetosEstudiatePrograma', JSON.stringify(objetosEstudiateProgramaCopia));
      this.llenarTablaEstudiantes();

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: 'success',
        title: 'El estudiante se actualizo correctamente',
      });

    }
    this.limpiarCamposModalEstudiante();
    this.cerrarModalEstudiante();

  }


  editarEstudianteFrom() {
    if (this.registerFormEstudiante.invalid) {
      //Formulario invalido
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'error',
        title: 'Verificar campos invalidos \n Indicados con el color rojo'
      })
      return;

    } else {
      if (localStorage.getItem('indexEdit')) {
        let objetoEstudiante = {
          nombresApellidos: this.registerFormEstudiante.get('nombresApellidos')?.value,
          email: this.registerFormEstudiante.get('email')?.value,
          cedula: this.registerFormEstudiante.get('cedula')?.value,
          telefono: this.registerFormEstudiante.get('telefono')?.value,
          fechaNacimiento: this.registerFormEstudiante.get('fechaNacimiento')?.value,
          direccion: this.registerFormEstudiante.get('direccion')?.value,
          genero: this.registerFormEstudiante.get('genero')?.value,
          estado: "Inactivo"
        };

        let objetoPrograma = {
          idMarca: this.registerFormEstudiante.get('idMarca')?.value,
          idCiudad: this.registerFormEstudiante.get('idCiudad')?.value,
          idSucursal: this.registerFormEstudiante.get('idSucursal')?.value,
          idNombrePrograma: this.registerFormEstudiante.get('idNombrePrograma')?.value
        };

        let objetosEstudiateProgramaCopia = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);

        objetosEstudiateProgramaCopia[Number(localStorage.getItem('indexEdit'))].estudiante = objetoEstudiante;
        objetosEstudiateProgramaCopia[Number(localStorage.getItem('indexEdit'))].programa = objetoPrograma;

        localStorage.setItem('objetosEstudiatePrograma', JSON.stringify(objetosEstudiateProgramaCopia));
        this.llenarTablaEstudiantes();

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'El estudiante se actualizo correctamente',
        });

      }
      this.limpiarCamposModalEstudiante();
      this.cerrarModalEstudiante();
    }

  }

  public registerFormEstudiante = this.fb.group({
    nombresApellidos: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    cedula: [null, Validators.required],
    telefono: [null, Validators.required],
    fechaNacimiento: [null, Validators.required],
    direccion: [null],
    genero: [null, Validators.required],
    estado: ["Espera"],
    idCiudad: [null, Validators.required],
    idSucursal: [null, Validators.required],
    idMarca: [null, Validators.required],
    idNombrePrograma: [null, Validators.required]
  });

  LlenarFormEstudiante(estudiante: any, programa: any) {

    const {
      nombresApellidos,
      email,
      cedula,
      telefono,
      fechaNacimiento,
      direccion,
      genero,
      estado,

    } = estudiante;
    const {
      idCiudad,
      idSucursal,
      idMarca,
      idNombrePrograma
    } = programa;

    this.registerFormEstudiante.setValue({
      nombresApellidos,
      email,
      cedula,
      telefono,
      fechaNacimiento,
      direccion,
      genero,
      estado,
      idCiudad,
      idSucursal,
      idMarca,
      idNombrePrograma
    });
  }

  campoNoValido(campo: any): boolean {
    if (
      this.registerForm.get(campo)?.invalid &&
      (this.registerForm.get(campo)?.dirty ||
        this.registerForm.get(campo)?.touched)
    ) {
      return true;
    } else {
      return false;
    }
  }

  campoNoValido2(campo: any): boolean {
    if (
      this.registerFormEstudiante.get(campo)?.invalid &&
      (this.registerFormEstudiante.get(campo)?.dirty ||
        this.registerFormEstudiante.get(campo)?.touched)
    ) {
      return true;
    } else {
      return false;
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
    console.log(args.step);
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
    localStorage.removeItem('contratoAbono');
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
        /* const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.remove('disabled');
          buttonNext.disabled = false;
        } */
      }, 100);
    } else {
      setTimeout(() => {
        /* const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.add('disabled');
          buttonNext.disabled = true;
        } */
      }, 100);
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
      }, 100);
    } else {
      setTimeout(() => {
        const buttonNext: any =
          document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          //buttonNext.classList.add('disabled');
          //buttonNext.disabled = true;
        }
      }, 100);
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
      }, 100);
    } else {
      setTimeout(() => {
        const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          /* buttonNext.classList.add('disabled');
          buttonNext.disabled = true; */
        }
      }, 100);
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
      }, 100);
    } else {
      setTimeout(() => {
        const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          /* buttonNext.classList.add('disabled');
          buttonNext.disabled = true; */
        }
      }, 100);
    }
  }

  validFormEstudiantes() {

    let contador = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);
    console.log(contador);

    if (contador == null) {
      contador = 0;
      console.log(contador);
    }
    setTimeout(() => {
      if (contador > 0) {
        setTimeout(() => {
          const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
          if (buttonNext) {
            buttonNext.classList.remove('disabled');
            buttonNext.disabled = false;
          }
        }, 100);
      } else {
        setTimeout(() => {
          const buttonNext: any = document.getElementsByClassName('ng-wizard-btn-next')[0];
          if (buttonNext) {
            buttonNext.classList.add('disabled');
            buttonNext.disabled = true;
          }
        }, 100);
      }
    }, 100);

  }


  /* AgregarNuevoEstudiante() {
    const ocultarForm: any =document.getElementsByClassName('tab-pane step-content')[2];
    ocultarForm.hidden = false;
    console.log(ocultarForm);
  } */
  abrirModal() {
    let datos = JSON.parse(localStorage.getItem('objetosEstudiatePrograma') as string);
    let contador;
    if (contador == null) {
      //this.validFormEstudiantes();
    } else {
      contador = datos.length;
      this.contadorEstudiantes = contador;
    }

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


  cerrarModalEstudiante() {
    this.mostraModal = true;
    this.limpiarCamposModalEstudiante();
  }
  abrirModalEstudiante() {
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
