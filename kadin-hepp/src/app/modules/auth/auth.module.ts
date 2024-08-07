import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, AuthLayoutComponent, AboutUsComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
