import { Component, OnInit } from '@angular/core';
import { FacturarService } from '../../services/facturar.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { Facturar } from '../facturar.model';
import { ContratoService } from '../../services/contrato.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: [
  ]
})
export class FacturasComponent implements OnInit {

  public facturas: any[] = [];
  public totalFacturas: number = 0;
  public desde: number = 0;
  public facturas1: Facturar[] = [];
  public facturasTemporales: Facturar[] = [];
  public imagen: any = [];
  public cargando: boolean = false;
  public mostraModal: boolean = true;


  public atributostablaEstudiante: any;

  imageObject: Array<object> = [

  ];

  constructor(
    private facturarService: FacturarService,
    private contratoService: ContratoService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.cargarFacturas();
  }

  //lista de facturas completa
  cargarFacturas() {
    this.cargando = true;
    this.facturarService.cargarFacturar(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.facturas = resp.data;
      this.facturas1 = resp.data;
      this.facturasTemporales = resp.data;
      this.totalFacturas = resp.totalFacturas;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalFacturas) {
      this.desde -= valor;
    }
    this.cargarFacturas();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.facturas = this.facturasTemporales;
    }
    return this.busquedaService.buscar2('facturas', busqueda, ['nombre']).subscribe(
      (resp: any) => {
        console.log(resp);
        this.facturas = resp;
      }
    );
  }

  borrarFactura(factura: any) {

    Swal.fire({
      title: 'Desea eliminar la Factura ?',
      text: `Esta a punto de borrar a ${factura.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta factura'
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturarService.eliminarFacturar(factura).subscribe(resp => {
          this.cargarFacturas();
          Swal.fire(
            'Borrado!',
            `${factura.nombre} a sido eliminada con éxito.`,
            'success'
          )
        });

      }
    })
  }

  cerrarModal() {
    this.mostraModal = true;
  }


  actualizarEstado(factura: any) {
    if (factura.estado) {
      factura.estado = false;
    } else {
      factura.estado = true;
    }
    this.facturarService.updateFacturar(factura._id, factura).subscribe(resp => {
      Swal.fire(
        'Actualizado!',
        `Actualizado con éxito.`,
        'success'
      )
    });
  }


  mostrarDatosModal(factura: any) {
    this.mostraModal = false;

    this.imageObject = [];
    if (factura?.idContrato?.voucher.length < 1) {
      this.imageObject.push({
        image: ``,
        thumbImage: ``,
        title: 'Voucher'
      });;
    } else {
      console.log('voucher');
      factura?.idContrato?.voucher.map((resp: any) => {
        this.imageObject.push({
          image: `${environment.base_url}/utils/getDigitalOCean/${resp}`,
          thumbImage: `${environment.base_url}/utils/getDigitalOCean/${resp}`,
          title: 'Voucher'
        });
      });

      this.atributostablaEstudiante = {
        'nombreAtributos': ['Estado', 'Contrato', 'Razon social', 'Cedula', 'Total '],
        'idAtributos': [factura?.estado, factura?.idContrato?.codigo, factura?.nombre, factura?.cedula_ruc,
        factura?.total]
      };

    }
  }

}
