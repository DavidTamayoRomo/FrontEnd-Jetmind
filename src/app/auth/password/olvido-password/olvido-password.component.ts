import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaService } from 'src/app/pages/persona/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-olvido-password',
  templateUrl: './olvido-password.component.html',
  styleUrls: ['./olivido.component.css']
})
export class OlvidoPasswordComponent implements OnInit {
  public boton: boolean = false;
  constructor(
    private fb: FormBuilder,
    private personaService: PersonaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  public registerForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
  });

  campoNoValido(campo: any): boolean {
    if (this.registerForm.get(campo)?.invalid  && (this.registerForm.get(campo)?.dirty || this.registerForm.get(campo)?.touched)) {
      return true;
    }
    else {
      return false;
    }
  }

  crear() {
    console.log(this.registerForm.value);
    this.personaService.recuperarPasswordPersona(this.registerForm.value.email).subscribe(
      (resp: any) => {
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Se ha enviado un correo con el link para restablecer su contraseña',
          showConfirmButton: true,
          timer: 5000
        });
        this.router.navigateByUrl('/login');
      }
    );
  }

}
