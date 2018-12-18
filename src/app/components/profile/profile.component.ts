import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Posting} from '../../models/posting';
import {PostingsService} from '../../services/postings.service';
import {PostingsUpdated} from '../../models/message-bus-events/postings-updated';
import {MessageBus} from '../../services/message-bus';
import {UserPostingsUpdated} from '../../models/message-bus-events/user-postings-updated';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public postings: Posting[];
  constructor(public authService: AuthService,
              private postingsService: PostingsService,
              private messageBus: MessageBus
              ) {
    postingsService.fetchPostings();
    this.messageBus.observe(new UserPostingsUpdated(), (postingsUpdated) => {
      this.postings = postingsUpdated.postings;
    });
  }

  ngOnInit() {
  }

}
