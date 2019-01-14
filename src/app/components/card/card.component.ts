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
    if (!this.authService.isAuthenticated) {
      alert('You are not authenticated');
      return;
    }
    this.postingService.userAppliesForPosting(this.posting._id).subscribe(() => {
      console.log('APPLY', 'has clickd apply');
      return;
    });
  }

  unapply() {
    this.postingService.userUnAppliesForPosting(this.posting._id).subscribe((s) => {
      console.log(s);
    }, (e) => {
      console.log(e);
    });
  }

  /**
   * Returns whether the user has applied for the current posting.
   */
  userApplied(): Boolean {
    if (!this.authService.isAuthenticated) {
      return false;
    }

    if (this.authService.user.postingsAppliedFor == null) {
      return false;
    }

    return this.authService.user.postingsAppliedFor.map((posting) => posting._id).indexOf(this.posting._id) > -1;
  }
}
