import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Input } from '../interfaces/input.interface';
import { MovieRecommender } from '../interfaces/movie-recommender.interface';
import { Movie } from '../interfaces/movie.interface';
@Injectable({
  providedIn: 'root'
})
export class RecommendMovieService {
  private URL = "https://api.themoviedb.org/3/movie";
  private API_KEY = "api_key=1d328f750d78686717597c41210f35fe";

  constructor(private http: HttpClient) { }


  movieRecommender(id: any): Observable<MovieRecommender[]> {
    return this.http.get<MovieRecommender[]>(`http://localhost:5000/api/recommendations/${id}`);
  }

  


}
