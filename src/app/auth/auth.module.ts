import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutPageAuthComponent } from './pages/layout-page-auth/layout-page-auth.component';
import { LoginPageAuthComponent } from './pages/login-page-auth/login-page-auth.component';
import { RegisterPageAuthComponent } from './pages/register-page-auth/register-page-auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutPageAuthComponent,
    LoginPageAuthComponent,
    RegisterPageAuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
