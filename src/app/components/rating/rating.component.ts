import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {ReviewService} from '../../services/review.service';
import {AuthService} from '../../services/auth.service';
import {Posting, PostingStatus} from '../../models/posting';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PostingsService} from '../../services/postings.service';

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
    private postingService: PostingsService,
    public dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit() {
    this.isSending = false;

    // Set description to nothing
    this.description = '';
  }

  submit() {
    this.isSending = true;
    this.reviewService.addReview(this.authService.user._id, this.data.user.id, this.data.posting._id, this.stars, this.description)
      .subscribe((s) => {
        this.isSending = false;
        this.postingService.updatePostingStatus(this.data.posting._id, PostingStatus.Done).subscribe((s) => {
          console.log('updated to done', s);
        }, (e) => {
          console.log('not updated to done', e);
        });
        this.dialogRef.close();
      }, (e) => {
        this.isSending = false;
      });
  }

  setStars(number) {
    this.stars = number;
  }
}
