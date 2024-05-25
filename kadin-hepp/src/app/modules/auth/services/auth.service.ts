import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginPayoad, LoginResponse, User, UserState } from '../models/user';
import {
  BehaviorSubject,
  Observable,
  catchError,
  of,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';
import { UserLocationService } from 'src/app/shared/services/user-location.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userState = new BehaviorSubject<UserState | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private uls: UserLocationService,
    private ts: ToastService
  ) {}

  signUp(user: User): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}user/register`, user).pipe(
      tap((res) => {
        alert('Kayıt Başarılı');
        this.router.navigate(['/auth']);
        console.log(res);
        this.uls.saveDefaultByUserId(res.data._id!).pipe(take(1)).subscribe();
      })
    );
  }

  signIn(payload: LoginPayoad): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}user/login`, payload)
      .pipe(
        tap((res) => {
          console.log(res);
          this.userState.next(res);
          localStorage.setItem('activeUser', JSON.stringify(res));
          this.router.navigate(['/']);
          this.uls.getUserLocation(res.user._id!).pipe(take(1)).subscribe();

          this.uls
            .getUserLocation(res.user._id!)
            .pipe(take(1))
            .subscribe({
              next: (r) => {
                if (!r) {
                  this.uls
                    .saveDefaultByUserId(res.user._id!)
                    .pipe(take(1))
                    .subscribe();
                }
              },
            });
        }),
        catchError((err) => {
          this.ts.addSingle('error', 'Kullanıcı adı veya şifre hatalı.');
          return throwError(() => err);
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
      const parsedUser: UserState = JSON.parse(user);
      this.userState.next(parsedUser);
      this.uls.getUserLocation(parsedUser.user._id!).pipe(take(1)).subscribe();
    } else {
      this.logout();
    }
  }

  logout() {
    localStorage.removeItem('activeUser');
    this.userState.next(null);
    this.router.navigate(['/auth']);
  }
}
