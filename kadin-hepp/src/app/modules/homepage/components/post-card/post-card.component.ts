import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { take } from 'rxjs';
import { MenuItem } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PostCardActionsComponent } from './post-card-actions/post-card-actions.component';

@Component({
  standalone: true,
  imports: [CommonModule, PostCardActionsComponent],
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent implements OnInit {
  @Input() styleClass = '';
  @Input() post: Post | undefined;

  items: MenuItem[] = [];

  authUser$ = this.authService.userState.asObservable();

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private cr: ChangeDetectorRef,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { separator: true },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] },
    ];
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe((res) => {});
  }

  like(postId: string | undefined) {
    if (this.isLikedByUser()) {
      this.disLike(postId);
      return;
    }

    const userId = this.authService.userState.getValue()?.user._id;
    this.postService
      .likePost(postId!, userId!)
      .pipe(take(1))
      .subscribe({
        next: (r) => {},
      });
  }

  disLike(postId: string | undefined) {
    const userId = this.authService.userState.getValue()?.user._id;
    this.postService
      .disLike(postId!, userId!)
      .pipe(take(1))
      .subscribe({
        next: (r) => {},
      });
  }

  isLikedByUser(): boolean {
    const userId = this.authService.userState.getValue()!.user._id;
    return this.post?.likedUsers?.includes(userId || '') || false;
  }

  openImage(img: string) {
    this.dialogService.open(ShowImageComponent, {
      closeOnEscape: true,
      dismissableMask: true,
      data: {
        img,
      },
    });
  }
}

@Component({
  selector: 'app-show-image',
  template: ` <img [src]="imgUrl" alt="" /> `,
})
export class ShowImageComponent {
  imgUrl: string;
  constructor(private ddConf: DynamicDialogConfig) {
    this.imgUrl = ddConf.data.img;
  }
}
