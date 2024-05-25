import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { LoadingService } from './shared/services/loading.service';
import { Observable } from 'rxjs';
import { PrimeNGConfig } from 'primeng/api';

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
export class AppComponent implements OnInit {
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.minHeight') height = '100vh';

  constructor(
    private authService: AuthService,
    private primengConfig: PrimeNGConfig,
    public loadingService: LoadingService
  ) {
    this.authService.autoLogin();
  }

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      dayNames: [
        'Pazar',
        'Pazartesi',
        'Salı',
        'Çarşamba',
        'Perşembe',
        'Cuma',
        'Cumartesi',
      ],
      dayNamesShort: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
      dayNamesMin: ['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'],
      monthNames: [
        'Ocak',
        'Şubat',
        'Mart',
        'Nisan',
        'Mayıs',
        'Haziran',
        'Temmuz',
        'Ağustos',
        'Eylül',
        'Ekim',
        'Kasım',
        'Aralık',
      ],
      monthNamesShort: [
        'Oca',
        'Şub',
        'Mar',
        'Nis',
        'May',
        'Haz',
        'Tem',
        'Ağu',
        'Eyl',
        'Eki',
        'Kas',
        'Ara',
      ],
      today: 'Bugün',
      clear: 'Temizle',
      weekHeader: 'Hf',
      firstDayOfWeek: 1,
      dateFormat: 'dd.mm.yy',
      weak: 'Zayıf',
      medium: 'Orta',
      strong: 'Güçlü',
      passwordPrompt: 'Şifre giriniz',
    });
  }
}
