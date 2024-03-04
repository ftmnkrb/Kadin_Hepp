import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.minHeight') height = '100vh';
}
