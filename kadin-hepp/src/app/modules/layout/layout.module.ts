import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { LocationComponent } from 'src/app/shared/components/location/location.component';
import { LayoutComponent } from './layout.component';
import { DialogService } from 'primeng/dynamicdialog';
import { SidenavComponent } from 'src/app/shared/components/sidenav/sidenav.component';
import { FormsModule } from '@angular/forms';

import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

const PRIMENG = [MenuModule, PanelMenuModule, AccordionModule, ButtonModule];

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    LocationComponent,
    SidenavComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, FormsModule, ...PRIMENG],
  providers: [DialogService],
})
export class LayoutModule {}
