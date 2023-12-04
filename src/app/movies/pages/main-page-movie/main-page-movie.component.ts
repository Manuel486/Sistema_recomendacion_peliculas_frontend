import { Component, HostListener, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-main-page-movie',
  templateUrl: './main-page-movie.component.html',
  styles: []
})
export class MainPageMovieComponent implements OnInit {
  searchControl = new FormControl('');
  searchResults: any[] = [];
  page = 1;
  movies: any[] = [];
  moviesTmdbId: any[] = [];
  selectedMovie?: Movie;
  showSuggestions = true;
  loading = false;

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => {
          if (this.showSuggestions) {
            return this.movieService.getSuggestions(query ?? '');
          } else {
            return [];
          }
        })
      )
      .subscribe((results) => {
        this.searchResults = results.slice(0, 10);
      });

    // Agregar un controlador de eventos para detectar cuando el campo de búsqueda se vacía
    this.searchControl.valueChanges.subscribe((value) => {
      this.enableSuggestions(); // Habilitar las sugerencias
    });
  }

  ngOnInit(): void {
    this.loadInitialMoviesWithInterval();
    this.loadLinks();
  }

  selectMovie(movie: any): void {
    this.selectedMovie = movie;
    this.searchControl.setValue(movie.title);
    this.showSuggestions = false;
  }

  enableSuggestions(): void {
    this.showSuggestions = true;
  }

  loadLinks() {
    this.movieService.getLinks().subscribe(links => {
      this.moviesTmdbId = links || [];
    });
  }

  isMovieInList(movieId: number): boolean {
    return this.moviesTmdbId.some(movie => movie.tmdbId === movieId);
  }

  loadInitialMoviesWithInterval(): void {
    const interval = setInterval(() => {
      if (this.movies.length < 30) {
        this.loadMovies();
      } else {
        clearInterval(interval);
      }
    }, 500);
  }

  loadMovies(): void {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.movieService.getMovies(this.page).subscribe(
      movies => {
        const filteredMovies = movies.results.filter(movie => this.isMovieInList(movie.id));
        this.movies = this.movies.concat(filteredMovies);
        this.page++;
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const windowScrollPos = window.scrollY || window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (windowScrollPos + windowHeight >= documentHeight - 1) {
      this.loadMovies();
    }
  }

  searchMovie(): void {
    if (this.selectedMovie == undefined) {
      return;
    }

    if (this.selectedMovie.id != null) {
      this.router.navigate(['/peliculas/pelicula', this.selectedMovie.id]);
    }
  }
}
