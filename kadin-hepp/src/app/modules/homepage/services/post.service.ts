import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { BehaviorSubject, Observable, exhaustMap, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  allPosts$ = new BehaviorSubject<Post[]>([]);

  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.firebaseUrl}/posts.json`).pipe(
      map((res) => {
        let posts: Post[] = [];

        for (const key in res) {
          posts.push({ ...res[key], id: key });
        }
        return posts.sort((a, b) => b.createTime - a.createTime);
      }),
      tap((res) => {
        console.log(res);
        this.allPosts$.next(res);
      })
    );
  }

  createPost(body: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(`${environment.firebaseUrl}/posts.json`, body)
      .pipe(
        exhaustMap((res) => {
          console.log(res);
          return this.getPostById(res.name);
        }),
        tap((post) => {
          this.allPosts$.next([post, ...this.allPosts$.getValue()]);
        })
      );
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(
      `${environment.firebaseUrl}/posts/${postId}.json`
    );
  }
}
