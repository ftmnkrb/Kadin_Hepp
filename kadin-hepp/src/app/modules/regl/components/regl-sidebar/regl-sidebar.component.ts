import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ReglModel } from '../../models/regl';

@Component({
  selector: 'app-regl-sidebar',
  templateUrl: './regl-sidebar.component.html',
  styleUrls: ['./regl-sidebar.component.scss'],
})
export class ReglSidebarComponent implements OnInit, OnChanges {
  @Input() data: ReglModel | undefined;

  today = this.formatDate(new Date());

  isRegl = false;
  isYumurtlama = false;
  daysUntilNextRegl: number = -1;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const reglData: ReglModel = changes?.['data'].currentValue;
    console.log(reglData);

    console.log(reglData.events);
    this.isRegl = this.isTodayRegl(reglData.events as any, this.today);
    this.isYumurtlama = this.isTodayYumurtlama(
      reglData.events as any,
      this.today
    );

    if (!this.isRegl) {
      this.daysUntilNextRegl = this.calculateDaysUntilNextRegl(
        reglData.events as any,
        this.today
      );
    }
  }

  ngOnInit(): void {
    console.log(this.today);
  }

  formatDate(date: Date) {
    return date.toISOString().split('T')[0];
  }

  isTodayRegl(reglPeriods: any[], today: string): boolean {
    reglPeriods = reglPeriods.filter((i) => i.title == 'Regl');
    const todayDate = new Date(today);

    return reglPeriods.some((period) => {
      const startDate = new Date(period.start);
      const endDate = new Date(period.end);

      return todayDate >= startDate && todayDate <= endDate;
    });
  }

  isTodayYumurtlama(reglPeriods: any[], today: string): boolean {
    reglPeriods = reglPeriods.filter((i) => i.title == 'Yumurtlama');
    const todayDate = new Date(today);

    return reglPeriods.some((period) => {
      const startDate = new Date(period.start);
      const endDate = new Date(period.end);

      return todayDate >= startDate && todayDate <= endDate;
    });
  }

  calculateDaysUntilNextRegl(reglPeriods: any[], today: string): number {
    reglPeriods = reglPeriods.filter((i) => i.title == 'Regl');
    const todayDate = new Date(today);
    let daysUntilNextRegl: number | null = null;

    for (const period of reglPeriods) {
      const startDate = new Date(period.start);

      if (todayDate < startDate) {
        const diffTime = Math.abs(startDate.getTime() - todayDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (daysUntilNextRegl === null || diffDays < daysUntilNextRegl) {
          daysUntilNextRegl = diffDays;
        }
      }
    }

    return daysUntilNextRegl !== null ? daysUntilNextRegl : -1; // Eğer bir sonraki regl dönemi yoksa -1 döner
  }
}
