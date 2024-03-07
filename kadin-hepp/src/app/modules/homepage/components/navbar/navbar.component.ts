import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  search(e: any) {
    const value = e.target.value;
    if (!value) return;
    this.router.navigate(['/']);
    e.target.value = '';
  }

  logout() {
    this.authService.logout();
  }
}
