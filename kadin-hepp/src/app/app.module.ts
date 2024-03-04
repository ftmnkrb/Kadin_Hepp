import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnderCunstructionComponent } from './shared/components/under-cunstruction.component';
import { HighlightHashtagDirective } from './shared/directives/highlight-hashtag.directive';

@NgModule({
  declarations: [
    AppComponent,
    UnderCunstructionComponent,
    HighlightHashtagDirective,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
