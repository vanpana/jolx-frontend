import {Component, OnInit} from '@angular/core';
import {Error} from '../../models/error';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {UploaderService} from '../../services/uploader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public password: string;

  constructor(private authService: AuthService,
              private uploaderService: UploaderService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.userAuthenticated.subscribe(() => {
        this.router.navigateByUrl('/home');
      }
    );
  }

  signUp() {
    this.authService.register(this.firstName, this.lastName, this.email, this.username, this.password).subscribe(
      successData => {
        this.authService.authenticate(successData);
      },
      errorData => {
        const error: Error = errorData['error'];
        alert(error.message);
      }
    );
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    let uploaderToSubscribe = null;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      uploaderToSubscribe = this.uploaderService.upload(file);
    }
    if (uploaderToSubscribe != null) {
      uploaderToSubscribe.subscribe(success_data => {
          console.log('SUCC', success_data);
        },
        err_data => {
          console.log('ERR', err_data);
        });
    }
  }
}
