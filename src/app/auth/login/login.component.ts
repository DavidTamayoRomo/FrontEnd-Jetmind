import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/pages/persona/persona.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['123',Validators.required],
    remeber:[false]
  });

  constructor(private router:Router, private fb: FormBuilder,
    private personaService: PersonaService ) { }

  ngOnInit(): void {
  }

  login(){
    
    this.personaService.loginPersona(this.loginForm.value).subscribe((resp:any)=>{
      console.log(resp);
      if (this.loginForm.get('remeber')?.value) {
        localStorage.setItem('email',this.loginForm.get('email')?.value);
      }else{
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/');
    }, 
    (err: any) => {
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
        title: 'Contraseña o correo no valido ' 
      })
    });
    
  }

}
