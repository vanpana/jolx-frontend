import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {Posting} from '../../../../models/posting';
import {ReviewComponent} from '../../../user-profile/review/review.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RatingComponent} from '../../../rating/rating.component';

@Component({
  selector: 'app-applicants-list-item',
  templateUrl: './applicants-list-item.component.html',
  styleUrls: ['./applicants-list-item.component.css']
})
export class ApplicantsListItemComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  posting: Posting;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openReview() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      user: this.user,
      posting: this.posting
    };

    const dialogRef = this.dialog.open(RatingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
