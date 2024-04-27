import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnderCunstructionComponent } from './shared/components/under-cunstruction.component';
import { HighlightHashtagDirective } from './shared/directives/highlight-hashtag.directive';

import { BlockUIModule } from 'primeng/blockui';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UnderCunstructionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BlockUIModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
