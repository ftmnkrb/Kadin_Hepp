import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReglModel } from '../models/regl';
import { Observable, exhaustMap, tap, map, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/shared/services/toast.service';
import { convertFirebaseResponse } from 'src/app/shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class ReglService {
  regl$ = new BehaviorSubject<ReglModel | undefined>(undefined);

  constructor(private http: HttpClient, private toastService: ToastService) {}

  createRegl(body: ReglModel): Observable<ReglModel> {
    // regl verisi var update
    const regl = this.regl$.getValue();
    if (regl) {
      return this.http
        .put<ReglModel>(
          `${environment.firebaseUrl}/regls/${regl.id}.json`,
          body
        )
        .pipe(
          exhaustMap((res) => {
            console.log(res);
            return this.getReglById(regl.id!);
          }),
          tap((regl) => {
            console.log(regl);
            this.regl$.next(regl);

            this.toastService.addSingle('info', 'Regl Bilgileri Güncellendi');
          })
        );
    }

    return this.http
      .post<{ name: string }>(`${environment.firebaseUrl}/regls.json`, body)
      .pipe(
        exhaustMap((res) => {
          return this.getReglById(res.name);
        }),
        tap((regl) => {
          this.regl$.next(regl);

          this.toastService.addSingle('success', 'Regl Girme İşlemi Başarılı');
        })
      );
  }

  getReglById(id: string): Observable<ReglModel> {
    return this.http
      .get<ReglModel>(`${environment.firebaseUrl}/regls/${id}.json`)
      .pipe(
        map((regl) => {
          return { ...regl, id: id };
        })
      );
  }

  getReglByUserId(id: string): Observable<ReglModel | undefined> {
    return this.getAllRegls().pipe(
      map((regls) => {
        return regls.find((r) => r.createdUser._id === id);
      }),
      tap((res) => {
        this.regl$.next(res);
      })
    );
  }

  getAllRegls(): Observable<ReglModel[]> {
    return this.http
      .get<ReglModel[]>(`${environment.firebaseUrl}/regls.json`)
      .pipe(
        map((res) => {
          let regls: ReglModel[] = convertFirebaseResponse<
            typeof res,
            ReglModel
          >(res);

          return regls;
        })
      );
  }
}
