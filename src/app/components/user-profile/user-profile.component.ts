import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Posting} from '../../models/posting';
import {Skill} from '../../models/skill';
import {interval} from 'rxjs/observable/interval';

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
    interval(0.5 * 1000).subscribe(() => this.updateReviews());
  }

  setUserFromUrl() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(({urlAfterRedirects}: NavigationEnd) => {
        const id = urlAfterRedirects.split('/')[2];
        this.getUser(id);
      });
  }

  updateReviews() {
    if (this.user !== undefined) {
      this.userService.read(this.user.id).subscribe(
        user => {
          user.reviewsReceived.forEach(review => {
            if (this.user.reviewsReceived.filter(r => r._id === review._id).length === 0) {
              this.user.reviewsReceived.push(review);
            }
          });

          this.user.reviewsReceived.forEach(review => {
            if (user.reviewsReceived.filter(r => r._id === review._id).length === 0) {
              this.user.reviewsReceived.splice(this.user.reviewsReceived.indexOf(review), 1);
            }
          });
        }
      );
    }
  }

  getUser(id) {
    this.userService.read(id).subscribe(
      user => {
        this.user = user;
      }
    );
  }

}
