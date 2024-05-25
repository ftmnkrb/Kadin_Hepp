import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { SelectLocationComponent } from 'src/app/shared/components/select-location/select-location.component';
import { UserLocationService } from '../../services/user-location.service';

@Component({
  selector: 'app-location',
  template: `
    <div *ngIf="location$ | async as data" [ngClass]="styleClass">
      <button
        (click)="selectLocation()"
        class="btn btn-outline-primary change-lacation-btn"
      >
        <span class="d-sm-inline-block d-none">
          {{
            data?.location?.hood?.name ||
              data?.location?.district?.name ||
              data?.location?.city?.name
          }}
        </span>
        <i class="fa-solid fa-location-dot ms-sm-2"></i>
      </button>
    </div>
  `,
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() styleClass = '';

  location$ = this.uls.activeUserLocation$.asObservable();

  constructor(
    private dialogService: DialogService,
    private uls: UserLocationService
  ) {}

  ngOnInit(): void {}

  selectLocation() {
    this.dialogService.open(SelectLocationComponent, {
      width: '400px',
    });
  }
}
