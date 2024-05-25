import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { User } from 'src/app/modules/auth/models/user';
import { TabViewComponent } from '../tab-view/tab-view.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ProfileInfoComponent,
    TabViewComponent,
  ],
  selector: 'app-my-profile',
  template: `
    <ng-container *ngIf="user">
      <app-profile-info [user]="user" styleClass="mb-3"></app-profile-info>
      <app-tab-view styleClass="my-2"></app-tab-view>
    </ng-container>
  `,
  providers: [ConfirmationService],
})
export class MyProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.userState.getValue()?.user;
    if (!this.user) {
      // hata user bulunamadı...
    }
  }
}
