import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-olvido-password',
  templateUrl: './olvido-password.component.html',
  styleUrls: ['./olivido.component.css']
})
export class OlvidoPasswordComponent implements OnInit {
  public boton: boolean = false;
  constructor(
    private fb: FormBuilder,
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
      this.boton = true;
      return false;
    }
  }

  crear() {
  }

}
