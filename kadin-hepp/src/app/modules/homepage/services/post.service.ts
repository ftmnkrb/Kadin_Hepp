import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, Post } from '../models/post';
import { BehaviorSubject, Observable, exhaustMap, map, take, tap } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';
import { convertFirebaseResponse } from 'src/app/shared/utils/helpers';
import { UserLocationService } from 'src/app/shared/services/user-location.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  allPosts$ = new BehaviorSubject<Post[]>([]);
  hastags$ = new BehaviorSubject<string[]>([]);

  searchText = new BehaviorSubject<string>('');
  selectedCategory = new BehaviorSubject<Category | null>(null);

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private uls: UserLocationService
  ) {}

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.firebaseUrl}/posts.json`).pipe(
      map((res) => {
        let posts: Post[] = convertFirebaseResponse<typeof res, Post>(res);

        return posts.sort((a, b) => b.createTime - a.createTime);
      }),
      tap((res) => {
        this.allPosts$.next(this.filterByLocation(res));
      })
    );
  }

  getPostsWithoutFiltering(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.firebaseUrl}/posts.json`).pipe(
      map((res) => {
        let posts: Post[] = convertFirebaseResponse<typeof res, Post>(res);

        return posts.sort((a, b) => b.createTime - a.createTime);
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
          this.getAllPosts().pipe(take(1)).subscribe();

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
          this.getAllPosts().pipe(take(1)).subscribe();
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
        this.allPosts$.next(this.filterByLocation(filteredPosts));
        this.searchText.next(text);
      });
  }

  resetFilters() {
    this.searchText.next('');
    this.selectedCategory.next(null);
    this.getAllPosts().pipe(take(1)).subscribe();
  }

  selectCategory(category: Category | null) {
    this.selectedCategory.next(category);
    this.search(this.searchText.getValue());
  }

  syncFilterByLocation() {
    this.uls.activeUserLocation$.subscribe((location) => {
      this.getAllPosts()
        .pipe(take(1))
        .subscribe((allPosts) => {
          if (location?.location.hood) {
            const v = allPosts.filter(
              (p) =>
                p.location?.mahalle?.value?.name ==
                location.location?.hood?.name
            );
            this.allPosts$.next(v);
          } else if (location?.location.district) {
            const v = allPosts.filter(
              (p) =>
                p.location?.ilce?.value?.name ==
                location.location?.district?.name
            );
            this.allPosts$.next(v);
          } else if (location?.location.city) {
            const v = allPosts.filter(
              (p) => p.location?.il?.name == location.location?.city?.name
            );
            this.allPosts$.next(v);
          } else {
            this.allPosts$.next(allPosts);
          }
        });
    });
  }

  filterByLocation(posts: Post[]): Post[] {
    const location = this.uls.activeUserLocation$.getValue();
    if (location?.location.hood) {
      const v = posts.filter(
        (p) => p.location?.mahalle?.value?.name == location.location?.hood?.name
      );
      return v;
    } else if (location?.location.district) {
      const v = posts.filter(
        (p) =>
          p.location?.ilce?.value?.name == location.location?.district?.name
      );
      return v;
    } else if (location?.location.city) {
      const v = posts.filter(
        (p) => p.location?.il?.name == location.location?.city?.name
      );
      return v;
    } else {
      return posts;
    }
  }
}
