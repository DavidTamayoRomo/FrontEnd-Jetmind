import { Component, Input, OnInit } from '@angular/core';
import { Estudiante } from '../estudiante.model';
import { EstudianteService } from '../../services/estudiante.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styles: [
  ]
})
export class EstudiantesComponent implements OnInit {

  public estudiantes:any [] = [];
  public totalEstudiantes:number=0;
  public desde:number = 0;
  public estudiantes1:Estudiante [] = [];
  public estudiantesTemporales:Estudiante [] = [];
  public imagen:any = [];
  public cargando:boolean=false;

  public mostraModal: boolean = true;
  public estudianteSeleccionado: Estudiante;
  public atributostablaEstudiante: any = {};

  @Input() idRepresentante:string= '';
  @Input() idEstudiante:string = '';

  constructor(
    private estudianteService:EstudianteService, 
    private busquedaService:BusquedasService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (this.idRepresentante || this.idEstudiante) {
      console.log('idRepresentante',this.idRepresentante);
      this.cargarEstudiantes2();
    }else{
      this.cargarEstudiantes();
    }

    
  }

  //lista de estudiantes completa
  cargarEstudiantes(){
    this.cargando=true;
    this.estudianteService.cargarEstudiantes(this.desde).subscribe((resp:any)=>{
      this.cargando=false;
      this.estudiantes = resp.data;
      this.estudiantes1 = resp.data;
      this.estudiantesTemporales = resp.data;
      this.totalEstudiantes = resp.totalEstudiantes;
    });
  }

  //lista de estudiantes por id de representante
  cargarEstudiantes2(){
    this.cargando=true;
    this.estudianteService.cargarEstudiantes2(this.idEstudiante,this.idRepresentante).subscribe((resp:any)=>{
      this.cargando=false;
      this.estudiantes = resp.data;
      this.estudiantes1 = resp.data;
      this.estudiantesTemporales = resp.data;
      this.totalEstudiantes = resp.totalEstudiantes;
    });
  }

  paginar(valor:number){
    this.desde += valor;

    if (this.desde<0) {
      this.desde = 0;
      
    }else if(this.desde> this.totalEstudiantes){
      this.desde -= valor;  
    }
    this.cargarEstudiantes();
  }

  buscar(busqueda:any){
    if (busqueda.length === 0) {
      return this.estudiantes = this.estudiantesTemporales;
    }
    return this.busquedaService.buscar2('estudiantes',busqueda,['nombresApellidos']).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.estudiantes = resp;
      }
    );
  }

  borrarEstudiante(estudiante:any){
    
    Swal.fire({
      title: 'Desea eliminar la estudiante ?',
      text: `Esta a punto de borrar a ${estudiante.nombresApellidos}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta estudiante'
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteService.eliminarEstudiante(estudiante).subscribe(resp => {
          this.cargarEstudiantes();
          Swal.fire(
            'Borrado!',
            `${estudiante.nombresApellidos} a sido eliminada con éxito.`,
            'success'
          )
        });
        
      }
    })
  }

  cerrarModal() {
    this.mostraModal = true;
  }

  editarEstudiante(){
    //navegar a editar contrato
    this.router.navigate(['/estudiante/', this.estudianteSeleccionado._id]);
  }

  mostrarDatosModal(estudiante: any) {
    this.mostraModal = false;
    this.estudianteSeleccionado = estudiante;
    //TODO: hacer variable global desde el arqchivo configurable (Donde estan las rutas)
    this.atributostablaEstudiante = {
      'nombreAtributos': ['Estado', 'Nombres y Apellidos Estudiante ', 'Nombres y Apellidos Representante ', 'Email address', 'Cedula ', 'Telefono '
       , 'Direccion', 'Genero'],

      'idAtributos': [estudiante?.estado, estudiante?.nombresApellidos, estudiante?.idRepresentante[0]?.nombresApellidos,
       estudiante?.email, estudiante?.cedula, estudiante?.telefono,
        , estudiante?.direccion, estudiante?.genero]
    };

  }

  reporteAsistencia(estudiante: any) {
    this.router.navigate(['/reporte-asistencia-estudiante/', estudiante._id]);
  }

}
