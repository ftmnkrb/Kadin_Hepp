import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card-actions',
  templateUrl: './post-card-actions.component.html',
  styleUrls: ['./post-card-actions.component.scss'],
})
export class PostCardActionsComponent implements OnInit {
  @Input() isCreatedByMe: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
