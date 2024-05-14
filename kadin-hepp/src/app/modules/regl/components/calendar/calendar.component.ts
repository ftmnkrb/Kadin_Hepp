import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';

import dayGridPlugin from '@fullcalendar/daygrid';
import { ReglModel } from '../../models/regl';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data: ReglModel | undefined;
  events: EventSourceInput | undefined;

  constructor(public loadingService: LoadingService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.calendarOptions = {
      ...this.calendarOptions,
      events: changes['data'].currentValue?.events,
    };
    this.events = changes['data'].currentValue?.events;
  }

  ngOnInit(): void {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
  };

  baseCalendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
  };

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
    console.log('ekrem');
  }
}
