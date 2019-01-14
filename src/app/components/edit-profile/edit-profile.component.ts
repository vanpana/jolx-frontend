import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {CookiesService} from '../../services/cookies.service';
import {UploaderService} from '../../services/uploader.service';
import {AuthService} from '../../services/auth.service';
import {AppComponent} from '../../app.component';
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

  constructor(private authService: AuthService,
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
      this.uploaderService.upload(this.file, this.user.id, this.uploaderService.userKey);
    }

    console.log('user id', this.user.id);

    // PUT the user
    this.authService.update(this.user, this.file, success_data => {
        console.log(success_data);
        // this.locationService.back();
      },
      error_data => {
        console.log(error_data);
      });
  }

  get serverRoute() {
    return AppComponent.serverRoute;
  }
}
