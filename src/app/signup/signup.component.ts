import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';

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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  signUp() {
    this.userService.doSignup(this.firstName, this.lastName, this.email, this.username, this.password).subscribe(
      success_data => {
        console.log('Succ', success_data);
      },
      error_data => {
        console.log('Err', error_data);
      }
    );
  }
}
