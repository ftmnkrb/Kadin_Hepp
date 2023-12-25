import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UnderCunstructionComponent } from './shared/components/under-cunstruction.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'under-cunstruction', component: UnderCunstructionComponent },
  { path: '**', redirectTo: '/under-cunstruction' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
