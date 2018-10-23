import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input('title') title;
  @Input('subtitle') subtitle;
  @Input('content') content = '😄';

  @Output() btnClicked = new EventEmitter<boolean>();

  constructor() {}

  handleBtnClick() {
    this.btnClicked.emit(true);
  }
}
