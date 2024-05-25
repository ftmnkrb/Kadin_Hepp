import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReglRoutingModule } from './regl-routing.module';
import {
  MainComponent,
  ReglSecComponent,
} from './components/main/main.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ReglSidebarComponent } from './components/regl-sidebar/regl-sidebar.component';

@NgModule({
  declarations: [MainComponent, CalendarComponent, ReglSecComponent, ReglSidebarComponent],
  imports: [
    CommonModule,
    ReglRoutingModule,
    FullCalendarModule,
    CalendarModule,
    FormsModule,
  ],
})
export class ReglModule {}
