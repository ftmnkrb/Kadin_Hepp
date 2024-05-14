import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../homepage/homepage.module').then((m) => m.HomepageModule),
      },
      {
        path: 'lunar-calendar',
        loadChildren: () =>
          import('../ay-takvimi/ay-takvimi.module').then(
            (m) => m.AyTakvimiModule
          ),
      },
      {
        path: 'menstrual-calendar',
        loadChildren: () =>
          import('../regl/regl.module').then((m) => m.ReglModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
