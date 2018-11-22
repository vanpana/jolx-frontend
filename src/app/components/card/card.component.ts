import {Component, Input, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';
import {AuthService} from '../../services/auth.service';
import {PostingsService} from '../../services/postings.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  posting: Posting;

  constructor(private authService: AuthService,
              private postingService: PostingsService) {
  }

  ngOnInit(): void {
  }

  apply() {
    // TODO If user tried to apply, redirect him to login
    this.postingService.userAppliesForPosting(this.posting.id).subscribe((successData) => {
      console.log(successData);
    }, (errorData) => {
      console.log(errorData);
    });
  }

  unapply() {
    this.postingService.userUnAppliesForPosting(this.posting.id);
  }

  /**
   * Returns whether the user has applied for the current posting.
   */
  userApplied(): Boolean {
    if (!this.authService.isAuthenticated) {
      return false;
    }

    if (this.authService.user.postingsAppliedForIds == null) {
      return false;
    }

    return this.authService.user.postingsAppliedForIds.indexOf(this.posting.id) > -1;
  }
}
