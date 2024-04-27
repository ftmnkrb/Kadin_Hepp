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
        this.allPosts$.next(res);
      })
    );
  }

  createPost(body: Post): Observable<Post> {
    return this.http
      .post<{ name: string }>(`${environment.firebaseUrl}/posts.json`, body)
      .pipe(
        exhaustMap((res) => {
          return this.getPostById(res.name);
        }),
        tap((post) => {
          this.allPosts$.next([post, ...this.allPosts$.getValue()]);
        })
      );
  }

  getPostById(postId: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.firebaseUrl}/posts/${postId}.json`)
      .pipe(
        map((post) => {
          return { ...post, id: postId };
        })
      );
  }

  deletePost(postId: string): Observable<Post> {
    return this.http
      .delete<Post>(`${environment.firebaseUrl}/posts/${postId}.json`)
      .pipe(
        tap(() => {
          this.allPosts$.next(
            this.allPosts$.getValue().filter((p) => p.id !== postId)
          );
        })
      );
  }

  likePost(postId: string, userId: string): Observable<Post> {
    return this.getPostById(postId).pipe(
      exhaustMap((_post) => {
        const likedUsers: string[] = _post.likedUsers
          ? [..._post.likedUsers, userId]
          : [userId];

        const up: Post = {
          ..._post,
          likedUsers,
        };
        return this.http.put<Post>(
          `${environment.firebaseUrl}/posts/${_post.id}.json`,
          up
        );
      }),
      tap((res) => {
        this.allPosts$.next(
          this.allPosts$.getValue().map((p) => {
            if (p.id == res.id) return res;
            return p;
          })
        );
      })
    );
  }

  disLike(postId: string, userId: string): Observable<Post> {
    return this.getPostById(postId).pipe(
      exhaustMap((_post) => {
        const likedUsers: string[] =
          _post.likedUsers?.filter((u) => u !== userId) || [];

        const up: Post = {
          ..._post,
          likedUsers,
        };
        return this.http.put<Post>(
          `${environment.firebaseUrl}/posts/${_post.id}.json`,
          up
        );
      }),
      tap((res) => {
        this.allPosts$.next(
          this.allPosts$.getValue().map((p) => {
            if (p.id == res.id) return res;
            return p;
          })
        );
      })
    );
  }
}
