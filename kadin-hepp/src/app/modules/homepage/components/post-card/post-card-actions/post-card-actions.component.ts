import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post';
import { ConfirmationService } from 'primeng/api';
import { PostService } from '../../../services/post.service';
import { take } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { CreatePostComponent } from '../../create-post/create-post.component';
import { CommonModule } from '@angular/common';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  standalone: true,
  imports: [CommonModule, ConfirmPopupModule, OverlayPanelModule],
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
      message: 'Silmek istediğinize emin misiniz?',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.postService.deletePost(this.post.id!).pipe(take(1)).subscribe();
      },
    });
  }

  editPost() {
    const ref = this.dialogService.open(CreatePostComponent, {
      header: 'Gönderi Düzenle',
      draggable: true,
      data: {
        post: this.post,
      },
    });
  }
}
