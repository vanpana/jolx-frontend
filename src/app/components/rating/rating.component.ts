import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {ReviewService} from '../../services/review.service';
import {AuthService} from '../../services/auth.service';
import {Posting} from '../../models/posting';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
  user: User;
  posting: Posting;
}


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  stars = 3;
  description: string;
  isSending: boolean;

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    public dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.isSending = false;

    // Set description to nothing
    this.description = '';
  }

  submit() {
    this.isSending = true;
    this.reviewService.addReview(this.authService.user._id, this.data.user.id, this.data.posting.id, this.stars, this.description)
      .subscribe((s) => {
        this.isSending = false;
        console.log('review added', s);
        this.dialogRef.close();
      }, (e) => {
        this.isSending = false;
        console.log('review not added', e);
      });
  }

  setStars(number) {
    this.stars = number;
  }
}
