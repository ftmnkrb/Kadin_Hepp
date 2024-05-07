import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, exhaustMap, map, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { environment } from 'src/environments/environment';
import { convertFirebaseResponse } from 'src/app/shared/utils/helpers';
import { UserLocation } from '../models/user-location';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  activeUserLocation$ = new BehaviorSubject<UserLocation | null>(null);

  constructor(private http: HttpClient) {}

  saveDefaultByUserId(userId: string): Observable<UserLocation> {
    return this.http
      .get<any>('https://turkiyeapi.dev/api/v1/provinces?name=antalya')
      .pipe(
        exhaustMap((r) => {
          console.log(r);
          console.log(r.data[0]);
          console.log(r.data[0].districts[2]);
          return this.http
            .post<{ name: string }>(
              `${environment.firebaseUrl}/userLocations.json`,
              {
                userId: userId,
                location: {
                  city: r.data[0],
                  district: r.data[0].districts[2],
                },
              }
            )
            .pipe(
              exhaustMap((res) => {
                return this.getLocationById(res.name);
              }),
              tap((res) => {
                this.activeUserLocation$.next(res);
              })
            );
        })
      );
  }

  editUserLocation(body: UserLocation): Observable<UserLocation> {
    return this.http
      .put<{ name: string }>(
        `${environment.firebaseUrl}/userLocations/${body.id}.json`,
        body
      )
      .pipe(
        exhaustMap((res) => {
          return this.getLocationById(res.name);
        }),
        tap((res) => {
          this.activeUserLocation$.next(res);
        })
      );
  }

  getLocationById(id: string): Observable<UserLocation> {
    return this.http
      .get<UserLocation>(`${environment.firebaseUrl}/userLocations/${id}.json`)
      .pipe(
        map((location) => {
          return { ...location, id: id };
        })
      );
  }

  getUserLocation(userId: string): Observable<UserLocation | null> {
    return this.http
      .get<UserLocation[]>(`${environment.firebaseUrl}/userLocations.json`)
      .pipe(
        map((res) => {
          let locations = convertFirebaseResponse<typeof res, UserLocation>(
            res
          );
          console.log(locations);

          return locations.find((l) => l.userId == userId) || null;
        }),
        tap((l) => {
          console.log(l);
          this.activeUserLocation$.next(l);
        })
      );
  }
}
