import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Observable, filter, map, take } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UserLocationService } from 'src/app/shared/services/user-location.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  allPosts$: Observable<Post[]> = this.postService.allPosts$.asObservable();
  loading$ = this.loadingService.loading$;

  constructor(
    private postService: PostService,
    private loadingService: LoadingService
  ) {
    this.postService.syncFilterByLocation();
  }

  postL = false;

  ngOnInit(): void {
    this.postService.getAllPosts().pipe(take(1)).subscribe();

    this.postService
      .getPostsWithoutFiltering()
      .pipe(
        take(1),
        map((posts) => !!posts.length)
      )
      .subscribe((r) => {
        this.postL = r;
      });
  }

  clearSearch() {
    this.postService.resetFilters();
  }
}
