import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VerificacionService } from '../../services/verificacion.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styles: [
  ]
})
export class ReporteComponent implements OnInit {

  public fechaInicio: Date = new Date(2022, 3, 1, 0, 0);
  public fechaFin: Date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59);

  public data:any;
  public totalPagado:number=0;
  public totalNoPagado:number=0;

  constructor(
    private verificacionService: VerificacionService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.obtenerReporteVentasContrato();
  }
  
  public registerForm = this.fb.group({
    rangoFechas: [null],
  });


  obtenerReporteVentasContrato() {
    let datos = { fechainicio: this.fechaInicio, fechafin: this.fechaFin };
    this.obtenerDatosBusqueda(datos);
  }

  valorRangoFechas() {
    //obtener el valor de rangoFechas
    let rangoFechas = this.registerForm.get('rangoFechas').value;
    let separarFecha = rangoFechas.split(' to ');
    this.fechaInicio = new Date(separarFecha[0]);
    this.fechaFin = new Date(separarFecha[1]);
    
    let datos = {
      fechainicio: this.fechaInicio,
      fechafin: this.fechaFin
    }
    this.obtenerDatosBusqueda(datos);
  }


  obtenerDatosBusqueda(datos:any){
    this.verificacionService.reporteVerificacion(datos).subscribe((resp: any) => {
      console.log(resp);
      this.data = resp.data;
      resp.data.map((item:any)=>{
        item.datos.map((resp:any)=>{
          if (resp.cobranza.estado == 'Pagado') {
            this.totalPagado = this.totalPagado + Number(resp.cobranza.valor);
            this.totalPagado =  Math.round(this.totalPagado * 100)/100;
          }
          if (resp.cobranza.estado == 'No pagado') {
            this.totalNoPagado = this.totalNoPagado + Number(resp.cobranza.valor);
            this.totalNoPagado =  Math.round(this.totalNoPagado * 100)/100;
          }
        });
      });

    });
  }

}
