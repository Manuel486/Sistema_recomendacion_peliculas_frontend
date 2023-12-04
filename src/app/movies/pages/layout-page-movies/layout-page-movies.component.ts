import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../../services/movie.service';
import { RecommendMovieService } from '../../services/recommend-movie.service';
import { Input } from '../../interfaces/input.interface';
import { Movie } from '../../interfaces/movie.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout-page-movies',
  templateUrl: './layout-page-movies.component.html',
  styles: [
  ]
})
export class LayoutPageMoviesComponent {
  peliculas: any;
  peliculasRecomendadas: any[] = [];
  peliculasRecomandaTmdb: any[] = [];
  public myForm: FormGroup = this.fb.group({
    peliculasPuntaje: ['', [Validators.required]]
  })

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['autenticacion']);
  }

}
