import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'lunar-calendar',
    loadChildren: () =>
      import('./modules/ay-takvimi/ay-takvimi.module').then(
        (m) => m.AyTakvimiModule
      ),
  },
  // { path: 'under-cunstruction', component: UnderCunstructionComponent },
  // { path: '**', redirectTo: '/under-cunstruction' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
