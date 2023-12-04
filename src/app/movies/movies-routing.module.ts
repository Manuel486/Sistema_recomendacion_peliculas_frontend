import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageMoviesComponent } from './pages/layout-page-movies/layout-page-movies.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { MainPageMovieComponent } from './pages/main-page-movie/main-page-movie.component';
import { RecommendationPageComponent } from './pages/recommendation-page/recommendation-page.component';
import { MyRatingsPageComponent } from './pages/my-ratings-page/my-ratings-page.component';
// localhost:4200/heroes
const routes: Routes = [
  {
    path: '',
    component: LayoutPageMoviesComponent,
    children: [
      { path: 'principal', component: MainPageMovieComponent },
      { path: 'recomendacion', component: RecommendationPageComponent },
      { path: 'valoraciones', component: MyRatingsPageComponent },
      { path: 'pelicula/:id', component: MoviePageComponent },
      { path: '**', redirectTo: 'principal' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
