import { Component } from '@angular/core';
import {ReviewService} from './services/review.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private reviewService: ReviewService) {}

  getReviews() {
    this.reviewService.list().subscribe(reviews => console.log(reviews));
  }
}
