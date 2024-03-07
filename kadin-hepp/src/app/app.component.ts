import { Component, HostBinding } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.minHeight') height = '100vh';

  constructor(private authService: AuthService) {
    this.authService.autoLogin();
  }
}
