import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, Post } from '../models/post';
import { BehaviorSubject, Observable, exhaustMap, map, take, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { convertFirebaseResponse } from 'src/app/shared/utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  allPosts$ = new BehaviorSubject<Post[]>([]);
  hastags$ = new BehaviorSubject<string[]>([]);

  searchText = new BehaviorSubject<string>('');
  selectedCategory = new BehaviorSubject<Category | null>(null);

  constructor(private http: HttpClient, private toastService: ToastService) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.firebaseUrl}/posts.json`).pipe(
      map((res) => {
        let posts: Post[] = convertFirebaseResponse<typeof res, Post>(res);

        return posts.sort((a, b) => b.createTime - a.createTime);
      }),
      tap((res) => {
        this.allPosts$.next(res);
      })
    );
  }

  getActiveUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.firebaseUrl}/posts.json`).pipe(
      map((res) => {
        let posts: Post[] = convertFirebaseResponse<typeof res, Post>(res);

        return posts
          .filter((p) => p.createdUser._id == userId)
          .sort((a, b) => b.createTime - a.createTime);
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

          this.toastService.addSingle(
            'success',
            'Gönderi Başarıyla Oluşturuldu'
          );
        })
      );
  }

  updatePost(body: Post): Observable<Post> {
    return this.http
      .put<Post>(`${environment.firebaseUrl}/posts/${body.id}.json`, body)
      .pipe(
        exhaustMap((res) => {
          return this.getPostById(res.id!);
        }),
        tap((post) => {
          this.toastService.addSingle('info', 'Gönderi Başarıyla Güncellendi');
          this.allPosts$.next([
            ...this.allPosts$.getValue().map((p) => {
              if (p.id == post.id) return post;
              else return p;
            }),
          ]);
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
          this.toastService.addSingle('warn', 'Gönderi Başarıyla Silindi');
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

  getHashtags(): Observable<string[]> {
    return this.getAllPosts().pipe(
      map((posts) => {
        var regex = /#(\w+)/g;
        let res: string[] = [];

        posts.forEach((p) => {
          if (p.content.includes('#')) {
            const matches = p.content.match(regex);
            if (matches?.length) {
              matches.forEach((m) => {
                if (res.indexOf(m) <= -1) {
                  res.push(...matches);
                }
              });
            }
          }
        });

        return res;
      }),
      tap((hashtags) => {
        this.hastags$.next(hashtags);
      })
    );
  }

  search(text: string) {
    const category = this.selectedCategory.getValue();
    this.getAllPosts()
      .pipe(take(1))
      .subscribe((res) => {
        if (text == '') {
          this.searchText.next('');
        } else {
        }

        const filteredPosts = res
          .filter(
            (p) =>
              p.content
                .toLocaleLowerCase()
                .includes(text.toLocaleLowerCase()) ||
              p.createdUser.name
                .toLocaleLowerCase()
                .includes(text.toLocaleLowerCase())
          )
          .filter((p) => {
            if (category) {
              return p.category?.code == category.code;
            }
            return p;
          });
        this.allPosts$.next(filteredPosts);
        this.searchText.next(text);
      });
  }

  selectCategory(category: Category | null) {
    this.selectedCategory.next(category);
    this.search(this.searchText.getValue());
  }
}
