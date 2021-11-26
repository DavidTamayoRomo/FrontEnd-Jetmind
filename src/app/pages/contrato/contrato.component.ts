import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import {
  NgWizardConfig,
  NgWizardService,
  StepChangedArgs,
  StepValidationArgs,
  STEP_STATE,
  THEME,
} from 'ng-wizard';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styles: [],
})
export class ContratoComponent implements OnInit {
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: 'Terminar',
          class: 'btn btn-info',
          event: () => {
            alert('OK');
          },
        },
      ],
    },
  };

  public executeNextRepresentante: boolean | any;

  step: any;
  dataRepresentante: any;

  constructor(
    private ngWizardService: NgWizardService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  public registerForm = this.fb.group({
    fecha: [null],
    estado: [null],
    idRepresentante: [null],
    tipoPago: [null],
    estadoVenta: [null],
    abono: [null],
    valorMatricula: [null],
    valorTotal: [null],
    numeroCuotas: [null],
    formaPago: [null],
    comentario: [null],
    directorAsignado: [null],
    estadoPrograma: [null],
    fechaAprobacion: [null],
  });

  crearContrato() {}

  showPreviousStep(event?: Event) {
    // console.log(event);
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    // console.log(event);
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    // console.log(event);
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    // console.log(args.step);
    this.step = args.step;
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    // console.log('QE', args);
    this.executeNextRepresentante = true;
    setTimeout(() => {
      this.executeNextRepresentante = false;
    }, 1000);
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    // console.log(args);
    return of(true);
  }

  setDataFormRepresentante(event: any) {
    this.dataRepresentante = event;
    console.log(this.dataRepresentante);
  }

  sendFormValidRepresentante(event: any) {
    // console.log('Hola', event);
    this.config.keyNavigation = event;
  }
}
