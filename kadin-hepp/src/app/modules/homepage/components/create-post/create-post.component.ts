import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  user$ = this.authService.userState.asObservable();

  @Input() styleClass = '';

  postForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  autoGrowTextZone(e: any) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 25 + 'px';
  }

  createPost() {
    const newPost: Post = {
      content: this.postForm.get('content')?.value,
      createdUser: this.authService.userState.getValue()!.user,
      likedUsers: null,
      commentCount: 0,
      createTime: new Date().getTime(),
    };

    this.postService
      .createPost(newPost)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.postForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
