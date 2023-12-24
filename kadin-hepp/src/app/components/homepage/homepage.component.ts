import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  hashtags = [
    'kuafor',
    'kuafor',
    'kuafor',
    'kuafor',
    'kuafor',
    'kuafor',
    'kuafor',
    'kuafor',
  ];
  
  constructor() {}

  ngOnInit(): void {}
}
