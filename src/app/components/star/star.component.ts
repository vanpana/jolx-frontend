import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-selector',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Output() starsChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  starClicked(number) {
    this.starsChanged.emit(number);
  }

}
