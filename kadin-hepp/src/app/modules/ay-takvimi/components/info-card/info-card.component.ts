import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { INFO, InfoInterface } from 'src/assets/ay-takvimi/info';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCardComponent implements OnInit, OnChanges {
  @Input() date: Date | undefined;
  item: InfoInterface | undefined;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const date = new Date(changes['date'].currentValue)
      .toISOString()
      .split('T')[0];
    console.log(date);
    this.getRandomItem(date);
  }

  ngOnInit(): void {}

  getRandomItem(day: string) {
    const localStorageItem = localStorage.getItem(`ay-takvimi-${day}`);
    if (localStorageItem) {
      this.item = JSON.parse(localStorageItem);
      return;
    }

    const data = INFO;
    const length = data.length;

    const randomIndex = Math.floor(Math.random() * length);
    this.item = data[randomIndex];
    localStorage.setItem(`ay-takvimi-${day}`, JSON.stringify(this.item));
  }
}
