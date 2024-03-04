import { Component } from '@angular/core';

@Component({
  selector: 'homepage-layout',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class HomepageLayoutComponent {}
