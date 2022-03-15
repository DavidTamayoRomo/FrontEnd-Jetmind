import { Component, OnInit } from '@angular/core';
import { CitaTelemarketing } from '../citaTelemarketing.model';
import { CitasTelemarketingService } from '../../services/citas-telemarketing.service';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { PersonaService } from '../../persona/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styles: [
  ]
})
export class ListaCitasComponent implements OnInit {

  public cargando: boolean = false;
  public citas: any[] = [];
  public totalCitas: number = 0;
  public desde: number = 0;
  public citas1: CitaTelemarketing[] = [];
  public citasTemporales: CitaTelemarketing[] = [];
  public mostraModal: boolean = true;
  public atributostablaCita: any = {};
  public citaSeleccionado: any;


  public dropdownListPersona: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public persona: any = [];

  constructor(
    private citasTelemarketingService: CitasTelemarketingService,
    private busquedaService: BusquedasService,
    private personaService: PersonaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarCitas();

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

  controlCalidad(){
    this.router.navigate([`/control-calidad-telemarketing/nuevo/${this.citaSeleccionado._id}`]);
  }

  recuperarDatosPersonas() {
    //TODO: Para cada marca cambia los datos y para cada ciudad || obtener los datos de las persona loggeada = Datos se obtiene de (this.personaService.persona)
    //Obtener el id del role Director
    //Obtener el id de la marca
    //Obtener el id de ciudad
    console.log(this.personaService.persona);

    this.personaService.getAllByRoleCiudadMarca("617c24f29f60c044346e3ff8","613a389282cbc52ac8a87a13","613a53447f51e7211092c8de").subscribe((resp: any) => {
      let nombrePersona: any = [];
      resp.data.forEach((element: any) => {
        nombrePersona.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersona = nombrePersona;
    });
  }

  cargarCitas() {
    this.cargando = true;
    this.citasTelemarketingService.cargarCitasTelemarketing(this.desde).subscribe((resp: any) => {
      console.log(resp);
      this.cargando = false;
      this.citas = resp.data;
      this.citas1 = resp.data;
      this.citasTemporales = resp.data;
      this.totalCitas = resp.totalCitas;
    });
  }

  paginar(valor: number) {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;

    } else if (this.desde > this.totalCitas) {
      this.desde -= valor;
    }
    this.cargarCitas();
  }



  buscar(busqueda: any) {
    if (busqueda.length === 0) {
      return this.citas = this.citasTemporales;
    }
    return this.busquedaService.buscar2('citas', busqueda, ['nombreApellidoRepresentante']).subscribe(
      (resp: any) => {
        console.log(resp);
        this.citas = resp;
      }
    );
  }

  borrarCita(cita: any) {

    Swal.fire({
      title: 'Desea eliminar la cita ?',
      text: `Esta a punto de borrar a ${cita.nombreApellidoRepresentante}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar esta cita'
    }).then((result) => {
      if (result.isConfirmed) {
        this.citasTelemarketingService.eliminartelemarketing(cita).subscribe(resp => {
          this.cargarCitas();
          Swal.fire(
            'Borrado!',
            `${cita.nombreApellidoRepresentante} a sido eliminada con éxito.`,
            'success'
          )
        });
      }
    })
  }


  cerrarModal() {
    this.mostraModal = true;
  }

  mostrarDatosModal(cita: any) {
    this.mostraModal = false;
    this.citaSeleccionado = cita;

    //transformar fecha a formato dd/mm/yyyy HH:mm
    let fecha = new Date(cita.fechaCita);
    let fechacitaString;
    if (fecha.getMinutes()<10) {
      fechacitaString = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":0" + fecha.getMinutes();
    }else{
      fechacitaString = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
    }
    



    this.atributostablaCita = {
      'nombreAtributos': ['Estado', 'Telemercadista', 'Fecha cita', 'Fomra', 'Asesor asignado'
        , 'Programa', 'Observaciones', 'Representante', 'Telefono', 'Ciudad', 'Actividad Economica', 'Tarjeta de credito',
        'Tarjeta', 'Direccion Cita', 'Sucursal', 'Zoom', 'Fecha', 'Observaciones Asesor', 'Correo', 'Codigo Lead'],

      'idAtributos': [cita?.estado, cita?.addedUser?.nombresApellidos, fechacitaString, cita?.forma, cita?.asignado[0]?.nombresApellidos
        , cita?.idMarca?.map((resp: any) => resp.nombre), cita?.observaciones, cita?.nombreApellidoRepresentante, cita?.telefono, cita?.ciudad, cita?.actividadEconomica, cita?.tarjeraCredito
        , cita?.tarjeta, cita?.terreno, cita?.idSucursal[0]?.nombre, cita?.zoom, cita?.fecha, cita?.observacionesAsesor, cita?.email, cita?.codigoLead]
    };



  }


    /** Persona */
  /** Item Seleccionado */
  onItemSelectpersona(item: any) {
    this.persona=item;
    //actualizar Cita telemarketing
    this.citaSeleccionado.asignado = this.persona;
    this.citasTelemarketingService.updateCitasTelemarketing(this.citaSeleccionado._id, this.citaSeleccionado).subscribe(resp=>{
      this.cargarCitas();
      Swal.fire(
        'Actualizado!',
        `Asido actualizado con éxito.`,
        'success'
      )
    });

  }
  /** Todos los items Seleccionados */

  onSelectAllpersona(items: any) {
    this.persona = items;
    

  }
  /** Deselccionar item */
  findByItemIdIndexpersona(id: any) {
    return this.persona.findIndex((resp: any) => {
      return resp.item_id === id;
    });
  }
  onDeSelectpersona(item: any) {
    /** Borrar elemento del array  */
    this.persona = [];
    this.citasTelemarketingService.updateCitasTelemarketing(this.citaSeleccionado._id, this.citaSeleccionado).subscribe(resp=>{
      this.cargarCitas();
      Swal.fire(
        'Actualizado!',
        `Asido actualizado con éxito.`,
        'success'
      )
    });
  }
  /** Deselccionar todos los items */
  onDeSelectAllpersona(items: any) {
    this.persona = items;
    console.log(this.persona);
  }


  actualizarAsignado(cita:CitaTelemarketing){
    this.citaSeleccionado = cita;
    console.log(this.citaSeleccionado);
  }



}
