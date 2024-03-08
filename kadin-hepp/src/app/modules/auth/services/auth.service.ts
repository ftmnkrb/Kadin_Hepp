import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginPayoad, LoginResponse, User, UserState } from '../models/user';
import { BehaviorSubject, Observable, exhaustMap, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState = new BehaviorSubject<UserState | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(user: User): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}user/register`, user)
      .pipe(
        tap((res) => {
          alert('Kayıt Başarılı');
          this.router.navigate(['/auth']);
        })
      );
  }

  signIn(payload: LoginPayoad): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}user/login`, payload)
      .pipe(
        tap((res) => {
          this.userState.next(res);
          localStorage.setItem('activeUser', JSON.stringify(res));
          this.router.navigate(['/']);
        })
      );
  }

  isTokenExpired(token: string | undefined): boolean {
    if (!token) {
      return true;
    } else {
      const decodedToken = jwtDecode(token);

      return decodedToken.exp && Date.now() >= decodedToken.exp * 1000
        ? true
        : false;
    }
  }

  autoLogin() {
    const user = localStorage.getItem('activeUser');

    if (user) {
      const parsedUser = JSON.parse(user);
      this.userState.next(parsedUser);
    }
  }

  logout() {
    localStorage.removeItem('activeUser');
    this.userState.next(null);
    this.router.navigate(['/auth']);
  }
}
