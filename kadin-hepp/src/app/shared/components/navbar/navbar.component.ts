import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/modules/homepage/services/post.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private postService: PostService) {}

  searchText: string = '';

  ngOnInit(): void {
    this.postService.searchText.subscribe({
      next: (res) => {
        if (res) this.searchText = res;
      },
    });
  }

  search(e: any) {
    const value = e.target.value;
    console.log(value);
    if (!value) return;
    this.router.navigate(['/']);
    this.postService.search(value);
  }

  searchTextChange() {
    if (this.searchText.length == 0) {
      this.postService.search('');
    }
  }
}
