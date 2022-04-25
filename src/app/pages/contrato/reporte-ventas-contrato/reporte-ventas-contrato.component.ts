import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from '../../persona/persona.service';
import { CampaniaService } from '../../services/campania.service';
import { ContratoService } from '../../services/contrato.service';

@Component({
  selector: 'app-reporte-ventas-contrato',
  templateUrl: './reporte-ventas-contrato.component.html',
  styles: [
  ]
})
export class ReporteVentasContratoComponent implements OnInit {

  public datos: any;
  public datosModal: any;

  public fechaInicio: Date = new Date(2021, 1, 1, 0, 0);
  public fechaFin: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59);
  public TipoPago: any = [];
  public EstadoVenta: any = [];

  public sumaTotal: any = 0;
  public sumaMatriculas: any = 0;

  public persona: any = [];

  public dropdownSettings: IDropdownSettings = {};
  public dropdownListTipoPago: any = [];
  public dropdownListEstadoVenta: any = [];

  public dropdownListPersonas: any = [];
  public selectedItems: any = [];

  public dropdownList: any = [];
  public campania: any;

  public mostraModal: boolean = true;

  constructor(
    private constratoService: ContratoService,
    private personaService: PersonaService,
    private campaniaService: CampaniaService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.obtenerReporteVentasContrato();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownListTipoPago = [
      { item_id: 'Plan', nombre: 'Plan' },
      { item_id: 'Contado', nombre: 'Contado' },
    ]
    this.dropdownListEstadoVenta = [
      { item_id: 'OK', nombre: 'OK' },
      { item_id: 'Abono', nombre: 'Abono' },
      { item_id: 'Saldo', nombre: 'Saldo' },
    ]

    this.recuperarDatosPersonas();
    this.recuperarDatosCampania();

  }

  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
    });
  }

  recuperarDatosCampania() {
    this.campaniaService.getAllCampanias().subscribe((resp: any) => {
      let nombreCampanias: any = [];
      resp.data.forEach((element: any) => {
        nombreCampanias.push({ item_id: element._id, nombre: element.nombre });
      });
      this.dropdownList = nombreCampanias;
      
    });
  }


  public registerForm = this.fb.group({
    rangoFechas: [null],
    idTipoPago: [null],
    idEstadoVenta: [null],
    asesor: [null],
    campania: [null],
  });

  obtenerReporteVentasContrato() {
    this.sumaTotal = 0;
    this.sumaMatriculas = 0;

    this.constratoService.reporteVentascontrato({ fechainicio: this.fechaInicio, fechafin: this.fechaFin }).subscribe((resp: any) => {
      console.log(resp);

      this.datos = resp.data;
      resp.data.map((resp: any) => {
        this.sumaTotal += resp.montoAsesortotal;
        this.sumaMatriculas += resp.montoAsesorMatriculas;
      })
    });
  }

  valorRangoFechas() {
    this.sumaTotal = 0;
    this.sumaMatriculas = 0;
    
    //obtener el valor de rangoFechas
    let rangoFechas = this.registerForm.get('rangoFechas').value;
    let separarFecha = rangoFechas.split(' to ');
    this.fechaInicio = new Date(separarFecha[0]);
    this.fechaFin = new Date(separarFecha[1]);

    let tipopago: any = [];
    this.TipoPago.map((resp: any) => {
      tipopago.push(resp.nombre);
    });
    let estadoventa: any = [];
    this.EstadoVenta.map((resp: any) => {
      estadoventa.push(resp.nombre);
    });
    let asesor: any = [];
    this.persona.map((resp: any) => {
      asesor.push(resp.item_id);
    });
    let campania: any = [];
    this.campania.map((resp: any) => {
      campania.push(resp.item_id);
    });
    let datos = {
      fechainicio: this.fechaInicio,
      fechafin: this.fechaFin,
      TipoPago: tipopago,
      EstadoVenta: estadoventa,
      asesor,
      campania
    }
    this.constratoService.reporteVentascontrato(datos).subscribe((resp: any) => {
      this.datos = resp.data;
      resp.data.map((resp: any) => {
        this.sumaTotal += resp.montoAsesortotal;
        this.sumaMatriculas += resp.montoAsesorMatriculas;
      })
    });
  }


  detalle(data: any) {
    this.abrirModal();
    console.log(data);
    this.datosModal = data;
  }

  abrirModal() {
    this.mostraModal = false;

  }

  cerrarModal() {
    this.mostraModal = true;
  }




  /** TipoPago */
  /** Item Seleccionado */
  onItemSelectTipoPago(item: any) {
    this.TipoPago.push(item);
    console.log(this.TipoPago);
  }
  /** Todos los items Seleccionados */
  onSelectAllTipoPago(items: any) {
    this.TipoPago = items;
    console.log(this.TipoPago);
  }
  /** Deselccionar item */
  findByItemIdIndexTipoPago(id: any) {
    return this.TipoPago.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectTipoPago(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexTipoPago(item.item_id);
    const newArray = (index > -1) ? [
      ...this.TipoPago.slice(0, index),
      ...this.TipoPago.slice(index + 1)
    ] : this.TipoPago;
    this.TipoPago = newArray;
    console.log(this.TipoPago);
  }
  /** Deselccionar todos los items */
  onDeSelectAllTipoPago(items: any) {
    this.TipoPago = items;
    console.log(this.TipoPago);
  }


  /** EstadoVenta */
  /** Item Seleccionado */
  onItemSelectEstadoVenta(item: any) {
    this.EstadoVenta.push(item);
    console.log(this.EstadoVenta);
  }
  /** Todos los items Seleccionados */
  onSelectAllEstadoVenta(items: any) {
    this.EstadoVenta = items;
    console.log(this.EstadoVenta);
  }
  /** Deselccionar item */
  findByItemIdIndexEstadoVenta(id: any) {
    return this.EstadoVenta.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectEstadoVenta(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexEstadoVenta(item.item_id);
    const newArray = (index > -1) ? [
      ...this.EstadoVenta.slice(0, index),
      ...this.EstadoVenta.slice(index + 1)
    ] : this.EstadoVenta;
    this.EstadoVenta = newArray;
    console.log(this.EstadoVenta);
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstadoVenta(items: any) {
    this.EstadoVenta = items;
    console.log(this.EstadoVenta);
  }

  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona.push(item);
    console.log(this.persona);
  }
  /** Todos los items Seleccionados */
  onSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }
  /** Deselccionar item */
  findByItemIdIndexPersona(id: any) {
    return this.persona.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectPersona(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexPersona(item.item_id);
    const newArray = (index > -1) ? [
      ...this.persona.slice(0, index),
      ...this.persona.slice(index + 1)
    ] : this.persona;
    this.persona = newArray;
    console.log(this.persona);
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }



  /**  */
  /** Item Seleccionado */
  onItemSelect(item: any) {
    this.campania = [item];
    console.log(this.campania);
  }
  /** Todos los items Seleccionados */
  onSelectAll(items: any) {
    this.campania = items;
    console.log(this.campania);
  }
  /** Deselccionar item */

  onDeSelect(item: any) {
    /** Borrar elemento del array  */
    this.campania = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAll(items: any) {
    this.campania = items;
  }


}
