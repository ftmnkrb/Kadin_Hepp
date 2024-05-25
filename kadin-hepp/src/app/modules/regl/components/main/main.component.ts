import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ReglService } from '../../services/regl.service';
import { take } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { EventSourceInput } from '@fullcalendar/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  regl$ = this.reglService.regl$.asObservable();

  constructor(
    private dialogService: DialogService,
    private reglService: ReglService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.userState.getValue()?.user;
    if (user?._id) this.reglService.getReglByUserId(user._id).subscribe();
  }

  reglSec() {
    const ref = this.dialogService.open(ReglSecComponent, {});
  }
}

@Component({
  selector: 'app-regl-sec',
  template: `
    <div class="p-3">
      <h3 class="text-center text-primary">Regl Gir</h3>
      <hr />
      <div class="d-flex flex-column mb-3">
        <label for="start">Başlangıç</label>
        <p-calendar
          inputId="start"
          [(ngModel)]="startDate"
          [minDate]="minDate"
          [baseZIndex]="999"
        ></p-calendar>
      </div>
      <div class="d-flex flex-column">
        <label for="end">Bitiş</label>
        <p-calendar
          inputId="end"
          [(ngModel)]="endDate"
          [minDate]="minDate"
        ></p-calendar>
      </div>
      <div class="mt-2">
        <button (click)="reglSec()" class="btn btn-primary text-white w-100">
          Seç
        </button>
      </div>
    </div>
  `,
})
export class ReglSecComponent {
  startDate = new Date();
  endDate = new Date();
  minDate = new Date(
    this.startDate.getFullYear(),
    this.startDate.getMonth(),
    1
  );
  constructor(
    private toastService: ToastService,
    private reglService: ReglService,
    private authService: AuthService,
    private ddref: DynamicDialogRef
  ) {
    console.log(this.minDate.toISOString());
  }

  reglSec() {
    const user = this.authService.userState.getValue()?.user;

    if (this.endDate <= this.startDate) {
      this.toastService.addSingle(
        'warn',
        'Bitiş tarihi başlangıç tarihininden büyük olmalıdır.'
      );
      return;
    }

    this.getReglDates();

    this.reglService
      .createRegl({
        events: this.getReglDates(),
        createdUser: user!,
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.ddref.close();
        },
      });
  }

  formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  getReglDates(): EventSourceInput {
    let events: EventSourceInput = [];

    for (let i = 0; i < 12; i++) {
      const start = this.startDate;
      let newStart = new Date(start);
      newStart.setDate(newStart.getDate() + 28 * i);
      newStart.setHours(newStart.getHours() + 12);

      const end = this.endDate;
      let newEnd = new Date(end);
      newEnd.setDate(newEnd.getDate() + 28 * i + 2);

      let newYumurtlamaStart = new Date(newEnd);
      newYumurtlamaStart.setDate(newYumurtlamaStart.getDate() + 5);

      let newYumurtlamaEnd = new Date(newEnd);
      newYumurtlamaEnd.setDate(newYumurtlamaEnd.getDate() + 11);

      events.push({
        start: this.formatDate(newStart),
        end: this.formatDate(newEnd),
        className: 'bg-danger event-text-cf',
        display: 'background',
        title: 'Regl',
      });

      events.push({
        start: this.formatDate(newYumurtlamaStart),
        end: this.formatDate(newYumurtlamaEnd),
        className: 'bg-secondary event-text-cf',
        display: 'background',
        title: 'Yumurtlama',
      });
    }

    return events;
  }
}
