import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona.service';
import { PersonaInterface } from '../../../interfaces/persona.interface';
import { Persona } from 'src/app/models/persona.model';
import { environment } from 'src/environments/environment';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../../services/modal-upload.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

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
  public mostraModal: boolean = true;
  public personaSeleccionado: any;

  public atributostablaPersona: any = {};

  constructor(private personaService:PersonaService, 
    private busquedaService:BusquedasService, 
    private modalImagenServices: ModalUploadService,
    private router:Router
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
    return this.busquedaService.buscar2('personas',busqueda,['nombre']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.personas = resp;
      }
    );
  }

  borrarUsuario(usuario:any){
    this.cerrarModal();
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

  cerrarModal() {
    this.mostraModal = true;
  }

  editarPersona(){
    //navegar a editar contrato
    this.router.navigate(['/persona/', this.personaSeleccionado._id]);
  }

  mostrarDatosModal(persona: any) {
    this.mostraModal = false;
    this.personaSeleccionado = persona;
    
    let ciudades = persona.idCiudad.map((ciudad:any) => ciudad.nombre);
    let sucursales = persona.idSucursal.map((sucursal:any) => sucursal.nombre);
    let marcas = persona.idMarca.map((marca:any) => marca.nombre);
    let roles = persona.tipo.map((role:any) => role.nombre);
    this.atributostablaPersona = {
      'nombreAtributos': ['Estado', 'Role', 'Ciudades', 'Sucursales ', 'Marcas '
        , 'Nombres y Apellidos', 'Email address', 'Cedula', 'Telefono', 'Telefono Domicilio', 'Fecha Nacimiento', 
        'Direccion','Genero','Ingreso  empresa ','Numero Cuenta'],

      'idAtributos': [persona?.estado,roles,ciudades,sucursales,
        marcas,persona?.nombresApellidos,persona?.email,persona?.cedula,
        persona?.telefono,persona?.telefonoDomicilio,persona?.fechaNacimiento,persona?.direccion,persona?.genero,persona?.fechaIngresoEmpresa,
        persona?.numeroCuenta]
    };

  }

}

