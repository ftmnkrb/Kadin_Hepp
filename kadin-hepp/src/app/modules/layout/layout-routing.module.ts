import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AboutUsComponent } from '../auth/components/about-us/about-us.component';

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
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'ask-ai',
        loadChildren: () =>
          import('../ask-ai/ask-ai.module').then((m) => m.AskAiModule),
      },
    ],
  },
  {
    path: 'hakkimizda',
    component: AboutUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
