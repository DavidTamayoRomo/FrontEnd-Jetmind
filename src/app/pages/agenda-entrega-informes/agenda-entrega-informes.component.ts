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
import { map } from 'rxjs/operators';
import { FormBuilder, FormArray } from '@angular/forms';
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
  selector: 'app-agenda-entrega-informes',
  templateUrl: './agenda-entrega-informes.component.html',
  styles: [
  ]
})
export class AgendaEntregaInformesComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
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

  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: `Esta es una prueba`,
      color: colors.blue,
    }
  ];

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
      /* console.log('Evento', event);
      let idCita = event.id?.toString();
      this.citasTelemarketingService.obtenerCitasTelemarketingById( idCita ).subscribe(
        (resp: any) => {
          this.mostrarDatosModal(resp.data);   
        }
      ); */
    }




  }

  addEvent(index:number): void {
    console.log('index', index);
    console.log(this.registerForm1.get('agenda')?.value[index].fechaInicio);
    console.log(this.registerForm1.get('agenda')?.value[index].fechaFin);
    console.log(this.registerForm1.get('agenda')?.value);
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: new Date (this.registerForm1.get('agenda')?.value[index].fechaInicio),
        end: new Date(this.registerForm1.get('agenda')?.value[index].fechaFin) ,
        color: colors.red,
        draggable: false,
        resizable: {
          beforeStart: false,
          afterEnd: false,
        },
      },
    ]; 
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




  public registerForm1 = this.fb.group({
    
    agenda: this.fb.array([
      this.fb.group({
        fechaInicio: [null],
        fechaFin: [null],
        idEstudiante: [null],
      })
    ])

  });

  get getAgendas() {
    return this.registerForm1.get('agenda') as FormArray;
  }


  agregarAgenda() {
    const agendaForm = <FormArray>this.registerForm1.controls['agenda'];
    agendaForm.push(this.fb.group(
      {
        idEstudainte: [null],
        nombreEstudiante: [null],
        idDocente: [null],
        idHorario: [null],
      }
    ));
  }

  eliminarCamposArray(index: number) {
    const pruebaForm = <FormArray>this.registerForm1.controls['agenda'];
    pruebaForm.removeAt(index);
  }

}
