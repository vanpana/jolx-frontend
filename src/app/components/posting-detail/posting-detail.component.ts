import {Component, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';
import {ActivatedRoute} from '@angular/router';
import {PostingsService} from '../../services/postings.service';
import {MessageBus} from '../../services/message-bus';
import {PostingsUpdated} from '../../models/message-bus-events/postings-updated';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-posting-detail',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.css']
})
export class PostingDetailComponent implements OnInit {
  public id: string;
  posting: Posting;
  loading: boolean;
  isOwnPosting: boolean;
  hasUserApplied: boolean;

  constructor(private route: ActivatedRoute,
              private postingsService: PostingsService,
              private authService: AuthService,
              private messageBus: MessageBus) {
  }

  ngOnInit() {
    // Fetch the id from the route
    this.id = this.route.snapshot.paramMap.get('id');

    // Toggle loading indicator
    this.loading = true;

    // Start loading data
    this.postingsService.fetchPostings();

    // Listen for change
    this.messageBus.observe(new PostingsUpdated(), (postingsUpdated) => {
      postingsUpdated.postings.forEach((posting) => {
        if (posting._id === this.id) {
          console.log('posting', posting);
          // Disable loading and set the posting
          this.loading = false;
          this.posting = posting;

          // Check if own posting
          if (this.authService.user == null) {
            return;
          } else if (this.posting.creatorUser.id === this.authService.user.id) {
            this.isOwnPosting = true;
            this.hasUserApplied = false;
          } else if (this.authService.user.postingsAppliedFor.map((p) => p._id).indexOf(this.posting._id) > -1) {
            this.isOwnPosting = false;
            this.hasUserApplied = true;
          }
        }
      });
    });
  }

  apply() {

  }

  unapply() {

  }
}
