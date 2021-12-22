import { Component, OnInit } from '@angular/core';
import { Contrato } from '../../contrato-form/contrato.model';
import { ContratoService } from '../../services/contrato.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import Swal from 'sweetalert2';
import { PersonaService } from '../../persona/persona.service';
import { ModalUploadService } from '../../../services/modal-upload.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styles: [
  ]
})
export class ContratosComponent implements OnInit {

  public cargando: boolean = false;
  public contratos: any[] = [];
  public totalcontratos: number = 0;
  public desde: number = 0;
  public contratos1: Contrato[] = [];
  public contratosTemporales: Contrato[] = [];
  public contratoSeleccionado: any ;

  public contratos2: any[] = [];

  public dropdownListContratos: any = [];
  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};

  public mostraModal: boolean = true;


  public atributostablaContrato: any = {};

  constructor(
    private contratoService: ContratoService,
    private busquedaService: BusquedasService,
    private personaService: PersonaService,
    private modalImagenServices: ModalUploadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarContratos();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.recuperarAtributosContratos();
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

      return this.busquedaService.buscar2('contratos', busqueda, listaCamposBusqueda).subscribe(
        (resp: any) => {
          console.log(resp);
          this.contratos = resp;
        }
      );

    } else {
      console.log('Entre a menos de 0');
      return this.busquedaService.buscar2('contratos', busqueda, []).subscribe(
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
      {
        item_id: 'idRepresentante',
        nombre: 'Representante'
      }
    ];
    this.dropdownListContratos = contratos;

  }


  /** CONTRATO */
  /** Item Seleccionado */
  onItemSelectContrato(item: any) {
    this.contratos2.push(item);
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


  mostrarDatosModal(contrato: any) {
    console.log('Modal contrato ',contrato);
    this.mostraModal = false;
    this.contratoSeleccionado = contrato;
    

    this.atributostablaContrato = {
      'nombreAtributos': ['Estado', 'Persona Responsable', 'Fecha contrato', 'Codigo', 'Representante'
        , 'Cedula Representante', 'Asesor', 'Valor Ingresado', 'Valor Total', 'Forma de pago', 'Fecha Aprobacion', 'Observaciones'],

      'idAtributos': [contrato.estado, contrato.personaAprueba?.nombresApellidos, contrato.fecha, contrato.codigo
        , contrato.idRepresentante?.nombresApellidos, contrato.idRepresentante?.cedula, contrato.addedUser?.nombresApellidos, contrato.valorTotal
        , contrato.valorTotal, contrato.formaPago,
        , contrato.fechaAprobacion, contrato.comentario]
    };

  }

  editarContrato(){
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


}
