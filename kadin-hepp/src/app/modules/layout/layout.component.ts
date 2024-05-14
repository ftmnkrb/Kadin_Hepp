import { Component, OnInit } from '@angular/core';
import { PostService } from '../homepage/services/post.service';
import { Subject, filter, take, takeUntil } from 'rxjs';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';

@Component({
  selector: 'app-layout',
  template: `
    <ng-container *ngIf="!isCalendarView; else hideForCalendar">
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
    </ng-container>

    <ng-template #hideForCalendar>
      <ng-container *ngIf="!isregl; else hideForRegl">
        <router-outlet></router-outlet>
      </ng-container>
    </ng-template>

    <ng-template #hideForRegl>
      <app-navbar></app-navbar>

      <div class="homepage-main-container">
        <div class="container-xxl">
          <div class="row my-0">
            <div class="col-xl-3 col-auto sticky" style="min-height: 100vh">
              <app-sidenav></app-sidenav>
            </div>
            <div class="col-xl-9 col border-start p-3">
              <div class="homepage-content-container">
                <router-outlet></router-outlet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
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
  private destroy$ = new Subject<void>();
  hashtags$ = this.postService.hastags$.asObservable();

  isCalendarView = false;
  isregl = false;

  constructor(private postService: PostService, private router: Router) {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        const url = event?.url as string;
        if (url.includes('calendar')) {
          this.isCalendarView = true;
          if (url.includes('menstrual')) this.isregl = true;
          else this.isregl = false;
          console.log(this.isregl);
        } else {
          this.isregl = false;
          this.isCalendarView = false;
        }
      });
  }

  ngOnInit(): void {
    this.postService.getHashtags().pipe(take(1)).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
