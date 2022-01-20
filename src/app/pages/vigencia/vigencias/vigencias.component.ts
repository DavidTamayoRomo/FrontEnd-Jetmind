import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { VigenciaService } from '../../services/vigencia.service';
import { Vigencia } from '../vigencia.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vigencias',
  templateUrl: './vigencias.component.html',
  styles: [
  ]
})
export class VigenciasComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public dateNow = new Date();
  public dDay = new Date('Jan 01 2023 00:00:00');

  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute = 60;

  public timeDifference: any;
  public secondsToDday: any;
  public minutesToDday: any;
  public hoursToDday: any;
  public daysToDday: any;

  public cargando: boolean = false;
  public vigencias: any[] = [];
  public totalVigencias: number = 0;
  public desde: number = 0;
  public vigencias1: Vigencia[] = [];
  public vigenciasTemporales: Vigencia[] = [];



  constructor(
    private vigenciaService: VigenciaService,
    private busquedaService: BusquedasService
  ) { }

  ngOnInit(): void {

    this.cargarVigencias();

    this.vigenciaService.getAllVigencias().subscribe((resp: any) => {
      this.dDay = new Date(resp.data[0].fechaCierre);
    });
    this.subscription = interval(1000)
      .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  cargarVigencias() {
    this.cargando = true;
    this.vigenciaService.cargarVigencias(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.vigencias = resp.data;
      this.vigencias1 = resp.data;
      this.vigenciasTemporales = resp.data;
      this.totalVigencias = resp.totalVigencias;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalVigencias) {
      this.desde -= valor;
    }
    this.cargarVigencias();
  }

  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.vigencias = this.vigenciasTemporales;
    }
    return this.busquedaService.buscar2('vigencias', busqueda,['nombre']).subscribe(
      (resp: any) => {
        this.vigencias = resp;
      }
    );
  }

  borrarVigencia(vigencia: any) {

    Swal.fire({
      title: 'Desea eliminar la vigencia ?',
      text: `Esta a punto de borrar`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta marca'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vigenciaService.eliminarVigencia(vigencia).subscribe(resp => {
          this.cargarVigencias();
          Swal.fire(
            'Borrado!',
            `A sido eliminada con éxito.`,
            'success'
          )
        });

      }
    })
  }


  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: any) {
    this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
    this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
    this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }






}
