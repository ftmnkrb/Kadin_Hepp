import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  today = new Date();
  threeDaysLater = new Date();
  days: Date[] | undefined;

  constructor() {
    // 3 gün sonrasını ayarla
    this.threeDaysLater.setDate(this.today.getDate() + 3);
    this.generateDateRange();
  }

  dateChanged(isPrev?: boolean) {
    if (isPrev) {
      this.today.setDate(this.today.getDate() - 1);
    } else {
      this.today.setDate(this.today.getDate() + 1);
    }
    // Tarih değiştiğinde 3 günlük aralığı güncelle
    this.generateDateRange();
    this.today = new Date(this.today);
  }

  generateDateRange() {
    this.days = [];
    let currentDate = new Date(this.today); // Bugünün kopyasını al

    for (let i = 0; i < 3; i++) {
      this.days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Bir sonraki güne geç
    }
  }
}
