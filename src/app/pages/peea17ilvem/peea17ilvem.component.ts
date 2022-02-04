import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-peea17ilvem',
  templateUrl: './peea17ilvem.component.html',
  styles: [
  ]
})
export class Peea17ilvemComponent implements OnInit {

  public peeas: any = [];

  public mostraModal: boolean = true;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  public registerForm = this.fb.group({
    idContrato: [],
    fecha: [new Date()],
    pregunta1: [''],
    pregunta2: [''],
    pregunta3: [''],
    pregunta4: [''],
    pregunta5: [''],
    pregunta6: [''],
    pregunta7: [''],
    pregunta8: [null],
    pregunta9: [null],
    pregunta10: [null],
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
    pregunta38: [''],
    pregunta39: [''],
    pregunta40: [''],
    pregunta41: [''],
    pregunta42: [''],
    pregunta43: [''],
    pregunta44: [''],
    pregunta45: [''],
    pregunta46: [''],
    pregunta47: [''],
    pregunta48: [''],
    pregunta49: [''],
    pregunta50: [''],
    pregunta51: [''],
    pregunta52: [''],
    pregunta53: [''],
    pregunta54: [''],
    pregunta55: [''],
    pregunta56: [''],
    pregunta57: [''],
    pregunta58: [''],
    pregunta59: [''],
    pregunta60: [''],
    pregunta61: [''],
    pregunta62: [''],
    pregunta63: [''],
    pregunta64: [''],
    pregunta65: [''],
    pregunta66: [''],
    pregunta67: [''],
    pregunta68: [''],
    pregunta69: [''],
    pregunta70: [''],
    pregunta71: [''],
    pregunta72: [''],
    pregunta73: [''],
    pregunta74: [''],
    pregunta75: [''],
    pregunta76: [''],
    pregunta77: [''],
    pregunta78: [''],
    pregunta79: [''],
    
  });


  abrirModal(){
    this.mostraModal = false;
  }

  cerrarModal() {
    this.mostraModal = true;
  }

  agregar() {
    this.peeas.push({
      /* nombre: this.nombre.nativeElement.value,
      edad: this.edad.nativeElement.value,
      ocupacion: this.ocupacion.nativeElement.value,
      parentesco: this.parentesco.nativeElement.value */
    });
    this.cerrarModal();
  }

  crearPeea17(){

  }

  cancelarGuardado(){
  }

  habilitarCampos(campo1:any, campo2:any){
    
  }
}
