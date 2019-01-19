import {Component, Input, OnInit} from '@angular/core';
import {Posting, PostingStatus} from '../../models/posting';
import {AuthService} from '../../services/auth.service';
import {PostingsService} from '../../services/postings.service';
import {MessageBus} from '../../services/message-bus';
import {UserHasUpdated} from '../../models/message-bus-events/user-has-updated';
import {AppComponent} from '../../app.component';
import {PostingFetched} from '../../models/message-bus-events/posting-fetched';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  posting: Posting;
  isUserPosting: Boolean;
  hasUserApplied: Boolean;

  constructor(private authService: AuthService,
              private postingService: PostingsService,
              private messageBus: MessageBus) {
  }

  ngOnInit(): void {
    this.postingService.fetchPosting(this.posting._id);
    this.checkPropertiesOnObserve();

    this.messageBus.observe(new UserHasUpdated(), () => {
      this.checkPropertiesOnObserve();
    });

    this.messageBus.observe(new PostingFetched(), (postingFetched) => {
      if (postingFetched.posting._id === this.posting._id) {
        this.posting = postingFetched.posting;
      }
    });
  }

  checkPropertiesOnObserve() {
    this.checkIfUserPosting();

    if (!this.isUserPosting) {
      this.checkIfUserApplied();
    }
  }

  apply() {
    if (!this.authService.isAuthenticated) {
      alert('You are not authenticated');
      return;
    }
    this.postingService.userAppliesForPosting(this.posting._id).subscribe(() => {
      return;
    });
  }

  unapply() {
    this.postingService.userUnAppliesForPosting(this.posting._id).subscribe((s) => {
    }, (e) => {
    });
  }

  /**
   * Returns whether the user has applied for the current posting.
   */
  checkIfUserApplied() {
    if (!this.authService.isAuthenticated) {
      this.hasUserApplied = false;
      return;
    }

    if (this.authService.user.postingsAppliedFor == null) {
      this.hasUserApplied = false;
      return;
    }

    this.hasUserApplied = this.authService.user.postingsAppliedFor.map((posting) => posting._id).indexOf(this.posting._id) > -1;
  }

  checkIfUserPosting() {
    if (this.authService.user === undefined || !this.authService.isAuthenticated) {
      this.isUserPosting = false;
      return;
    }

    if (this.authService.user.jobsPosted == null) {
      this.isUserPosting = false;
      return;
    }

    if (this.authService.user.jobsPosted == null) {
      this.isUserPosting = false;
      return;
    }

    this.isUserPosting = this.authService.user.jobsPosted.map((posting) => posting._id).indexOf(this.posting._id) > -1;
  }

  isPostingOpen(): boolean {
    return this.posting.status === PostingStatus.Open;
  }

  get serverRoute(): string {
    return AppComponent.serverRoute;
  }
}
