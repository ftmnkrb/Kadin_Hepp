import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { take } from 'rxjs';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input() styleClass = '';

  updateMode = false;
  user$ = this.authService.userState.asObservable();

  postForm: FormGroup = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private postService: PostService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      this.updateMode = true;
      this.postForm.patchValue(this.config.data.post);
    }
    console.log(this.config.data);
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 25 + 'px';
  }

  submit() {
    if (this.postForm.invalid) return;

    if (this.updateMode) this.updatePost();
    else this.createPost();
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

  updatePost() {
    const prev = this.config.data.post as Post;
    const updatedPost: Post = {
      ...prev,
      content: this.postForm.get('content')?.value,
    };
    console.log(updatedPost);

    this.postService
      .updatePost(updatedPost)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.ref.close();
        },
      });
  }
}
