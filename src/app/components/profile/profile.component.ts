import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PostingsService} from '../../services/postings.service';
import {MessageBus} from '../../services/message-bus';
import {AppComponent} from '../../app.component';
import {UserHasUpdated} from '../../models/message-bus-events/user-has-updated';
import {UserMustUpdate} from '../../models/message-bus-events/user-must-update';
import {Skill} from '../../models/skill';
import {User} from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public skills: Skill[];
  jobsLoading: boolean;
  user: User;

  constructor(public authService: AuthService,
              private postingsService: PostingsService,
              private messageBus: MessageBus
              ) {
    // Assign user
    this.user = authService.user;
    // Fetch and display postings
    this.jobsLoading = true;
    postingsService.fetchPostings();
    this.skills = this.authService.user.skills;

    // Fetch user
    this.messageBus.publish(new UserMustUpdate());

    // Subscribe to user changes
    this.messageBus.observe(new UserHasUpdated(), (userHasUpdated) => {
      this.jobsLoading = false;
      this.user = userHasUpdated.user;
    });
  }

  ngOnInit() {
  }

  get serverRoute() {
    return AppComponent.serverRoute;
  }
}
