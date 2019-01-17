import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Posting} from '../../models/posting';
import {Skill} from '../../models/skill';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();

  public postings: Posting[];
  public skills: Skill[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.setUserFromUrl();
  }

  ngOnInit() {
  }

  setUserFromUrl() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        const id = urlAfterRedirects.split('/')[2];
        this.getUser(id);
      });
  }

  getUser(id) {
    this.userService.read(id).subscribe(
      user => {
        this.user = user;

        if (this.user.reviewsReceived !== undefined) {
          this.user.reviewsReceived.forEach(review => this.setFromUserForReview(review));
        }
      }
    );
  }

  setFromUserForReview(review) {
    this.userService.read(review.fromUser).subscribe(
      user => {
        console.log('fromusersetinreview', user);
        review.fromUser = user;
        console.log(user);
      }
    );
  }
}
