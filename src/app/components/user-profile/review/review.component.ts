import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../models/review';
import {AppComponent} from '../../../app.component';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input()
  review: Review;

  constructor() { }

  ngOnInit() {
  }

  get serverRoute() {
    return AppComponent.serverRoute;
  }
}
