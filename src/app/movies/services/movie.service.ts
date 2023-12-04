import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { Rating } from '../interfaces/rating.interface';
import { MovieTmdb } from '../interfaces/movit-tmdb.interface';
import { MovieResponse } from '../interfaces/movie-response.interfaces';
import { MovieVideo } from '../interfaces/movie-video.interface';
import { InputRating } from '../interfaces/input-rating.interface';



@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private URL = "https://api.themoviedb.org/3/discover/movie";
  private URL2 = "https://api.themoviedb.org/3/movie";
  private API_KEY = "api_key=1d328f750d78686717597c41210f35fe";
  private URL_BACKEND = "http://localhost:5000";

  constructor(private http: HttpClient) { }

  getLinks(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/links/`);
  }

  getMovies(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.URL}?${this.API_KEY}&language=es-ES&page=${page}`);
  }

  getMovieTmdb(id: any): Observable<MovieTmdb> {
    return this.http.get<MovieTmdb>(`${this.URL2}/${id}?${this.API_KEY}&language=es-ES&append_to_response=credits`);
  }

  // Método para obtener sugerencias de nombres de películas basadas en el término de búsqueda
  getSuggestions(query: string): Observable<any[]> {
    const url = `https://api.themoviedb.org/3/search/movie?${this.API_KEY}&language=es-ES&query=${query}`;
    return this.http.get<any[]>(url)
      .pipe(map((data: any) => data.results));
  }

  getRatings(id: any): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${this.URL_BACKEND}/api/ratings/${id}`);
  }

  saveRating(inputRating: InputRating): Observable<any> {
    return this.http.post<any>(`${this.URL_BACKEND}/api/ratings/register`, inputRating);
  }

  getMovieVideo(id: number): Observable<MovieVideo> {
    return this.http.get<MovieVideo>(`${this.URL2}/${id}/videos?${this.API_KEY}&language=es-ES`);
  }

}
