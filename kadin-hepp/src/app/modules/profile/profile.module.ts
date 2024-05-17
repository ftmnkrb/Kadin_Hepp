import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PostCardComponent } from '../homepage/components/post-card/post-card.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MyProfileComponent,
    ProfileRoutingModule,
    PostCardComponent,
  ],
})
export class ProfileModule {}
