import {Component} from '@angular/core';
import {ReviewService} from './services/review.service';
import {AuthService} from './services/auth.service';
import {Posting} from './models/posting';
import {PostingsService} from './services/postings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private authService: AuthService,
              private postingsService: PostingsService) {
    this.authService.broadcastIfAuthenicated();
  }

  getPostings() {
    this.postingsService.list().subscribe(success_data => console.log(success_data));
  }
}
