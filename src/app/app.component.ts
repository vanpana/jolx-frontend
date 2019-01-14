import {Component} from '@angular/core';
import {ReviewService} from './services/review.service';
import {AuthService} from './services/auth.service';
import {Posting} from './models/posting';
import {PostingsService} from './services/postings.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService) {
    this.authService.broadcastIfAuthenticated();
  }
}
