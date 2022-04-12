import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificacionService } from '../services/verificacion.service';
import { RepresentanteService } from '../services/representante.service';
import { EstudianteService } from '../services/estudiante.service';
import { ContratoService } from '../services/contrato.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-verificacion',
  templateUrl: './verificacion.component.html',
  styles: [
  ]
})
export class VerificacionComponent implements OnInit {

  verificacionesSeleccionadas: any;
  estudiantes: any;
  repesentante: any;
  contrato: any;
  indexG: number;
  public totalPagado:any;
  public totalDeuda:any;

  public mostraModal: boolean = true;
  public mostraModal2: boolean = true;

  @ViewChild('numeroComprobante') numeroComprobante: ElementRef;
  @ViewChild('estado') estado: ElementRef;
  @ViewChild('fechaPago') fechaPago: ElementRef;
  
  @ViewChild('numeroComprobante1') numeroComprobante1: ElementRef;
  @ViewChild('fechaPago1') fechaPago1: ElementRef;
  @ViewChild('valor1') valor1: ElementRef;

  public abonos1:any;
  public sumaAbono:any;

  constructor(
    private verificacionService: VerificacionService,
    private contratoService:ContratoService,
    private representanteService:RepresentanteService,
    private estudianteService:EstudianteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarVerificacionbyId(id);
    });
  }

  cargarVerificacionbyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.verificacionService.obtenerVerificacionById(id)
      .subscribe((resp: any) => {
        this.verificacionesSeleccionadas = resp.data;
        console.log(resp.data);
        let pagado=0;
        let deuda=0;
        resp.data.cobranza.map((item:any)=>{
          console.log(item);
          if (item.estado =="Pagado") {

            pagado+=(Number(item.valor));
          }
          if (item.estado =="No pagado") {
            deuda+=(Number(item.valor)); //TODO:redondear
          }
            
        });
        this.totalPagado=pagado;
        this.totalDeuda=deuda.toFixed(2);
        this.representanteService.obtenerRepresentanteById(this.verificacionesSeleccionadas.idContrato[0].idRepresentante)
          .subscribe((resp: any) => {
            console.log(resp.data);
            this.repesentante = resp.data;
            
          });
      });

  }

  cerrarModal() {
    this.mostraModal = true;
    
  }

  abrirModalEsatdoPago(index:any){
    this.mostraModal = false;
    this.indexG = index;

  }

  agregarEstado() {
    this.verificacionesSeleccionadas.cobranza[this.indexG].numeroComprobante = this.numeroComprobante.nativeElement.value;
    this.verificacionesSeleccionadas.cobranza[this.indexG].estado = this.estado.nativeElement.value;
    this.verificacionesSeleccionadas.cobranza[this.indexG].fechaPago = this.fechaPago.nativeElement.value;
    this.verificacionService.updateVerificacion(this.verificacionesSeleccionadas._id, this.verificacionesSeleccionadas).subscribe((resp: any) => {
      this.cerrarModal();
      this.cargarVerificacionbyId(this.verificacionesSeleccionadas._id);
    }
    );
  }

  agregarAbono(){
    let fecha = this.fechaPago1.nativeElement.value;
    let valor = this.valor1.nativeElement.value;
    let comprobante = this.numeroComprobante1.nativeElement.value;
    this.verificacionesSeleccionadas.cobranza[this.indexG].abono.push({'fecha':fecha,'valor':valor,'numeroComprobante':comprobante});
    this.verificacionService.updateVerificacion(this.verificacionesSeleccionadas._id, this.verificacionesSeleccionadas).subscribe((resp: any) => {
      this.cerrarModal2();
      this.cargarVerificacionbyId(this.verificacionesSeleccionadas._id);
    }
    );
    
  }

  cerrarModal2() {
    this.mostraModal2 = true;
    
  }

  abrirModalAbono(index:any){
    this.mostraModal2 = false;
    this.indexG = index;
    let suma=0;
    this.abonos1 = this.verificacionesSeleccionadas.cobranza[this.indexG].abono;
    this.abonos1.map((item:any)=>{
      suma=suma+Number(item.valor);
    });
    this.sumaAbono = suma;
  }

}
