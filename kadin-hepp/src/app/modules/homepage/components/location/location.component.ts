import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  template: `
    <div [ngClass]="styleClass">
      <button class="btn btn-outline-primary change-lacation-btn">
        <span class="d-sm-inline-block d-none">Alanya</span>
        <i class="fa-solid fa-location-dot ms-sm-2"></i>
      </button>
    </div>
  `,
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  @Input() styleClass = '';
  constructor() {}

  ngOnInit(): void {}
}
