import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../models/review';
import {ReviewService} from '../../../services/review.service';
import {ReviewSerializer} from '../../../serializers/review.serializer';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input()
  review;
  private reviewSerializer = new ReviewSerializer();

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    console.log('initial review', this.review);
    const reviewId = this.review._id; // TODO why _id and not id
    console.log('review id', reviewId);
    this.review = null;

    // Fetch full review
    this.reviewService.read(reviewId).subscribe((success_data) => {
      console.log('review arrived', success_data);
      this.review = this.reviewSerializer.fromJson(success_data);
    });
  }
}
