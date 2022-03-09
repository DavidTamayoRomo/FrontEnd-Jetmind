import { Component, OnInit } from '@angular/core';
import { ContratoService } from '../services/contrato.service';
import { BusquedasService } from '../../services/busquedas.service';
import { Router } from '@angular/router';
import { Contrato } from '../contrato-form/contrato.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from '../persona/persona.service';

import Swal from 'sweetalert2';
import { RepresentanteService } from '../services/representante.service';
import { EstudianteService } from '../services/estudiante.service';
import { ProgramaService } from '../services/programa.service';

@Component({
  selector: 'app-contratos-asignar-director',
  templateUrl: './contratos-asignar-director.component.html',
  styles: [
  ]
})
export class ContratosAsignarDirectorComponent implements OnInit {

  public cargando: boolean = false;
  public contratos: any[] = [];
  public totalcontratos: number = 0;
  public desde: number = 0;
  public contratos1: Contrato[] = [];
  public contratosTemporales: Contrato[] = [];
  public contratoSeleccionado: any;
  public contratos2: any[] = [];

  public personaSeleccionada: any;

  public dropdownListPersona: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public persona: any = [];

  public mostraModal: boolean = true;

  public atributostablaContrato: any = {};
  public datosEstudiantes: any = [];
  public datosRepresentante: any;

  constructor(
    private contratoService: ContratoService,
    private busquedaService: BusquedasService,
    private personaService: PersonaService,
    private representanteService: RepresentanteService,
    private estudianteService: EstudianteService,
    private programaService: ProgramaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    /**Cargar los contratos aprobados */
    this.cargarContratos();
    /** Servicio que me devuelva las ROLE de la base de datos */
    this.recuperarDatosPersonas();

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      //itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  cargarContratos() {
    this.cargando = true;
    this.contratoService.cargarContratosAprobados(this.desde).subscribe((resp: any) => {
      this.cargando = false;
      this.contratos = resp.data;
      this.contratos1 = resp.data;
      this.contratosTemporales = resp.data;
      this.totalcontratos = resp.totalContratos;
      console.log(this.contratos);

    });

  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalcontratos) {
      this.desde -= valor;
    }
    this.cargarContratos();
  }

  buscar(busqueda: any) {

    if (busqueda.length === 0) {
      return this.contratos = this.contratosTemporales;
    }else{
      return this.busquedaService.buscar2('contratosAporbados', busqueda, ["codigo"]).subscribe(
        (resp: any) => {
          console.log(resp);
          this.contratos = resp;
        }
      );
    }
    
  }


  recuperarDatosPersonas() {
    //TODO: Para cada marca cambia los datos y para cada ciudad || obtener los datos de las persona loggeada = Datos se obtiene de (this.personaService.persona)
    //Obtener el id del role Director
    //Obtener el id de la marca
    //Obtener el id de ciudad

    console.log(this.personaService.persona);

    //muestra en la lista de personas el Rol(Director general) - Ciudad(Quito) - Marca(Charlotte)
    this.personaService.getAllByRoleCiudadMarca("617c24f99f60c044346e3ffa", "613a389282cbc52ac8a87a13", "613a53447f51e7211092c8de").subscribe((resp: any) => {
      let nombrePersona: any = [];
      resp.data.forEach((element: any) => {
        nombrePersona.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersona = nombrePersona;
    });
    /* this.personaService.getAllPersonas().subscribe((resp: any) => {
      let nombrePersona: any = [];
      resp.data.forEach((element: any) => {
        nombrePersona.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersona = nombrePersona;
    }); */
  }


  enviarContrato(contrato: any) {
    this.contratoSeleccionado = contrato;
  }

  actualizarEstadoPrograma(estado: String, contrato: any) {
    contrato.estadoPrograma = estado;
    this.contratoService.updatecontrato(contrato._id, contrato).subscribe((resp: any) => {
      this.cargarContratos();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Se actualizo correctamente'
      })
    });
  }

  actualizarEstadoEstudiante(estado: String, estudiante: any) {
    estudiante.estado = estado;
    
    this.estudianteService.updateEstudiante(estudiante._id, estudiante).subscribe((resp: any) => {
      //this.cargarContratos();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Se actualizo correctamente'
      })
    });
  }

  /** Persona */
  /** Item Seleccionado */
  onItemSelectpersona(item: any) {
    this.persona.push(item);
    //actualizar el contrata
    this.contratoSeleccionado.directorAsignado = item;
    this.contratoService.updatecontrato(this.contratoSeleccionado._id, this.contratoSeleccionado).subscribe((resp: any) => {
      this.cargarContratos();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Se actualizo correctamente'
      })
    });

  }
  /** Todos los items Seleccionados */
  onSelectAllpersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }
  /** Deselccionar item */
  findByItemIdIndexpersona(id: any) {
    return this.persona.findIndex((resp: any) => {
      return resp.item_id === id;
    });
  }
  onDeSelectpersona(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexpersona(item.item_id);
    const newArray =
      index > -1
        ? [...this.persona.slice(0, index), ...this.persona.slice(index + 1)]
        : this.persona;
    this.persona = newArray;
    console.log(this.persona);
    //actualizar el contrata
    this.contratoSeleccionado.directorAsignado = this.persona;
    this.contratoService.updatecontrato(this.contratoSeleccionado._id, this.contratoSeleccionado).subscribe((resp: any) => {
      this.cargarContratos();
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Se actualizo correctamente'
      })
    });
  }
  /** Deselccionar todos los items */
  onDeSelectAllpersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }

  cerrarModal() {
    this.mostraModal = true;
  }

  mostrarDatosModal(contrato: any) {
    console.log('Modal contrato ', contrato);
    this.mostraModal = false;
    this.contratoSeleccionado = contrato;


    this.atributostablaContrato = {
      'nombreAtributos': ['Estado', 'Persona Responsable', 'Fecha contrato', 'Codigo', 'Representante'
        , 'Cedula Representante', 'Asesor', 'Valor Ingresado', 'Valor Total', 'Forma de pago', 'Fecha Aprobacion', 'Observaciones'],

      'idAtributos': [contrato.estado, contrato.personaAprueba?.nombresApellidos, contrato.fecha, contrato.codigo
        , contrato.idRepresentante?.nombresApellidos, contrato.idRepresentante?.cedula, contrato.addedUser?.nombresApellidos, contrato.valorTotal
        , contrato.valorTotal, contrato.formaPago,
        , contrato.fechaAprobacion, contrato.comentario]
    };
    console.log(contrato.idRepresentante?._id);

    this.representanteService.obtenerRepresentanteById(contrato.idRepresentante?._id).subscribe((resp: any) => {
      this.datosRepresentante = resp.data;
      console.log(resp.data);
    });

    this.estudianteService.getAllEstudiantesByIdRepresentante(contrato.idRepresentante?._id).subscribe((resp: any) => {
      this.datosEstudiantes = resp.data;
      console.log(resp.data);
    });

  }

  editarRepresentante(representante: any) {
    this.router.navigate(['/representante/', representante._id]);
  }

  editarEstudiante(estudiante: any) {
    this.router.navigate(['/estudiante/', estudiante._id]);
  }

  editarProgramaEstudiante(estudiante: any) {
    this.programaService.obtenerProgramaByIdEstudiante(estudiante._id).subscribe((resp: any) => {
      this.router.navigate(['/programa/', resp.data[0]._id]);
    });


  }


  entrevistaInicial(contrato:any){
    this.router.navigate(['/entrevistainicialchuk/nuevo/', contrato._id]);
  }

}
