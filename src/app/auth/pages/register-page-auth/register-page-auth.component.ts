import { Component } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Credentials } from '../../interfaces/credentials.interface';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page-auth',
  templateUrl: './register-page-auth.component.html',
  styles: [
  ]
})
export class RegisterPageAuthComponent {
  user: User = {
    id: 0,
    names: "",
    lastnames: "",
    email: "",
    password: ""
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register(form: NgForm) {
    if (form.status == "VALID") {
      this.authService.registerUser(form.value).subscribe(user => {
        if (user != undefined) {
          this.login();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El gmail ya se encuentra siendo utilizado',
          })
        }
      })
    }


  }

  login() {
    let credentials: Credentials = {
      email: this.user.email,
      password: this.user.password
    }

    if (this.user) {
      this.authService.login(credentials).subscribe(() => {
        this.router.navigate(['/peliculas']);
      })
    }
  }
}
