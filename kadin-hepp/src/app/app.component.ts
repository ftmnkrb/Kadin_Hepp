import { AfterViewInit, Component, HostBinding } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { LoadingService } from './shared/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <ng-container *ngIf="loadingService.loading$ | async as loading">
      <p-blockUI [blocked]="loading">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </p-blockUI>
    </ng-container>
    <p-toast
      position="bottom-center
"
    ></p-toast>
  `,
  styles: [],
})
export class AppComponent {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.minHeight') height = '100vh';

  constructor(
    private authService: AuthService,
    public loadingService: LoadingService
  ) {
    this.authService.autoLogin();
  }
}
