import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AyTakvimiRoutingModule } from './ay-takvimi-routing.module';
import { MainComponent } from './components/main/main.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';

const PRIMENG = [CalendarModule];

@NgModule({
  declarations: [MainComponent, InfoCardComponent],
  imports: [CommonModule, AyTakvimiRoutingModule, FormsModule, ...PRIMENG],
})
export class AyTakvimiModule {}
