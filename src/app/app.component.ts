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

  constructor(private authService: AuthService,
              private postingsService: PostingsService) {
    this.authService.broadcastIfAuthenicated();
  }

  // getPostings() {
  //   this.postingsService.list().subscribe(success_data => console.log(success_data));
  // }
  //
  // postPosting() {
  //   const posting: Posting = {
  //     name: 'plimbare caini',
  //     description: 'asdf something something ceva',
  //     price: 50,
  //     user: null,
  //     startTime: new Date('2018-09-15T00:17:11.790Z'),
  //     duration: 60,
  //   };
  //
  //   this.postingsService.create(posting).subscribe(
  //     success_data => console.log(success_data),
  //       error_data => console.log('error', error_data)
  //   );
  // }
}
