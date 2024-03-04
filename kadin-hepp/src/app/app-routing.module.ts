import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnderCunstructionComponent } from './shared/components/under-cunstruction.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/homepage/homepage.module').then(
        (m) => m.HomepageModule
      ),
  },
  { path: 'under-cunstruction', component: UnderCunstructionComponent },
  { path: '**', redirectTo: '/under-cunstruction' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
