import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './auth/guards/auth.guard';
import { CanActivateGuardPublic } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'autenticacion',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [CanActivateGuardPublic]
  },
  {
    path: 'peliculas',
    loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule),
    canActivate: [CanActivateGuard]
  },
  {
    path: '',
    redirectTo: 'peliculas',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'autenticacion'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
