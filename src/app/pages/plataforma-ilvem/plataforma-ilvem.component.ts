import { Component, OnInit } from '@angular/core';
import { PlataformaIlvem } from './plataforma-ilvem.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder } from '@angular/forms';
import { PersonaService } from '../persona/persona.service';
import { EstudianteService } from '../services/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlataformaIlvemService } from '../services/plataforma-ilvem.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-plataforma-ilvem',
  templateUrl: './plataforma-ilvem.component.html',
  styles: [
  ]
})
export class PlataformaIlvemComponent implements OnInit {

  public plataformaIlvemSeleccionada: any;

  PlataformaIlvemModel = new PlataformaIlvem();

  public dropdownListPersonas: any = [];
  public dropdownListEstudiantes: any = [];
  public dropdownListPersonas2: any = [];

  public selectedItems: any = [];
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSingle: IDropdownSettings = {};

  public persona: any = [];
  public estudiante: any = [];
  public persona2: any = [];

  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private estudiantesService: EstudianteService,
    private plataformaIlvemService: PlataformaIlvemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarPlataformaIlvembyId(id);
    });

    this.recuperarDatosPersonas();
    this.recuperarDatosEstudiantes();
    this.recuperarDatosPersonas2();

    this.dropdownSettingsSingle = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };

  }

  async cargarPlataformaIlvembyId(id: string) {
    if (id === 'nuevo') {
      return;
    }

    this.plataformaIlvemService.obtenerPlataformaIlvemById(id)
      .subscribe((resp: any) => {
        this.plataformaIlvemSeleccionada = resp.data;
        this.LlenarForm(resp);
      });

  }

  LlenarForm(resp: any) {
    const {
      idDirector,
      idEstudiante,
      idDocente,
      clave,
      pin,
      password
    } = resp.data;
    this.plataformaIlvemSeleccionada = resp.data;
    console.log(this.plataformaIlvemSeleccionada);
    this.registerForm.setValue({
      idDirector,
      idEstudiante,
      idDocente,
      clave,
      pin,
      password
    });
  }

  public registerForm = this.fb.group({
    idDirector: [null],
    idEstudiante: [null],
    idDocente: [null],
    clave: [null],
    pin: [null],
    password: [null]
  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  crear() {
    console.log(this.plataformaIlvemSeleccionada);
    if (this.plataformaIlvemSeleccionada) {
      //actualizar
      this.PlataformaIlvemModel = this.registerForm.value;
      console.log(this.PlataformaIlvemModel);

      //ID de las docente
      this.PlataformaIlvemModel.idDirector = this.persona[0].item_id;
      this.PlataformaIlvemModel.idDocente = this.persona2[0].item_id;

      //ID estudiante
      this.PlataformaIlvemModel.idEstudiante = this.estudiante[0].item_id;



      if (this.registerForm.invalid) {
        //Formulario invalido
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
          icon: 'error',
          title: 'Verificar campos invalidos \n Indicados con el color rojo'
        })
        return;
      } else {

        this.plataformaIlvemService.updatePlataformaIlvem(this.plataformaIlvemSeleccionada._id, this.PlataformaIlvemModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/listaciudades');
        }, (err: any) => {

          console.warn(err.error.message);

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

          //TODO: Mostrar error cuando es administrador. Dato que muestra el error completo=  err.error.message
          Toast.fire({
            icon: 'error',
            title: 'ERROR: ' + err.error.statusCode + '\nContactese con su proveedor de software '
          })
        });
      }
    } else {
      //crear
      this.PlataformaIlvemModel = this.registerForm.value;
      //ID de las docente
      this.PlataformaIlvemModel.idDirector = this.persona[0].item_id;
      this.PlataformaIlvemModel.idDocente = this.persona2[0].item_id;

      //ID estudiante
      this.PlataformaIlvemModel.idEstudiante = this.estudiante[0].item_id;


      if (this.registerForm.invalid) {
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
          icon: 'error',
          title: '- Campos con asterisco son obligatorios\n - Verificar campos invalidos, \n indicados con el color rojo  '
        })
        return;
      } else {
        this.plataformaIlvemService.crearPlataformaIlvem(this.PlataformaIlvemModel).subscribe((resp) => {
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
            title: 'Guardado correctamente'
          })

          this.router.navigateByUrl('/listaciudades');
        }, (err: any) => {

          console.warn(err.error.message);

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

          //TODO: Mostrar error cuando es administrador. Dato que muestra el error completo=  err.error.message
          Toast.fire({
            icon: 'error',
            title: 'ERROR: ' + err.error.statusCode + '\nContactese con su proveedor de software '
          })
        });
      }

    }
  }

  cancelarGuardado() {
    this.router.navigateByUrl('/lista')
  }

  recuperarDatosPersonas() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas = nombrePersonas;
      if (this.plataformaIlvemSeleccionada) {
        const findMarcaPersona = this.dropdownListPersonas.find(
          (item: any) => item.item_id === this.plataformaIlvemSeleccionada.idDocente
        );
        if (findMarcaPersona) {
          this.onItemSelectPersona(findMarcaPersona);
          this.registerForm.get('idDirector')?.setValue(this.persona);
        }
      }
    });
  }

  recuperarDatosPersonas2() {
    this.personaService.getAllPersonasSinLimite().subscribe((resp: any) => {
      let nombrePersonas: any = [];
      resp.data.forEach((element: any) => {
        nombrePersonas.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListPersonas2 = nombrePersonas;
      if (this.plataformaIlvemSeleccionada) {
        const findMarcaPersona = this.dropdownListPersonas2.find(
          (item: any) => item.item_id === this.plataformaIlvemSeleccionada.idDocente
        );
        if (findMarcaPersona) {
          this.onItemSelectPersona2(findMarcaPersona);
          this.registerForm.get('idDocente')?.setValue(this.persona);
        }
      }
    });
  }


  recuperarDatosEstudiantes() {
    this.estudiantesService.getAllEstudiantesSinLimite().subscribe((resp: any) => {
      let nombreEstudiantes: any = [];
      resp.data.forEach((element: any) => {
        nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
      });
      this.dropdownListEstudiantes = nombreEstudiantes;
      if (this.plataformaIlvemSeleccionada) {
        const findEstudainte = this.dropdownListEstudiantes.find(
          (item: any) => item.item_id === this.plataformaIlvemSeleccionada.idEstudiante
        );
        if (findEstudainte) {
          this.onItemSelectEstudiante(findEstudainte);
          this.registerForm.get('idEstudiante')?.setValue(this.estudiante);
        }
      }
    });
  }


  /** Persona */
  /** Item Seleccionado */
  onItemSelectPersona(item: any) {
    this.persona=[item];
  }
  /** Todos los items Seleccionados */
  onSelectAllPersona(items: any) {
    this.persona = items;
  }
  /** Deselccionar item */
  
  onDeSelectPersona(item: any) {
    /** Borrar elemento del array  */
    this.persona = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona(items: any) {
    this.persona = items;
  }

  /** Persona2 */
  /** Item Seleccionado */
  onItemSelectPersona2(item: any) {
    this.persona2=[item];
  }
  /** Todos los items Seleccionados */
  onSelectAllPersona2(items: any) {
    this.persona2 = items;
  }
  /** Deselccionar item */
  
  onDeSelectPersona2(item: any) {
    /** Borrar elemento del array  */
    this.persona2 = [];
  }
  /** Deselccionar todos los items */
  onDeSelectAllPersona2(items: any) {
    this.persona2 = items;
  }
  

  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante.push(item);
    console.log(this.estudiante);
  }
  /** Todos los items Seleccionados */
  onSelectAllEstudiante(items: any) {
    this.estudiante = items;
    console.log(this.estudiante);
  }
  /** Deselccionar item */
  findByItemIdIndexEstudiante(id: any) {
    return this.estudiante.findIndex((resp: any) => {
      return resp.item_id === id;
    })
  }
  onDeSelectEstudiante(item: any) {
    /** Borrar elemento del array  */
    const index = this.findByItemIdIndexEstudiante(item.item_id);
    const newArray = (index > -1) ? [
      ...this.estudiante.slice(0, index),
      ...this.estudiante.slice(index + 1)
    ] : this.estudiante;
    this.estudiante = newArray;
    console.log(this.estudiante);
  }
  /** Deselccionar todos los items */
  onDeSelectAllEstudiante(items: any) {
    this.estudiante = items;
    console.log(this.estudiante);
  }



}
