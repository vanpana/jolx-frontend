import {Component} from '@angular/core';
import {ReviewService} from './services/review.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService,
              private reviewService: ReviewService) {
    this.authService.broadcastIfAuthenicated();
  }

  getReviews() {
    this.reviewService.list().subscribe(success_data => console.log(success_data));
  }
}
