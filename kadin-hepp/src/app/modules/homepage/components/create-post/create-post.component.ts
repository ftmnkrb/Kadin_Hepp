import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  user$ = this.authService.userState.asObservable();

  @Input() styleClass = '';

  user:any

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.userState.subscribe(r=>{
    //   this.user = r?.user;
    // })
  }

  autoGrowTextZone(e: any) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 25 + 'px';
  }
}
