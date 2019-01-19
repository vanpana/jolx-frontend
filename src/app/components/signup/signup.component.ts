import {Component, OnInit} from '@angular/core';
import {Error} from '../../models/error';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
  public file: File;
  public phoneNumber: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.authService.userAuthenticated.subscribe(() => {
        this.router.navigateByUrl('/home');
      }
    );
  }

  signUp() {
    this.authService.register(this.firstName, this.lastName, this.email, this.username, this.password, this.file, this.phoneNumber,
      successData => {
        this.authService.authenticate(successData);
      }, errorData => {
        const error: Error = errorData['error'];
        alert(error.message);
      });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }
}
