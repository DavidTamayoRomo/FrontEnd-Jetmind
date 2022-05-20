import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/pages/persona/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-password',
  templateUrl: './generar-password.component.html',
  styleUrls: ['./generar-password.component.css']
})
export class GenerarPasswordComponent implements OnInit {

  registerForm: FormGroup;
  boton: boolean = false;
  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService
  ) { }

  ngOnInit(): void {
    /* this.activatedRoute.params.subscribe(({ id }) => {
      console.log(id);
    }); */

    this.registerForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
    }, { validators: this.sonIguales('password','password2') }  );
  }

  
  sonIguales( campo1: string, campo2: string ){
    return(group: FormGroup)=>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        this.boton = true;
        return null;
      }
      this.boton = false;
      return{
        sonIguales: true
      };
    };
}

  cambiarpass(id: string, pass:any) {
    this.personaService.obtenerPersonaById(id).subscribe((resp: any) => {
      let persona:any = resp.data;
      persona.password = pass;
      this.personaService.updatePersona(resp.data._id, persona).subscribe((resp: any) => {
        Swal.fire(
          'Creacion de contraseña',
          'Se creado correctamente su contraseña',
          'success'
        );
        this.router.navigateByUrl('/login');
      });
    });
  }

  crearPass(){
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.cambiarpass(this.activatedRoute.snapshot.params.id, this.registerForm.value.password);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos Obligatorios',
        text: 'Debe ingresar una contraseña y repetir la contraseña',
      });
    }
  }

}
