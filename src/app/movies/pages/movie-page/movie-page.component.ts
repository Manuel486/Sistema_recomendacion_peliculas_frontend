import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { User } from 'src/app/auth/interfaces/user.interface';
import { MovieTmdb, Cast } from '../../interfaces/movit-tmdb.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rating } from '../../interfaces/rating.interface';
import Swal from 'sweetalert2';
import { InputRating } from '../../interfaces/input-rating.interface';


@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styles: [
  ]
})
export class MoviePageComponent implements OnInit {
  user?: User;
  movie: any;
  responsiveOptions: any[] | undefined;
  value: number = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.route.params.subscribe(params => {
      const id = +params['id']; // Convierte 'id' en un número
      if (!isNaN(id)) { // Verifica si 'id' es un número válido
        this.getMovieRating(id);
      }
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  getMovieRating(id: number) {
    if (!this.user) {
      return;
    }
    this.movieService.getRatings(this.user.id).subscribe(ratings => {
      const rating = ratings.find(rating => rating.tmdbId === id);

      if (rating) {
        // Realiza la conversión de 0-5 a 1-10
        const newRating = (Number(rating.rating) / 5) * 10;
        this.getMovieTmdb(id, newRating);
      } else {
        this.getMovieTmdb(id);
      }
    });
  }

  getMovieTmdb(id: number, rating = 0) {
    this.movieService.getMovieTmdb(id).subscribe(movie => {
      this.value = rating;
      this.movie = { ...movie, rating };
    });
  }

  onRatingChange(newRating: number) {
    if (this.value != this.movie.rating) {
      Swal.fire({
        title: '¿Esta seguro de su valoración?',
        text: "Esta valoración permitirá generar la recomendación de peliculas",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cambiar el puntaje',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          if (this.user?.id) {
            let inputRating: InputRating = {
              "tmdbId": this.movie.id,
              "userId": this.user?.id | 0,
              "rating": newRating / 2,
              "title": this.movie.title,
              "year": Number(this.movie.release_date.split("-")[0])
            }
            this.movieService.saveRating(inputRating).subscribe(() => {
              Swal.fire(
                'Guardado',
                'Su valoración fue registrada.',
                'success'
              )
            })
          }
        } else {
          this.value = this.movie.rating;
        }
      })
    }
  }
}
