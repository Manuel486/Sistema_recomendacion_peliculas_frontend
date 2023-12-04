import { Pipe, PipeTransform } from '@angular/core';
import { MovieTmdb } from '../interfaces/movit-tmdb.interface';

@Pipe({
  name: 'movieImage'
})
export class MovieImagePipe implements PipeTransform {

  transform(movie: MovieTmdb): string {
    if (!movie.backdrop_path && !movie.poster_path) {
      return 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
    }
    return 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
  }

}
