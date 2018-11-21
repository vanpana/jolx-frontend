import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {CookiesService} from '../../services/cookies.service';
import {UploaderService} from '../../services/uploader.service';
import {HttpService} from '../../services/http.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
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

    // PUT the user
    this.userService.update(this.user).subscribe(
      success_data => {
        console.log(success_data);
      },
      error_data => {
        console.log(error_data);
      });
  }
}
