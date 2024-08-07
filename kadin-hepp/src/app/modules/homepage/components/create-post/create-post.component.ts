import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PostService } from '../../services/post.service';
import { Categories, Category, Post, PostLocation } from '../../models/post';
import { take } from 'rxjs';
import {
  DynamicDialogRef,
  DynamicDialogConfig,
  DialogService,
} from 'primeng/dynamicdialog';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SelectLocationComponent } from 'src/app/shared/components/select-location/select-location.component';

// TODO => şuan submit edilmese de fotoğraflar database'de kalıyor.

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

  selectedFile: File | null = null;
  images: string[] = [];
  downloadURL!: Observable<string>;

  categories = Categories;

  selectedCategory: Category | null = null;
  selectedLocation: PostLocation | null = null;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private storage: AngularFireStorage,
    private loadingService: LoadingService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    if (this.config.data) {
      const post: Post = this.config.data.post;
      this.updateMode = true;
      this.postForm.patchValue(post);
      this.selectedCategory = post.category;
      this.selectedLocation = post.location;
      if (post.images) this.images = post.images;
    }
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 25 + 'px';
  }

  submit() {
    if (this.postForm.invalid || !this.selectedCategory) return;

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
      images: this.images.length ? this.images : [],
      category: this.selectedCategory!,
      location: this.selectedLocation!,
    };

    this.postService
      .createPost(newPost)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.postForm.reset();
          this.selectedCategory = null;
          this.selectedLocation = null;
          this.images = [];
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
      images: this.images,
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

  // firebase

  onFileSelected(event: any) {
    if (this.images.length >= 2) {
      alert('max 2 images');
      return;
    }
    this.loadingService.setLoading(true);
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `PostImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`PostImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              console.log(url);
              this.images.push(url);
            }
            console.log(this.images);
          });
          this.loadingService.setLoading(false);
        })
      )
      .subscribe((url: any) => {
        if (url) {
          console.log(url);
        }
      });
  }

  deleteFile(url: string) {
    this.storage
      .refFromURL(url)
      .delete()
      .subscribe({
        next: () => {
          this.images = this.images.filter((i) => i !== url);
        },
      });
  }

  selectLocation() {
    this.dialogService
      .open(SelectLocationComponent, {
        width: '400px',
        data: {
          forPost: true,
          l: this.selectedLocation,
        },
      })
      .onClose.subscribe((r: PostLocation) => {
        if (r) {
          console.log(r);
          this.selectedLocation = r;
          console.log(this.selectedLocation);
        }
      });
  }
}
