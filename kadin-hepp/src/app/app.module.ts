import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { HomepageNavComponent } from './components/homepage/homepage-nav/homepage-nav.component';
import { UnderCunstructionComponent } from './shared/components/under-cunstruction.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    PostCardComponent,
    HomepageNavComponent,
    UnderCunstructionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
