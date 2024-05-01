import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { ConfirmationService } from 'primeng/api';
import { PostService } from '../../../services/post.service';
import { take } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { CreatePostComponent } from '../../create-post/create-post.component';

@Component({
  selector: 'app-post-card-actions',
  templateUrl: './post-card-actions.component.html',
  styleUrls: ['./post-card-actions.component.scss'],
})
export class PostCardActionsComponent implements OnInit {
  @Input() isCreatedByMe: boolean = false;
  @Input() post!: Post;

  constructor(
    private confirmationService: ConfirmationService,
    private postService: PostService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  deletePost(event: Event) {
    this.confirmationService.confirm({
      icon: 'bi bi-exclamation-triangle-fill',
      target: event.target!,
      message: 'Are you sure that you want to proceed?',
      accept: () => {
        this.postService.deletePost(this.post.id!).pipe(take(1)).subscribe();
      },
    });
  }

  editPost() {
    const ref = this.dialogService.open(CreatePostComponent, {
      header: 'Edit Post',
      draggable: true,
      data: {
        post: this.post,
      },
    });
  }
}
