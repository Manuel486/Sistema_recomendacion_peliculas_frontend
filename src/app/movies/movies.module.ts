import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { LayoutPageMoviesComponent } from './pages/layout-page-movies/layout-page-movies.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageMovieComponent } from './pages/main-page-movie/main-page-movie.component';
import { RecommendationPageComponent } from './pages/recommendation-page/recommendation-page.component';
import { MyRatingsPageComponent } from './pages/my-ratings-page/my-ratings-page.component';

import { RatingModule } from 'primeng/rating';
import { ImageModule } from 'primeng/image';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { MovieImagePipe } from './pipes/movie-image.pipe';
import { CastImagePipe } from './pipes/cast-image.pipe';

@NgModule({
  declarations: [
    LayoutPageMoviesComponent,
    MoviePageComponent,
    MainPageMovieComponent,
    RecommendationPageComponent,
    MyRatingsPageComponent,
    MovieImagePipe,
    CastImagePipe
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    RatingModule,
    FormsModule,
    ImageModule,
    CarouselModule,
    DialogModule
  ]
})
export class MoviesModule { }
