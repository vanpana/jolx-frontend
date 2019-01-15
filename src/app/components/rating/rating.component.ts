import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ReviewSerializer} from '../../serializers/review.serializer';
import {ReviewService} from '../../services/review.service';
import {AuthService} from '../../services/auth.service';
import {Posting} from '../../models/posting';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  workerUser: User;
  posting: Posting;

  description: string;

  isSending: boolean;
  /**
   * Get the number of stars displayed in the count span
   */
  get stars(): number {
    return parseInt(document.getElementById('count').innerText);
  }

  constructor(private authService: AuthService,
    private reviewService: ReviewService) { }

  ngOnInit() {
    this.isSending = false;

    // TODO fetch the correct posting
    this.posting = new Posting();
    this.posting.id = '5bf6d34164a16f851e6cf526';
    this.posting.name = 'Cutting trees';

    // TODO fetch the correct user
    this.workerUser = new User();
    this.workerUser.id = '5bcf796430f85b07d7af4d14';
    this.workerUser.firstName = 'Dorinel';
  }

  submit() {
    this.isSending = true;
    this.reviewService.addReview(this.authService.user._id, this.workerUser.id, this.posting.id, this.stars, this.description)
      .subscribe((s) => {
        this.isSending = false;
        console.log('review added', s);
      }, (e) => {
        this.isSending = false;
        console.log('review not added', e);
      });
  }

}
