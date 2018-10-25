import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Error} from '../../models/error';
import {LoginComponent} from '../login/login.component';
import {CookiesService} from '../../services/cookies.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;

  constructor(private userService: UserService,
              private cookieService: CookiesService) {
  }

  ngOnInit() {
  }

  signUp() {
    this.userService.doSignup(this.firstName, this.lastName, this.email, this.username, this.password).subscribe(
      success_data => {
        LoginComponent.constructAndPersistUser(success_data, this.cookieService);
      },
      error_data => {
        const error: Error = error_data['error'];

        // TODO Do whatever with the error
      }
    );
  }
}
