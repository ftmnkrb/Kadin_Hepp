import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  hashtags = [
    'hashtag1',
    'hashtag2',
    'hashtag3',
    'hashtag4',
    'hashtag5',
    'hashtag6',
  ];

  constructor() {}

  ngOnInit(): void {}
}
