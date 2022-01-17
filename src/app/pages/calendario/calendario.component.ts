import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitasTelemarketingService } from '../services/citas-telemarketing.service';
import { map } from 'rxjs/operators';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';



const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styles: [
  ]
})
export class CalendarioComponent implements OnInit {

  public citasTelemarketing: any = [];

  public arrayCalendario: any = [];

  public mostraModal: boolean = true;
  public atributostablaCita: any = {};
  public citaSeleccionado: any;
  public idCita: string = "";

  constructor(private modal: NgbModal,
    private citasTelemarketingService: CitasTelemarketingService,

  ) { }


  ngOnInit(): void {

    //TODO: Modificar solo la busqueda a solo las citas del mes que se muestra
    this.citasTelemarketingService.getAllCitasTelemarketing().subscribe(
      (resp: any) => {
        console.log('Respuesta del servicio', resp);
        this.citasTelemarketing = resp.data;
        this.citasTelemarketing.map((item: any) => {
          
          let fecha = new Date(item.fechaCita);
          let fechacitaString;
          if (fecha.getMinutes() < 10) {
            fechacitaString = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":0" + fecha.getMinutes();
          } else {
            fechacitaString = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();
          }

          this.arrayCalendario.push({
            start: new Date(item.fechaCita),
            title: `Representante: ${item?.nombreApellidoRepresentante}  -  Telemercadista: ${item?.addedUser?.nombresApellidos} 
            - Fecha cita: ${fechacitaString}`,
            color: colors.blue,
            id: item._id,
          });
        })

        this.events = this.arrayCalendario;
      }
    );

  }



  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [

  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('Emite elvalor de la fecha en donde se aplasta', date);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    //Muestra los datos del item seleccionado
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });

    if (event) {
      console.log('Evento', event);
      let idCita = event.id?.toString();
      this.citasTelemarketingService.obtenerCitasTelemarketingById( idCita ).subscribe(
        (resp: any) => {
          this.mostrarDatosModal(resp.data);   
        }
      );
    }
   
    


  }

  addEvent(): void {
    /* this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ]; */


  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
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
    if (fecha.getMinutes() < 10) {
      fechacitaString = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":0" + fecha.getMinutes();
    } else {
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


}
