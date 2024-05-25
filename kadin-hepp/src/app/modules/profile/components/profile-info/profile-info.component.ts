import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserState } from 'src/app/modules/auth/models/user';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  @Input() user: User | undefined;
  @Input() styleClass = '';

  constructor() {}

  ngOnInit(): void {}
}
