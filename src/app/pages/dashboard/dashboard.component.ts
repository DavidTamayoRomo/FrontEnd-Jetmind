import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona/persona.service';
import { Persona } from '../../models/persona.model';
import { CiudadService } from '../services/ciudad.service';
import { MarcaService } from '../services/marca.service';
import { SucursalService } from '../services/sucursal.service';
import { EstudianteService } from '../services/estudiante.service';
import { HorarioService } from '../services/horario.service';
import { AsignarHorariosEstudianteService } from '../services/asignar-horarios-estudiante.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public persona:Persona = new Persona();

  public totalCiudades:number = 0;
  public totalMarcas:number = 0;
  public totalSucursales:number = 0;
  public totalEstudiantesActivos:number = 0;
  public totalEstudiantesCongelado:number = 0;
  public totalEstudiantesIncorporado:number = 0;
  public totalEstudiantesRetirado:number = 0;

  constructor(
    private personaService:PersonaService,
    private ciudadService:CiudadService,
    private marcasService:MarcaService,
    private sucursalService:SucursalService,
    private estudiantesService:EstudianteService,
    private horarioService:HorarioService,
    private asignarHorarioService:AsignarHorariosEstudianteService
    ) { 
    /**Imagen de perfil */
    this.persona = personaService.persona;
  }

  ngOnInit(): void {
    this.ciudadService.getAllCiudades().subscribe((resp:any)=>{
      this.totalCiudades = resp.data.length;
    });
    this.marcasService.getAllMarcas().subscribe((resp:any)=>{
      this.totalMarcas = resp.data.length;
    });
    this.sucursalService.getAllSucursales().subscribe((resp:any)=>{
      this.totalSucursales = resp.data.length;
    });
    let data = {
      "idCiudad":this.persona.idCiudad,
      "idMarca":this.persona.idMarca,
      "estado":"Activo"
    };
    this.estudiantesService.getAllEstudiantesEstado(data).subscribe((resp:any)=>{
      this.totalEstudiantesActivos = resp.data.length;
    });

    let data1 = {
      "idCiudad":this.persona.idCiudad,
      "idMarca":this.persona.idMarca,
      "estado":"Congelado"
    };
    this.estudiantesService.getAllEstudiantesEstado(data1).subscribe((resp:any)=>{
      this.totalEstudiantesCongelado = resp.data.length; 
    });
    let data2 = {
      "idCiudad":this.persona.idCiudad,
      "idMarca":this.persona.idMarca,
      "estado":"Incorporado"
    };
    this.estudiantesService.getAllEstudiantesEstado(data2).subscribe((resp:any)=>{
      this.totalEstudiantesIncorporado = resp.data.length; 
    });
    let data3 = {
      "idCiudad":this.persona.idCiudad,
      "idMarca":this.persona.idMarca,
      "estado":"Retirado"
    };
    this.estudiantesService.getAllEstudiantesEstado(data3).subscribe((resp:any)=>{
      this.totalEstudiantesRetirado = resp.data.length; 
    });
  }

}
