import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabViewModule } from 'primeng/tabview';
import { Observable, filter, map, take } from 'rxjs';
import { User } from 'src/app/modules/auth/models/user';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Post } from 'src/app/modules/homepage/models/post';
import { PostService } from 'src/app/modules/homepage/services/post.service';
import { PostCardComponent } from 'src/app/modules/homepage/components/post-card/post-card.component';

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [CommonModule, TabViewModule, PostCardComponent],
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss'],
})
export class TabViewComponent implements OnInit {
  @Input() styleClass = '';
  myPosts$: Observable<Post[]> | undefined;
  likedPosts$: Observable<Post[]> | undefined;
  user: User | undefined;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.userState.getValue()?.user;
    if (this.user?._id) {
      this.postService.getAllPosts().pipe(take(1)).subscribe();
      // this.myPosts$ = this.postService
      //   .getAllPosts()
      //   .pipe(
      //     map((posts) =>
      //       posts.filter((p) => p.createdUser._id === this.user?._id)
      //     )
      //   );
      this.myPosts$ = this.postService.allPosts$.pipe(
        map((posts) =>
          posts.filter((p) => p.createdUser._id === this.user?._id)
        )
      );
      this.likedPosts$ = this.postService.allPosts$.pipe(
        map((posts) =>
          posts.filter((p) => p.likedUsers?.includes(this.user?._id!))
        )
      );
    }
  }
}
