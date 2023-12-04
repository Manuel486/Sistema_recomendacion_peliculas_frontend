
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageAuthComponent } from './pages/layout-page-auth/layout-page-auth.component';
import { LoginPageAuthComponent } from './pages/login-page-auth/login-page-auth.component';
import { RegisterPageAuthComponent } from './pages/register-page-auth/register-page-auth.component';

// localhost:4200/auth
const routes: Routes = [
  {
    path: '',
    component: LayoutPageAuthComponent,
    children: [
      { path: 'login', component: LoginPageAuthComponent },
      { path: 'nueva-cuenta', component: RegisterPageAuthComponent },
      { path: '**', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AuthRoutingModule { }
