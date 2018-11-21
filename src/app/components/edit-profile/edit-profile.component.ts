import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {CookiesService} from '../../services/cookies.service';
import {UploaderService} from '../../services/uploader.service';
import {HttpService} from '../../services/http.service';
import {UserService} from '../../services/user.service';
// import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  // providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User;
  file: File;

  constructor(private userService: UserService,
              private uploaderService: UploaderService,
              private cookieService: CookiesService) {
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
    // Update the photo if it has changed
    if (this.file != null) {
      this.uploaderService.upload(this.file, this.user._id, this.uploaderService.userKey);
    }

    console.log('user id', this.user._id);

    // PUT the user
    this.userService.update(this.user).subscribe(
      success_data => {
        console.log(success_data);
        // this.locationService.back();
      },
      error_data => {
        console.log(error_data);
      });
  }
}
