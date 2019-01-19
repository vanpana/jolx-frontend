import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {Posting} from '../../../../models/posting';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {RatingComponent} from '../../../rating/rating.component';
import {AppComponent} from '../../../../app.component';
import {UserService} from '../../../../services/user.service';

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

  constructor(
    public dialog: MatDialog,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userService.read(this.user.id).subscribe(user => this.user = user);
  }

  get serverRoute() {
    return AppComponent.serverRoute;
  }

  openReview() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      user: this.user,
      posting: this.posting
    };

    const dialogRef = this.dialog.open(RatingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
