import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnderCunstructionComponent } from './shared/components/under-cunstruction.component';

import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { SelectLocationComponent } from './shared/components/select-location/select-location.component';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';

const PRIMENG = [BlockUIModule, ToastModule, DropdownModule];

@NgModule({
  declarations: [
    AppComponent,
    UnderCunstructionComponent,
    SelectLocationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    ...PRIMENG,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
  providers: [
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    { provide: BUCKET, useValue: environment.firebaseConfig.storageBucket },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
