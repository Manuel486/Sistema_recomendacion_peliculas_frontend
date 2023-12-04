import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { RecommendMovieService } from '../../services/recommend-movie.service';
import { Input } from '../../interfaces/input.interface';
import { MovieRecommender } from '../../interfaces/movie-recommender.interface';
import { User } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Rating } from '../../interfaces/rating.interface';

@Component({
  selector: 'app-recommendation-page',
  templateUrl: './recommendation-page.component.html',
  styles: [
  ]
})
export class RecommendationPageComponent implements OnInit {
  user?: User;
  recommendedMovies: any[] = [];
  recommendedMoviesTmdb: any[] = [];
  ratings: Rating[] = [];
  constructor(
    private movieService: MovieService,
    private recommendMovieService: RecommendMovieService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser;
    this.movieService.getRatings(this.user?.id).subscribe(ratings => {
      this.ratings = ratings;
      if (ratings && ratings.length > 0) {
        this.recommendMovies();
      }
    })
  }

  recommendMovies() {
    this.recommendMovieService.movieRecommender(this.user?.id).subscribe(movieRecommender => {
      this.recommendedMovies = movieRecommender;
      this.getTmdbData(this.recommendedMovies);
    })
  }

  getTmdbData(movieRecommeder: MovieRecommender[]) {
    this.recommendedMoviesTmdb = [];
    movieRecommeder.forEach(movie => {
      this.movieService.getMovieTmdb(movie.tmdbId).subscribe(movie => {
        this.recommendedMoviesTmdb.push(movie);
      })
    })

  }
}
