import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { INFO, InfoInterface } from 'src/assets/ay-takvimi/info';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoCardComponent implements OnInit {
  @Input() date: Date | undefined;
  item: InfoInterface | undefined;

  constructor() {
    this.getRandomItem();
  }

  ngOnInit(): void {}

  getRandomItem() {
    const data = INFO;
    const length = data.length;

    const randomIndex = Math.floor(Math.random() * length);
    this.item = data[randomIndex];
  }
}
