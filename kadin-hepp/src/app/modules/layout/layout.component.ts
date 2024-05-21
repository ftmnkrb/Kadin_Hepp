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
import { MenuItem } from 'primeng/api';
import { Categories, Category } from '../homepage/models/post';

@Component({
  selector: 'app-layout',
  templateUrl: `./layout.component.html`,
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  private destroy$ = new Subject<void>();
  hashtags$ = this.postService.hastags$.asObservable();

  isCalendarView = false;
  isregl = false;

  selectedCategory$ = this.postService.selectedCategory.asObservable();

  items = Categories;

  constructor(private postService: PostService, private router: Router) {
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: any) => {
        const url = event?.url as string;
        if (url.includes('calendar') || url.includes('ai')) {
          this.isCalendarView = true;
          console.log(url.includes('ai'));
          if (url.includes('menstrual') || url.includes('ai'))
            this.isregl = true;
          else this.isregl = false;
          console.log(this.isregl);
        } else {
          this.isregl = false;
          this.isCalendarView = false;
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.destroy$.next();
  }

  selectItem(category: Category) {
    const v =
      this.postService.selectedCategory.getValue() == category
        ? null
        : category;
    this.postService.selectCategory(v);
  }
}
