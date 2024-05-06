import { Component, OnInit } from '@angular/core';
import { PostService } from '../homepage/services/post.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-layout',
  template: `
    <app-navbar></app-navbar>

    <div class="homepage-main-container">
      <div class="container-xxl">
        <div class="row my-0">
          <div class="col-xl-3 col-auto sticky" style="min-height: 100vh">
            <app-sidenav></app-sidenav>
          </div>
          <div class="col-xl-6 col border-end border-start p-3">
            <div class="homepage-content-container">
              <router-outlet></router-outlet>
            </div>
          </div>
          <div class="col-xl-3 col-2 d-md-block d-none sticky">
            <span
              *ngFor="let hashtag of hashtags$ | async"
              class="badge bg-primary m-1"
              >{{ hashtag }}</span
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .homepage-main-container {
        padding-top: 5.5rem;
      }

      .sticky {
        align-self: flex-start;
        position: sticky !important;
        top: 5.5rem;
      }
    `,
  ],
})
export class LayoutComponent implements OnInit {
  hashtags$ = this.postService.hastags$.asObservable();

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getHashtags().pipe(take(1)).subscribe();
  }
}
