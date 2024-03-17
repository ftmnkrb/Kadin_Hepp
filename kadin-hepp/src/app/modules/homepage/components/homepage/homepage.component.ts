import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  allPosts$: Observable<Post[]> = this.postService.allPosts$.asObservable();

  hashtags = [
    'hashtag1',
    'hashtag2',
    'hashtag3',
    'hashtag4',
    'hashtag5',
    'hashtag6',
  ];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().pipe(take(1)).subscribe();
  }
}
