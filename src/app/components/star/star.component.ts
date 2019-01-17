import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-selector',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Input() fixedRating = undefined;
  @Output() starsChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.clickFixedRating();
  }

  starClicked(number) {
    if (!this.clickFixedRating()) {
      this.starsChanged.emit(number);
    }
  }

  clickFixedRating(): boolean {
    if (this.fixedRating !== undefined) {

      const star = document.getElementById(`${this.fixedRating}-stars`);
      if (star !== undefined && star != null) {
        star.click();
      }
    }

    return this.fixedRating !== undefined;
  }
}
