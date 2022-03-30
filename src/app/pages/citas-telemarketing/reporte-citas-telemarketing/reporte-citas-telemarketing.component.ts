import { Component, OnInit } from '@angular/core';
import { CitasTelemarketingService } from '../../services/citas-telemarketing.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reporte-citas-telemarketing',
  templateUrl: './reporte-citas-telemarketing.component.html',
  styles: [
  ]
})
export class ReporteCitasTelemarketingComponent implements OnInit {

  public personas:any=[];
  public citasTelemarketing:any=[];
  public datos:any;
  

  public fechaInicio:Date= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0);
  public fechaFin:Date= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59);

  public registerForm = this.fb.group({
    rangoFechas: [null],
  });

  constructor(
    private citasTelemarketingService: CitasTelemarketingService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.citasbyDate();
  }

  citasbyDate(){
    this.citasTelemarketingService.citasTelemarketingByDateGroup({fechainicio:this.fechaInicio, fechafin:this.fechaFin}).subscribe((resp:any)=>{
      console.log(resp);
      this.datos = resp.data;
    });
  }

  valorRangoFechas(){
    //obtener el valor de rangoFechas
    let rangoFechas = this.registerForm.get('rangoFechas').value;
    let separarFecha = rangoFechas.split(' to ');
    this.fechaInicio = new Date(separarFecha[0]);
    this.fechaFin = new Date(separarFecha[1]);
    this.citasTelemarketingService.citasTelemarketingByDateGroup({fechainicio:this.fechaInicio, fechafin:this.fechaFin}).subscribe((resp:any)=>{
      console.log(resp);
      this.datos = resp.data;
    });
  }



}
