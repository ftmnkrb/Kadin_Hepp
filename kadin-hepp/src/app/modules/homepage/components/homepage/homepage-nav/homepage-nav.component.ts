import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-homepage-nav',
  templateUrl: './homepage-nav.component.html',
  styleUrls: ['./homepage-nav.component.scss'],
})
export class HomepageNavComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
