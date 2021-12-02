import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona.service';
import { PersonaInterface } from '../../../interfaces/persona.interface';
import { Persona } from 'src/app/models/persona.model';
import { environment } from 'src/environments/environment';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../../services/modal-upload.service';

@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styles: [
  ]
})
export class ListaPersonasComponent implements OnInit {

  public personas:any [] = [];
  public totalUsuarios:number=0;
  public desde:number = 0;
  public personas1:Persona [] = [];
  public personasTemporales:Persona [] = [];
  public imagen:any = [];
  public cargando:boolean=false;

  constructor(private personaService:PersonaService, 
    private busquedaService:BusquedasService, 
    private modalImagenServices: ModalUploadService,
    
    ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.cargando=true;
    this.personaService.cargarPersonas(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.personas = resp.data;
      this.personas1 = resp.data;
      this.personasTemporales = resp.data;
      console.log(resp.data);
      this.totalUsuarios = resp.totalUsuarios;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalUsuarios){
      this.desde -= valor;  
    }
    this.cargarUsuarios();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.personas = this.personasTemporales;
    }
    return this.busquedaService.buscar('personas',busqueda).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.personas = resp;
      }
    );
  }

  borrarUsuario(usuario:any){
    if (usuario._id ===  this.personaService.persona._id) {
      Swal.fire(
        'Informacion',
        'No se puede borrar a si mismo',
        'warning'
      )
      return;
    }
    Swal.fire({
      title: 'Desea eliminar la persona ?',
      text: `Esta a punto de borrar a ${usuario.nombresApellidos}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta persona'
    }).then((result) => {
      if (result.isConfirmed) {
        this.personaService.eliminarPersonas(usuario).subscribe(resp => {
          this.cargarUsuarios();
          Swal.fire(
            'Borrado!',
            `${usuario.nombresApellidos} a sido eliminada con éxito.`,
            'success'
          )
        });
        
      }
    })
  }

  abrirModal(usuario:any){
    console.log(usuario);
    this.modalImagenServices.abrirModal();
  }

}
