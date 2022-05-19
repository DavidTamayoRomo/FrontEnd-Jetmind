import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalUploadService } from 'src/app/services/modal-upload.service';
import { environment } from 'src/environments/environment';
import { Contrato } from '../../contrato-form/contrato.model';
import { PersonaService } from '../../persona/persona.service';
import { ContratoService } from '../../services/contrato.service';
import { EstudianteService } from '../../services/estudiante.service';
import { RepresentanteService } from '../../services/representante.service';
import { VerificacionService } from '../../services/verificacion.service';
import { Verificacion } from '../../verificacion/verificacion.model';
import { FileUploadService } from 'src/app/services/file-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-asesor',
  templateUrl: './vista-asesor.component.html',
  styles: [
  ]
})
export class VistaAsesorComponent implements OnInit {
  public cargando: boolean = false;
  public contratos: any[] = [];
  public totalcontratos: number = 0;
  public desde: number = 0;
  public contratos1: Contrato[] = [];
  public contratosTemporales: Contrato[] = [];
  public contratoSeleccionado: any;

  public deuda: number = 0;
  public configuracionPorcentaje: number = 1.15;

  public contratos2: any[] = [];

  public dropdownListContratos: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public mostraModal: boolean = true;
  public mostraModalAbono: boolean = true;
  public mostraModalEditarAbono: boolean = true;
  public mostraModalVoucher: boolean = true;

  public totalAbonosPagados: number = 0;
  public totalAbonosDeuda: number = 0;
  public totalAbonos: number = 0;
  public deudaMatricula: number = 0;


  public atributostablaContrato: any = {};

  public datosEstudiantes: any = [];
  public datosRepresentante: any;
  
  public imagenes: any;

  public verificacion: Verificacion = new Verificacion();

  @ViewChild('fechaAbono') fechaAbono: ElementRef;
  @ViewChild('montoAbono') montoAbono: ElementRef;
  @ViewChild('estadoAbono') estadoAbono: ElementRef;
  @ViewChild('fechaAcuerdoVerificacion') fechaAcuerdoVerificacion: ElementRef;
  constructor(
    private contratoService: ContratoService,
    private busquedaService: BusquedasService,
    private personaService: PersonaService,
    private modalImagenServices: ModalUploadService,
    private representanteService: RepresentanteService,
    private estudianteService: EstudianteService,
    private verificacionService: VerificacionService,
    private fileuploadService:FileUploadService,
    private router: Router,
    public _location: Location
  ) { }

  ngOnInit(): void {
    this.cargarContratos();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.recuperarAtributosContratos();
  }

  imagenesContrato(e:Array<File>){
    console.log('IMAGENES: ',e);
    this.imagenes = e;
  }

