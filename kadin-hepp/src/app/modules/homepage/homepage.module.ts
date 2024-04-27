import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LocationComponent } from './components/location/location.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { HomepageLayoutComponent } from './components/layout.component';
import { HomepageNavComponent } from './components/homepage/homepage-nav/homepage-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightHashtagDirective } from 'src/app/shared/directives/highlight-hashtag.directive';

@NgModule({
  declarations: [
    HomepageLayoutComponent,
    CreatePostComponent,
    HomepageComponent,
    LocationComponent,
    NavbarComponent,
    PostCardComponent,
    HomepageNavComponent,
    HighlightHashtagDirective
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomepageModule {}
