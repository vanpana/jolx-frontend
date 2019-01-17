import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {CookiesService} from '../../services/cookies.service';
import {UploaderService} from '../../services/uploader.service';
import {AuthService} from '../../services/auth.service';
import {AppComponent} from '../../app.component';
import {UserMustUpdate} from '../../models/message-bus-events/user-must-update';
import {MessageBus} from '../../services/message-bus';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User;
  file: File;

  constructor(private authService: AuthService,
              private uploaderService: UploaderService,
              private cookieService: CookiesService,
              private messageBus: MessageBus) {
    this.user = cookieService.getUserCookie();
    console.log('User in constructor', this.user);
  }

  ngOnInit() {
    console.log('img', this.user);
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }

  update() {
    // PUT the user
    this.authService.update(this.user, this.file, success_data => {
        // Pull user data from the server
        this.messageBus.publish(new UserMustUpdate());
        location.assign('/profile');
        console.log('user updated');
      },
      error_data => {
        console.log(error_data);
      });
  }

  get serverRoute() {
    return AppComponent.serverRoute;
  }
}
