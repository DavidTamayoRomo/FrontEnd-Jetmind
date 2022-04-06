import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Peea18ilvemService } from '../services/peea18ilvem.service';
import { Peea18ilvem } from './peea18ilvem.model';

import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ContratoService } from '../services/contrato.service';
import { EstudianteService } from '../services/estudiante.service';

@Component({
  selector: 'app-peea18ilvem',
  templateUrl: './peea18ilvem.component.html',
  styles: []
})
export class Peea18ilvemComponent implements OnInit {

  public estudiante: any = [];

  public dropdownListEstudiantes: any = [];
  public selectedItems: any = [];
  public dropdownSettingsSingle: IDropdownSettings = {};

  public peeas: any = [];
  public mostraModal: boolean = true;

  public pea18ilvemSeleccionada: any;

  Peea18ilvemModel = new Peea18ilvem();

  @ViewChild('nombre') nombre: ElementRef;
  @ViewChild('edad') edad: ElementRef;
  @ViewChild('ocupacion') ocupacion: ElementRef;
  @ViewChild('parentesco') parentesco: ElementRef;

  
  @ViewChild('representativo') representativo: ElementRef;
  @ViewChild('auditiva') auditiva: ElementRef;
  @ViewChild('salud') salud: ElementRef;
  @ViewChild('visual') visual: ElementRef;
  @ViewChild('dificultad') dificultad: ElementRef;
  @ViewChild('tratamiento') tratamiento: ElementRef;
  @ViewChild('cumpliendo') cumpliendo: ElementRef;
  @ViewChild('desde') desde: ElementRef;
  @ViewChild('hasta') hasta: ElementRef;
  @ViewChild('Trabaja') Trabaja: ElementRef;


  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private peea18ilvemService: Peea18ilvemService,
    private contratoService: ContratoService,
    private estudianteService: EstudianteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id, idContrato }) => {
      this.cargaPeea18byId(id);
      this.cargarEstudianteContrato(idContrato);
    });
    this.dropdownSettingsSingle = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'nombre',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
    };
  }

  cargarEstudianteContrato(idContrato: any) {
    this.contratoService.obtenerContratoById(idContrato).subscribe((resp: any) => {
      this.estudianteService.getAllEstudiantesByIdRepresentante(resp.data.idRepresentante).subscribe((resp: any) => {
        let nombreEstudiantes: any = [];
        resp.data.forEach((element: any) => {
          nombreEstudiantes.push({ item_id: element._id, nombre: element.nombresApellidos });
        });
        this.dropdownListEstudiantes = nombreEstudiantes;
      })
    })
  }

  async cargaPeea18byId(id: string) {
    if (id === 'nuevo') {
      return;
    }
    this.peea18ilvemService.obtenerPeea18ilvemById(id)
      .subscribe((resp: any) => {
        this.pea18ilvemSeleccionada = resp.data;
        console.log(this.pea18ilvemSeleccionada);
        //this.peeas = this.pea17ilvemSeleccionada.pregunta5;
        this.LlenarForm(resp);
      });
  }

  public registerForm = this.fb.group({
    idContrato: [this.activatedRoute.snapshot.paramMap.get('idContrato')],
    fecha: [new Date()],
    pregunta1: [''],
    pregunta2: [''],
    pregunta3: [''],
    pregunta4: [''],
    pregunta5: [''],
    pregunta6: [''],
    pregunta7: [''],
    pregunta8: [null],
    pregunta10: [""],
    pregunta11: [null],
    pregunta12: [''],
    pregunta13: [''],
    pregunta14: [''],
    pregunta15: [''],
    pregunta16: [''],
    pregunta17: [''],
    pregunta18: [''],
    pregunta19: [''],
    pregunta20: [''],
    pregunta21: [''],
    pregunta22: [''],
    pregunta23: [''],
    pregunta24: [''],
    pregunta25: [''],
    pregunta26: [''],
    pregunta27: [''],
    pregunta28: [''],
    pregunta29: [''],
    pregunta30: [''],
    pregunta31: [''],
    pregunta32: [''],
    pregunta33: [''],
    pregunta34: [''],
    pregunta35: [''],
    pregunta36: [''],
    pregunta37: [''],
    idEstudiante: [null],

  });

  LlenarForm(resp: any) {
    const {
      idContrato,
      fecha,
      pregunta1,
      pregunta2,
      pregunta3,
      pregunta4,
      pregunta5,
      pregunta6,
      pregunta7,
      pregunta8,
      pregunta9,
      pregunta10,
      pregunta11,
      pregunta12,
      pregunta13,
      pregunta14,
      pregunta15,
      pregunta16,
      pregunta17,
      pregunta18,
      pregunta19,
      pregunta20,
      pregunta21,
      pregunta22,
      pregunta23,
      pregunta24,
      pregunta25,
      pregunta26,
      pregunta27,
      pregunta28,
      pregunta29,
      pregunta30,
      pregunta31,
      pregunta32,
      pregunta33,
      pregunta34,
      pregunta35,
      pregunta36,
      pregunta37
    } = resp.data;

    this.pea18ilvemSeleccionada = resp.data;
    this.registerForm.setValue({
      idContrato,
      fecha,
      pregunta1,
      pregunta2,
      pregunta3,
      pregunta4,
      pregunta5,
      pregunta6,
      pregunta7,
      pregunta8,
      pregunta10,
      pregunta11,
      pregunta12,
      pregunta13,
      pregunta14,
      pregunta15:pregunta15.respuesta,
      pregunta16:pregunta16.respuesta,
      pregunta17:pregunta17.respuesta,
      pregunta18:pregunta18.respuesta,
      pregunta19:pregunta19.respuesta,
      pregunta20,
      pregunta21,
      pregunta22:pregunta22.respuesta,
      pregunta23,
      pregunta24:pregunta24.respuesta,
      pregunta25,
      pregunta26,
      pregunta27,
      pregunta28,
      pregunta29,
      pregunta30,
      pregunta31,
      pregunta32,
      pregunta33,
      pregunta34,
      pregunta35,
      pregunta36,
      pregunta37
    });
    
    setTimeout(() => {
      this.peeas = pregunta9;
      if (pregunta15?.respuesta == "Si") {
        this.representativo.nativeElement.value = pregunta15?.observacion;
      }
      if (pregunta16?.respuesta == "Si") {
        this.auditiva.nativeElement.value = pregunta16?.observacion;
      }
      if (pregunta17?.respuesta == "Si") {
        this.salud.nativeElement.value = pregunta17?.observacion;
      }
      if (pregunta18?.respuesta == "Si") {
        this.visual.nativeElement.value = pregunta18?.observacion;
      }
      if (pregunta19?.respuesta == "Si") {
        this.dificultad.nativeElement.value = pregunta19?.observacion;
      }
      if (pregunta21?.respuesta == "Si") {
        this.tratamiento.nativeElement.value = pregunta21?.observacion;
      }
      if (pregunta24?.respuesta == "Si") {
        this.Trabaja.nativeElement.value = pregunta24?.observacion;
      }
      this.desde.nativeElement.value = pregunta23?.desde;
      this.hasta.nativeElement.value = pregunta23?.hasta;
    }, 1000);


  }

  crearPeea18() {
    if (this.pea18ilvemSeleccionada) {
      //actualizar
      this.Peea18ilvemModel = this.registerForm.value;

      this.Peea18ilvemModel.idContrato = this.activatedRoute.snapshot.paramMap.get('idContrato')?.toString();   

      this.Peea18ilvemModel.pregunta15={
        respuesta:this.registerForm.get('pregunta15')?.value,
        observacion: this.representativo.nativeElement.value
      }

      this.Peea18ilvemModel.pregunta16={
        respuesta:this.registerForm.get('pregunta16')?.value,
        observacion: this.auditiva.nativeElement.value
      }
      
      this.Peea18ilvemModel.pregunta17={
        respuesta:this.registerForm.get('pregunta17')?.value,
        observacion: this.salud.nativeElement.value
      }
      
      this.Peea18ilvemModel.pregunta18={
        respuesta:this.registerForm.get('pregunta18')?.value,
        observacion: this.visual.nativeElement.value
      }
      
      this.Peea18ilvemModel.pregunta19={
        respuesta:this.registerForm.get('pregunta19')?.value,
        observacion: this.dificultad.nativeElement.value
      }
      
      this.Peea18ilvemModel.pregunta21={
        respuesta:this.registerForm.get('pregunta21')?.value,
        observacion: this.tratamiento.nativeElement.value
      }
      
      this.Peea18ilvemModel.pregunta22={
        respuesta:this.registerForm.get('pregunta22')?.value,
        observacion: this.cumpliendo.nativeElement.value
      }
      
      this.Peea18ilvemModel.pregunta23={
        desde:this.desde.nativeElement.value,
        hasta: this.hasta.nativeElement.value
      }
      
      this.Peea18ilvemModel.pregunta24={
        respuesta:this.registerForm.get('pregunta24')?.value,
        observacion: this.Trabaja.nativeElement.value
      }
      
      this.Peea18ilvemModel.pregunta9= this.peeas;

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

        this.peea18ilvemService.updatePeea18ilvem(this.pea18ilvemSeleccionada._id, this.Peea18ilvemModel).subscribe((resp: any) => {
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
          this.router.navigateByUrl('/lista-peea-18-ilvem');
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
        this.Peea18ilvemModel = this.registerForm.value;
        this.Peea18ilvemModel.idEstudiante = this.estudiante[0].item_id;
        this.Peea18ilvemModel.pregunta15={
          respuesta:this.registerForm.get('pregunta15')?.value,
          observacion: this.representativo?.nativeElement.value
        }
  
        this.Peea18ilvemModel.pregunta16={
          respuesta:this.registerForm.get('pregunta16')?.value,
          observacion: this.auditiva?.nativeElement.value
        }
        
        this.Peea18ilvemModel.pregunta17={
          respuesta:this.registerForm.get('pregunta17')?.value,
          observacion: this.salud?.nativeElement.value
        }
        
        this.Peea18ilvemModel.pregunta18={
          respuesta:this.registerForm.get('pregunta18')?.value,
          observacion: this.visual?.nativeElement.value
        }
        
        this.Peea18ilvemModel.pregunta19={
          respuesta:this.registerForm.get('pregunta19')?.value,
          observacion: this.dificultad?.nativeElement.value
        }
        
        this.Peea18ilvemModel.pregunta21={
          respuesta:this.registerForm.get('pregunta21')?.value,
          observacion: this.tratamiento?.nativeElement.value
        }
        
        this.Peea18ilvemModel.pregunta22={
          respuesta:this.registerForm.get('pregunta22')?.value,
          observacion: this.cumpliendo?.nativeElement.value
        }
        
        this.Peea18ilvemModel.pregunta23={
          desde:this.desde?.nativeElement.value,
          hasta: this.hasta?.nativeElement.value
        }
        
        this.Peea18ilvemModel.pregunta24={
          respuesta:this.registerForm.get('pregunta24')?.value,
          observacion: this.Trabaja?.nativeElement.value
        }
        
        this.Peea18ilvemModel.pregunta9= this.peeas;

        //actualizar datos del contrato
        this.contratoService.obtenerContratoById(this.Peea18ilvemModel.idContrato).subscribe((resp: any) => {
          let datos = resp.data;
          if (datos.pea) {
            datos.pea.push({ nombreEstudiante: this.estudiante[0].nombre, marca: 'ILVEM', nombrePea: 'PEEA 18 ILVEM' });
          } else {
            datos.pea = [{ nombreEstudiante: this.estudiante[0].nombre, marca: 'ILVEM', nombrePea: 'PEEA 18 ILVEM' }];
          }
          this.contratoService.updatecontrato(this.Peea18ilvemModel.idContrato, datos).subscribe((resp: any) => {
            console.log(resp);
          });
        });

        setTimeout(() => {
          this.peea18ilvemService.crearPeea18ilvem(this.Peea18ilvemModel).subscribe((resp) => {
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

            this.router.navigateByUrl('/lista-peea-18-ilvem');
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
        }, 100);

      }
    }
  }

  abrirModal() {
    this.mostraModal = false;
  }

  cancelarGuardado() {
    this.router.navigateByUrl('/lista-peea-18-ilvem');
  }

  cerrarModal() {
    this.mostraModal = true;
  }

  agregar() {
    this.peeas.push({
      nombre: this.nombre.nativeElement.value,
      edad: this.edad.nativeElement.value,
      ocupacion: this.ocupacion.nativeElement.value,
      parentesco: this.parentesco.nativeElement.value
    });
    this.cerrarModal();
  }

  /** estudiante */
  /** Item Seleccionado */
  onItemSelectEstudiante(item: any) {
    this.estudiante = [item];
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

}
