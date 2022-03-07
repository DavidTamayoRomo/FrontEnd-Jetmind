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
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { EstudianteService } from '../services/estudiante.service';
import { PersonaService } from '../persona/persona.service';
import { AgendaEntregaInformesService } from '../services/agenda-entrega-informes.service';
import { Router } from '@angular/router';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

import Swal from 'sweetalert2';

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

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownListEstudiantes: any = [];
  public estudiante: any = [];

  public agendaEntregaInformes: any = [];
  public arrayCalendario: any = [];

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudianteService,
    private personaService: PersonaService,
    private agendaService: AgendaEntregaInformesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
    this.recuperarDatosEstudiantes();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
    this.eliminar();
    this.cargarListaDeAgendaEntregaInformes();
  }




  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [];

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
        console.log('Evento emitido', event);
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

    }


  }

  cargarListaDeAgendaEntregaInformes() {
    //TODO: Cambiar a busqueda solo del mes
    this.agendaService.getAllAgendas().subscribe(
      (resp: any) => {
        console.log('Respuesta del servicio', resp);
        this.agendaEntregaInformes = resp.data;
        this.agendaEntregaInformes.map((item: any) => {

          let fechaInicio = new Date(item.fechaInicio);
          let fechaFin = new Date(item.fechaFin);

          this.agregarAgenda2(
            new Date(item.fechaInicio)
            , new Date(item.fechaFin)
            , item.idEstudiantes
            , item.idDocente
          );

          this.arrayCalendario.push({
            start: new Date(item.fechaInicio),
            end: new Date(item.fechaFin),
            title: `${item.idEstudiantes[0].nombre}`,
            color: colors.blue,
            id: item._id,
          });
        })

        this.events = this.arrayCalendario;
      }
    );
  }

  addEvent(index: number): void {
    this.arrayCalendario.push({
      title: this.registerForm1.get('agenda')?.value[index].idEstudiantes[0].nombre,
      start: new Date(this.registerForm1.get('agenda')?.value[index].fechaInicio),
      end: new Date(this.registerForm1.get('agenda')?.value[index].fechaFin),
      color: colors.red,
      draggable: false,
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
    });
    this.events = this.arrayCalendario;
    //guardar en la base de datos
    this.agendaService.crearagenda(this.registerForm1.get('agenda')?.value[index]).subscribe((resp: any) => {
      //this.router.navigateByUrl('/agenda-entrega-informes');
    });
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
        idEstudiantes: [null],
        idDocente: [this.personaService.persona._id]
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
        fechaInicio: [null],
        fechaFin: [null],
        idEstudiantes: [null],
        idDocente: [this.personaService.persona._id]
      }
    ));
  }
  agregarAgenda2(inicio:any, fin:any, estudiante:any, docente:any) {
    const agendaForm = <FormArray>this.registerForm1.controls['agenda'];
    agendaForm.push(this.fb.group(
      {
        fechaInicio: [inicio],
        fechaFin: [fin],
        idEstudiantes: [estudiante],
        idDocente: [docente]
      }
    ));
  }

  eliminarCamposArray(index: number) {
    const pruebaForm = <FormArray>this.registerForm1.controls['agenda'];
    pruebaForm.removeAt(index);

    console.log('Elimina el campo', this.agendaEntregaInformes[index]);
    setTimeout(() => {
      this.agendaService.eliminaragenda(this.agendaEntregaInformes[index]).subscribe((resp: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Estudiante eliminado de agenda de entrega de informes'
        })

        //TODO:Actualizar el calendario
        
      });
    }, 500);
    
  }

  recuperarDatosEstudiantes() {
    this.estudiantesService.getAllEstudiantesSinLimite().subscribe((resp: any) => {
      let nombreEstudiantes: any = [];
      resp.data.forEach((element: any) => {
        nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListEstudiantes = nombreEstudiantes;
      /* if (this.asignarSeleccionada) {
        this.asignarSeleccionada.idEstudiantes.map((m: any) => {
          const findEstudainte = this.dropdownListEstudiantes.find(
            (item: any) => item.item_id === m
          );
          if (findEstudainte) {
            this.onItemSelectEstudiante(findEstudainte);
            this.registerForm.get('idEstudiantes')?.setValue(this.estudiante);
          }
        });
      } */
    });
  }

  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante = item;
  }
  /** Todos los items Seleccionados */
  onSelectAllEstudiante(items: any) {
    this.estudiante = items;
  }
  /** Deselccionar item */
  onDeSelectEstudiante(item: any) {
    /** Borrar elemento del array  */
    this.estudiante = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstudiante(items: any) {
    this.estudiante = items;
  }

  eliminar(){
   const pruebaForm = <FormArray>this.registerForm1.controls['agenda'];
    pruebaForm.clear();
  }

}
