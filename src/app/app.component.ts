import { Component } from '@angular/core';
import {ReviewService} from './services/review.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private reviewService: ReviewService;
  title = 'app';

  constructor(reviewService: ReviewService) {
    this.reviewService = reviewService;
  }

  getReviews() {
    this.reviewService.getAll().subscribe(reviews => console.log(reviews));
  }
}
