import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
// import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
      
    ],
  },
  { path: 'aboutus', component:AboutUsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