  cargarContratos() {
    this.cargando = true;
    this.contratoService.cargarContratos(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.contratos = resp.data;
      this.contratos1 = resp.data;
      this.contratosTemporales = resp.data;
      this.totalcontratos = resp.totalContratos;
      console.log(this.contratos);
    });
  }

  imageObject: Array<object> = [

  ];

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalcontratos) {
      this.desde -= valor;
    }
    this.cargarContratos();
  }

  buscar(busqueda: any) {

    /* if (this.contratos2.length>0) {
        
    }  */

    if (busqueda.length === 0) {
      return this.contratos = this.contratosTemporales;
    }
    console.log(this.dropdownListContratos);
    if (this.contratos2.length > 0) {
      console.log('Entre a mas de 0');
      let listaCamposBusqueda: any = [];
      this.contratos2.forEach((element: any) => {
        listaCamposBusqueda.push(element.item_id);
      });
      console.log(listaCamposBusqueda);

      return this.busquedaService.buscar2('contratosBusqueda', busqueda, listaCamposBusqueda).subscribe(
        (resp: any) => {
          console.log(resp);
          this.contratos = resp;
        }
      );
    } else {
      console.log('Entre a menos de 0');
      return this.busquedaService.buscar2('contratosBusqueda', busqueda, ["codigo"]).subscribe(
        (resp: any) => {
          console.log(resp);
          this.contratos = resp;
        }
      );
    }



  }

  cambiarEstadoContrato(contrato: any) {

  }



  recuperarAtributosContratos() {
    let contratos: any = [
      {
        item_id: 'codigo',
        nombre: 'Codigo de contrato'
      },
      {
        item_id: 'estado',
        nombre: 'Estado'
      },
      /*{
        item_id: 'idRepresentante',
        nombre: 'Representante'
      } */
    ];
    this.dropdownListContratos = contratos;

  }


  /** CONTRATO */
  /** Item Seleccionado */
  onItemSelectContrato(item: any) {
    this.contratos2 = [item];
    console.log(this.contratos2);
  }
  /** Todos los items Seleccionados */
  onSelectAllContrato(items: any) {
    this.contratos2 = items;
    console.log(this.contratos2);
  }
  /** Deselccionar item */
  findByItemIdIndexContrato(id: any) {
    return this.contratos2.findIndex((resp: any) => {
      return resp.item_id === id;
    });
  }
  onDeSelectContrato(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexContrato(item.item_id);
    const newArray =
      index > -1
        ? [
          ...this.contratos2.slice(0, index),
          ...this.contratos2.slice(index + 1),
        ]
        : this.contratos2;
    this.contratos2 = newArray;
    console.log(this.contratos2);
  }
  /** Deselccionar todos los items */
  onDeSelectAllContrato(items: any) {
    this.contratos2 = items;
    console.log(this.contratos2);
  }

  pea17chuk() {
    this.router.navigate(['/peea-17-ch-uk/nuevo/', this.contratoSeleccionado._id]);
  }
  pea18chuk() {
    this.router.navigate(['/peea-18-ch-uk/nuevo/', this.contratoSeleccionado._id]);
  }
  pea17il() {
    this.router.navigate(['/peea-17-ilvem/nuevo/', this.contratoSeleccionado._id]);
  }
  pea18il() {
    this.router.navigate(['/peea-18-ilvem/nuevo/', this.contratoSeleccionado._id]);
  }
  pea17tm() {
    this.router.navigate(['/peea-17-tomatis/nuevo/', this.contratoSeleccionado._id]);
  }
  pea18tm() {
    this.router.navigate(['/peea-18-tomatis/nuevo/', this.contratoSeleccionado._id]);
  }


  generarPDF() {

    this.router.navigate(['/reporte-contrato/', this.contratoSeleccionado._id]);
    setTimeout(() => {
      this.router.navigate(['/asignardirector']);
    }, 10);
  }



  mostrarDatosModal(contrato: any) {
    //console.log('Modal contrato ', contrato);
    this.mostraModal = false;
    this.contratoSeleccionado = contrato;
    this.imageObject = [];
    console.log('este es el q impr', this.contratoSeleccionado?.voucher);
    if (this.contratoSeleccionado?.voucher.length < 1) {
      console.log('no hay voucher');
      this.imageObject.push({
        image: ``,
        thumbImage: ``,
        title: 'Voucher'
      });;
    } else {
      console.log('voucher');
      this.contratoSeleccionado?.voucher.map((resp: any) => {
        this.imageObject.push({
          image: `${environment.base_url}/utils/getDigitalOCean/${resp}`,
          thumbImage: `${environment.base_url}/utils/getDigitalOCean/${resp}`,
          title: 'Voucher'
        });
      });
    }




    this.atributostablaContrato = {
      'nombreAtributos': ['Estado', 'Persona Responsable', 'Fecha contrato', 'Codigo', 'Representante'
        , 'Cedula Representante', 'Asesor', 'Valor Ingresado', 'Valor Total', 'Forma de pago', 'Fecha Aprobacion', 'Observaciones'],

      'idAtributos': [contrato.estado, contrato.personaAprueba?.nombresApellidos, contrato.fecha, contrato.codigo
        , contrato.idRepresentante?.nombresApellidos, contrato.idRepresentante?.cedula, contrato.addedUser?.nombresApellidos, contrato.valorTotal
        , contrato.valorTotal, contrato.formaPago,
        , contrato.fechaAprobacion, contrato.comentario]
    };
    //console.log(contrato.idRepresentante?._id);

    this.representanteService.obtenerRepresentanteById(contrato.idRepresentante?._id).subscribe((resp: any) => {
      this.datosRepresentante = resp.data;
      //console.log(resp.data);
    });

    this.estudianteService.getAllEstudiantesByIdRepresentante(contrato.idRepresentante?._id).subscribe((resp: any) => {
      this.datosEstudiantes = resp.data;
      //console.log(resp.data);
    });

  }

  editarRepresentante(representante: any) {
    this.router.navigate(['/representante/', representante._id]);
  }
  editarEstudiante(estudiante: any) {
    this.router.navigate(['/estudiante/', estudiante._id]);
  }

  editarContrato() {
    //navegar a editar contrato
    this.router.navigate(['/contrato1/', this.contratoSeleccionado._id]);
    /* this.contratoService.updatecontrato(this.contratoSeleccionado).subscribe(
      (resp: any) => {
        this.cargarContratos();
      }
    ); */
  }

  cerrarModal() {
    this.mostraModal = true;
  }
  cerrarModalAbono() {
    this.mostraModalAbono = true;
  }
  cerrarModalEditarAbono() {
    this.mostraModalEditarAbono = true;
  }
  cerrarModalVoucher() {
    this.mostraModalVoucher = true;
  }

  actualizarEstado(contrato: Contrato, estado: string) {
    contrato.estado = estado;

    //Al APROBAR el contrato
    //TODO: generar pdf y enviar a cada director de la marca involucrada y al representante
    //Activar representante (Listo desde el backend)
    //Activar Estudiantes (Listo desde el backend)
    //Fecha 1989-12-31 es porque desde el backend creo con esa fecha 
    if (contrato.fechaAprobacion?.toString() == '1989-12-31' && estado == 'Aprobado') {
      //Actualizar fecha fecha en la que se aprueba el contrato
      contrato.fechaAprobacion = new Date();
      //persona que aprueba el contrato
      contrato.personaAprueba = this.personaService.persona?._id;
    }

    setTimeout(() => {

      this.contratoService.updatecontrato(contrato._id!, contrato).subscribe((resp: any) => {
        this.cargarContratos();
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
          icon: 'success',
          title: 'Se actualizo correctamente'
        })
      });
    }, 400);

  }



  abrirModalAbono(contrato: any) {
    this.mostraModalAbono = false;
    this.contratoSeleccionado = contrato;
  }

  abrirModalEditarAbono(contrato: any) {
    this.mostraModalEditarAbono = false;
    this.contratoSeleccionado = contrato;
    //sumar el total de abonos
    this.totalAbonosPagados = 0;
    this.totalAbonosDeuda = 0;
    this.totalAbonos = 0;

    this.contratoSeleccionado.abono.forEach((element: any) => {
      if (element.estado == 'Pagado') {
        this.totalAbonosPagados += parseFloat(element.monto);
      }
      if (element.estado == 'No pagado') {
        this.totalAbonosDeuda += parseFloat(element.monto);
      }
      this.totalAbonos += parseFloat(element.monto);
      if (this.contratoSeleccionado.valorMatricula == 0) {
        this.deudaMatricula = 0;
      } else {
        /**
        *  Si el numero de abonos supera el valor de la matricula, el valor de total del abono
        *  se convierte en el valor de la matricula
        */
        this.deudaMatricula = parseFloat(this.contratoSeleccionado.valorMatricula) - this.totalAbonosPagados;

        if (this.deudaMatricula < 0) {
          this.contratoSeleccionado.valorMatricula = this.contratoSeleccionado.valorMatricula + Math.abs(parseFloat(this.contratoSeleccionado.valorMatricula) - this.totalAbonosPagados);
          this.deudaMatricula = parseFloat(this.contratoSeleccionado.valorMatricula) - this.totalAbonosPagados;
          this.contratoService.updatecontrato(this.contratoSeleccionado._id, this.contratoSeleccionado).subscribe((resp: any) => {
            this.cargarContratos();
          });
        }
      }

    });

  }

  agregarAbono() {
    this.fechaAbono.nativeElement.value;
    console.log(this.fechaAbono.nativeElement.value);
    console.log(this.contratoSeleccionado.abono);
    this.contratoSeleccionado.abono.push({
      fechaPago: this.fechaAbono.nativeElement.value,
      monto: this.montoAbono.nativeElement.value,
      estado: this.estadoAbono.nativeElement.value
    });
    /**
     *  Si el numero de abonos supera el valor de la matricula, el valor de total del abono
     *  se convierte en el valor de la matricula
     */
    this.deudaMatricula = parseFloat(this.contratoSeleccionado.valorMatricula) - this.totalAbonosPagados;
    if (this.deudaMatricula < 0) {
      this.contratoSeleccionado.valorMatricula = this.contratoSeleccionado.valorMatricula + Math.abs(parseFloat(this.contratoSeleccionado.valorMatricula) - this.totalAbonosPagados);
      this.deudaMatricula = parseFloat(this.contratoSeleccionado.valorMatricula) - this.totalAbonosPagados;
    }

    setTimeout(() => {

      this.contratoService.updatecontrato(this.contratoSeleccionado._id!, this.contratoSeleccionado).subscribe((resp: any) => {
        this.cargarContratos();
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
          icon: 'success',
          title: 'Se actualizo correctamente'
        })
      });
    }, 400);

    this.cerrarModalAbono();

  }


  actualizarEstadoAbono(contrato: any, estado: string, indice: number) {

    this.contratoSeleccionado.abono[indice].estado = estado;


    setTimeout(() => {

      this.contratoService.updatecontrato(this.contratoSeleccionado._id!, this.contratoSeleccionado).subscribe((resp: any) => {
        this.cargarContratos();
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
          icon: 'success',
          title: 'Se actualizo correctamente'
        })
      });

    }, 400);

    this.cerrarModalEditarAbono();

  }

  abrirModalVoucher() {
    this.mostraModalVoucher = false;
  }

  crearVoucher() {
    /* let voucher = JSON.parse(localStorage.getItem('files') as string);
    this.contratoSeleccionado.voucher = voucher;
    */

    this.imagenes.map((imagen: any) => {
      this.fileuploadService.actualizarFotoDigitalOCean(imagen,this.contratoSeleccionado._id).then((resp: any) => {
        console.log('RESPUESTA IMAGEN',resp);
        this.router.navigateByUrl("/dashboard", { skipLocationChange: true }).then(() => {
          this.router.navigate([decodeURI(this._location.path())]);
        });
      });
    });
   /*  this.contratoService.updateVouchersContrato2(this.contratoSeleccionado._id, this.contratoSeleccionado).subscribe((resp: any) => {
      console.log(resp);
      //eliminar local storage
      localStorage.removeItem('files');
      //actualizar pagina
      this.router.navigateByUrl("/dashboard", { skipLocationChange: true }).then(() => {
        this.router.navigate([decodeURI(this._location.path())]);
      });

    }); */

  }

  generarCobranza(fecha: any, valorMesual: any, numeroCuotas: number) {
    let objetoCobrabza = [];
    let fecha1 = new Date(fecha);
    //sumar un dia a la fecha
    ;//fecha actual TODO: verificar si pasa siempre 
    for (let index = 0; index < numeroCuotas; index++) {
      if (index == 0) {
        objetoCobrabza.push({
          fechaAcuerdo: new Date(fecha1.setDate(fecha1.getDate())),
          fechaPago: null,
          valor: valorMesual,
          estado: 'No pagado',
          numeroComprobante: null,
        });
      } else {
        objetoCobrabza.push({
          fechaAcuerdo: new Date(fecha1.setMonth(fecha1.getMonth() + 1)),
          fechaPago: null,
          valor: valorMesual,
          estado: 'No pagado',
          numeroComprobante: null,
        });
      }

    }
    return objetoCobrabza;
  }

  calculadora(contrato: any) {
    console.log(contrato);
    let tipoPago = contrato.tipoPago;
    let estadoVenta = contrato.estadoVenta;
    let valorTotal = contrato.valorTotal;
    let abono = contrato.abono;//es un array
    let numeroCuotas = contrato.numeroCuotas;
    let valorMatricula = contrato.valorMatricula;

    //calcular la deuda existente, deuda de contado y plan 
    if (tipoPago == 'Contado') {
      setTimeout(() => {

        if (estadoVenta != 'OK') {
          this.deuda = valorTotal - abono;
        }


      }, 100);

    }
    if (tipoPago == 'Plan') {
      setTimeout(() => {

        if (numeroCuotas != 0) {
          let valorTotal1 = valorTotal;
          let valorMatricula1 = valorMatricula;
          let numeroCuotas1 = numeroCuotas;

          this.deuda = ((valorTotal1 * this.configuracionPorcentaje) - valorMatricula1) / numeroCuotas1;
          this.deuda = Math.round(this.deuda * 100) / 100;


        }
      }, 100);

    }
  }


}
