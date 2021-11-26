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
  public executeBackRepresentante: boolean | any;
  public executeNextEstudiante: boolean | any;
  public executeBackEstudiante: boolean | any;

  step: any;
  dataRepresentante: any;
  dataEstudiante: any;

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
    this.step = args.step;
  }

  isValidTypeBoolean: boolean = true;

  isValidEnterStepRepresentante(args: StepValidationArgs) {
    this.executeBackRepresentante = true;
    setTimeout(() => {
      this.executeBackRepresentante = false;
    }, 1000);
    return true;
  }

  isValidExitStepRepresentante(args: StepValidationArgs) {
    this.executeNextRepresentante = true;
    setTimeout(() => {
      this.executeNextRepresentante = false;
    }, 1000);
    return true;
  }
  isValidEnterStepEstudiante(args: StepValidationArgs) {
    this.executeBackEstudiante = true;
    setTimeout(() => {
      this.executeBackEstudiante = false;
    }, 1000);
    return true;
  }
  isValidExitStepEstudiante(args: StepValidationArgs) {
    this.executeNextEstudiante = true;
    setTimeout(() => {
      this.executeNextEstudiante = false;
    }, 1000);

    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    // console.log(args);
    return of(true);
  }

  setDataFormRepresentante(event: any) {
    this.dataRepresentante = event;
    localStorage.setItem(
      'representanteContrato',
      JSON.stringify(this.dataRepresentante)
    );
    // Para obtenerlo es JSON.parse
  }

  setDataFormEstudiante(event: any) {
    this.dataEstudiante = event;
    localStorage.setItem(
      'estudianteContrato',
      JSON.stringify(this.dataEstudiante)
    );
  }

  validFormRepresentante(event: any) {
    if (event) {
      setTimeout(() => {
        const buttonNext: any =
          document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.remove('disabled');
          buttonNext.disabled = false;
        }
      }, 1000);
    } else {
      setTimeout(() => {
        const buttonNext: any =
          document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.add('disabled');
          buttonNext.disabled = true;
        }
      }, 1000);
    }
  }
  validFormEstudiante(event: any) {
    if (event) {
      setTimeout(() => {
        const buttonNext: any =
          document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.remove('disabled');
          buttonNext.disabled = false;
        }
      }, 1000);
    } else {
      setTimeout(() => {
        const buttonNext: any =
          document.getElementsByClassName('ng-wizard-btn-next')[0];
        if (buttonNext) {
          buttonNext.classList.add('disabled');
          buttonNext.disabled = true;
        }
      }, 1000);
    }
  }
}
