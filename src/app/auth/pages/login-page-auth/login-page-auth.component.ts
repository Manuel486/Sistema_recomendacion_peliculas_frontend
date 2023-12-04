import { Component } from '@angular/core';
import { Credentials } from '../../interfaces/credentials.interface';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page-auth',
  templateUrl: './login-page-auth.component.html',
  styles: [
  ]
})
export class LoginPageAuthComponent {
  creds: Credentials = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login(form: NgForm) {
    this.authService.login(this.creds).subscribe(
      () => {
        // La suscripción no recibe datos, solo se ejecuta si la autenticación tiene éxito.
        this.router.navigate(['/peliculas']);
      },
      error => {
        console.error("Error al iniciar sesión:", error);
      }
    );
  }
}
