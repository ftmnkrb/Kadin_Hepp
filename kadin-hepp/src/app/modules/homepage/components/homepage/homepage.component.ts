import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Observable, map, take } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  allPosts$: Observable<Post[]> = this.postService.allPosts$.asObservable();

  hashtags$: Observable<string[]> = this.allPosts$.pipe(
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
    })
  );

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().pipe(take(1)).subscribe();
  }
}
