import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces/user.interface';

@Component({
  selector: 'app-my-ratings-page',
  templateUrl: './my-ratings-page.component.html',
  styles: [

  ]
})
export class MyRatingsPageComponent implements OnInit {
  user?: User;
  ratingMovies: any[] = [];
  constructor(
    private movieService: MovieService,
    private authServie: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authServie.currentUser;
    this.movieService.getRatings(this.user?.id).subscribe(ratings => {
      if (ratings && ratings.length > 0) {
        // Invierte las valoraciones y luego toma las últimas 30 o menos
        ratings = ratings.slice(0, 30);
        ratings.forEach(rating => {
          this.movieService.getMovieTmdb(rating.tmdbId).subscribe(movie => {
            // Realiza la conversión de 0-5 a 1-10
            const newRating = (Number(rating.rating) / 5) * 10;

            this.ratingMovies.push({ ...movie, "rating": newRating });
          });
        });
      }
    });
  }


}
