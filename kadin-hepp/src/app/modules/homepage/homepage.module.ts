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

import { PostCardActionsComponent } from './components/post-card/post-card-actions/post-card-actions.component';

import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

const PRIMENG = [
  SplitButtonModule,
  OverlayPanelModule,
  ConfirmDialogModule,
  ConfirmPopupModule,
  DynamicDialogModule,
];

@NgModule({
  declarations: [
    HomepageLayoutComponent,
    CreatePostComponent,
    HomepageComponent,
    LocationComponent,
    NavbarComponent,
    PostCardComponent,
    HomepageNavComponent,
    HighlightHashtagDirective,
    PostCardActionsComponent,
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...PRIMENG,
  ],
  providers: [
    ConfirmationService,
    DialogService,
    DynamicDialogRef,
    DynamicDialogConfig,
  ],
})
export class HomepageModule {}
