import {Component, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';
import {ActivatedRoute, Router} from '@angular/router';
import {PostingsService} from '../../services/postings.service';
import {MessageBus} from '../../services/message-bus';
import {PostingsUpdated} from '../../models/message-bus-events/postings-updated';
import {AuthService} from '../../services/auth.service';
import {UserHasUpdated} from '../../models/message-bus-events/user-has-updated';
import {PostingFetched} from '../../models/message-bus-events/posting-fetched';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-posting-detail',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.css']
})
export class PostingDetailComponent implements OnInit {
  public id: string;
  posting: Posting;
  loading: boolean;
  isOwnPosting = false;
  public hasUserApplied: boolean;

  constructor(private route: ActivatedRoute,
              private postingsService: PostingsService,
              private authService: AuthService,
              private messageBus: MessageBus,
              private router: Router) {
  }

  ngOnInit() {
    // Fetch the id from the route
    this.id = this.route.snapshot.paramMap.get('id');

    // Toggle loading indicator
    this.loading = true;

    // Start loading data
    this.postingsService.fetchPosting(this.id);

    // Listen for change
    this.messageBus.observe(new PostingFetched(), (postingFetched) => {
      if (postingFetched.posting._id === this.id) {
        // Disable loading and set the posting
        this.loading = false;
        this.posting = postingFetched.posting;
        this.checkPropertiesOnObserve();
        this.messageBus.observe(new UserHasUpdated(), () => {
          this.checkPropertiesOnObserve();
        });
      }
    });
  }

  checkPropertiesOnObserve() {
    this.checkIfUserPosting();
    if (!this.isOwnPosting) {
      this.checkIfUserApplied();
    }
  }

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
    if (!this.authService.isAuthenticated) {
      this.isOwnPosting = false;
      return;
    }

    if (this.authService.user.jobsPosted == null) {
      this.isOwnPosting = false;
      return;
    }

    this.isOwnPosting = this.authService.user.jobsPosted.map((posting) => posting._id).indexOf(this.posting._id) > -1;
  }

  apply() {
    if (!this.authService.isAuthenticated) {
      this.router.navigate(['/']);
      return;
    }
    this.postingsService.userAppliesForPosting(this.posting._id).subscribe(() => {
      return;
    });
  }

  unapply() {
    this.postingsService.userUnAppliesForPosting(this.posting._id).subscribe((s) => {
      return;
    }, (e) => {
    });
  }

  deletePosting() {
    this.postingsService.delete(this.posting._id).subscribe((s) => {
      this.router.navigate(['/']);
      alert('Successfully deleted');
      return;
    }, (e) => {
    });
  }

  get serverRoute(): string {
    return AppComponent.serverRoute;
  }
}
