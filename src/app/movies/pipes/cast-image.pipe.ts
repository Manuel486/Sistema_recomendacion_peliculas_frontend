import { Pipe, PipeTransform } from '@angular/core';
import { Cast } from '../interfaces/movit-tmdb.interface';

@Pipe({
  name: 'castImage'
})
export class CastImagePipe implements PipeTransform {

  transform(cast: Cast): string {
    if (!cast.profile_path) {
      return 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
    }
    return 'https://image.tmdb.org/t/p/w500' + cast.profile_path;
  }

}
