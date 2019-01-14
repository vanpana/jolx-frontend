import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Posting} from '../../models/posting';
import {PostingsService} from '../../services/postings.service';
import {MessageBus} from '../../services/message-bus';
import {UserPostingsUpdated} from '../../models/message-bus-events/user-postings-updated';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  postings: Posting[];
  private jobsLoading: boolean;

  constructor(public authService: AuthService,
              private postingsService: PostingsService,
              private messageBus: MessageBus
              ) {
    // Fetch and display postings
    this.jobsLoading = true;
    postingsService.fetchPostings();
    this.messageBus.observe(new UserPostingsUpdated(), (postingsUpdated) => {
      this.jobsLoading = false;
      this.postings = postingsUpdated.postings;
    });
  }

  ngOnInit() {
    console.log('picture of usr', this.authService.user.photo);
  }

  get serverRoute() {
    return AppComponent.serverRoute;
  }
}
