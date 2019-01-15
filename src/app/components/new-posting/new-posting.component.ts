import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {PostingsService} from '../../services/postings.service';
import {AuthService} from '../../services/auth.service';
import {Posting} from '../../models/posting';
import {LocationStrategy} from '@angular/common';
import {MessageBus} from '../../services/message-bus';
import {UserMustUpdate} from '../../models/message-bus-events/user-must-update';
import {UserHasUpdated} from '../../models/message-bus-events/user-has-updated';

@Component({
  selector: 'app-new-posting',
  templateUrl: './new-posting.component.html',
  styleUrls: ['./new-posting.component.css']
})
export class NewPostingComponent implements OnInit {
  isCreating: boolean;
  name: string;
  description: string;
  price: number;
  user: User;
  duration: number;
  public file: File;

  constructor(
    private postingService: PostingsService,
    private authService: AuthService,
    private location: LocationStrategy,
    private messageBus: MessageBus
  ) {
  }

  ngOnInit() {
    this.isCreating = false;
  }

  public createPosting(startTime: string): void {
    const newPosting: Posting = {
      _id: undefined,
      name: this.name,
      description: this.description,
      price: this.price,
      user: this.authService.user,
      startTime: new Date(startTime),
      duration: this.duration,
      creatorUser: this.authService.user,
      applicantUsers: [],
      photo: null
    };

    // Set as creating
    this.isCreating = true;

    // Really create the posting
    this.postingService.createWithFile(newPosting, this.file, success_data => {
        // Pull the user from the server
        this.messageBus.publish(new UserMustUpdate());


        // Go back only after user has been updated TODO quite lame
        this.messageBus.observe(new UserHasUpdated(), () => {
          this.isCreating = false;
          location.assign('/home');
        });
      },

      error_data => {
        this.isCreating = false;
        alert(error_data);
        console.log(error_data);
      });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }

}
