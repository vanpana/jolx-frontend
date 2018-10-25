import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Error} from '../../models/error';
import {LoginComponent} from '../login/login.component';
import {CookiesService} from '../../services/cookies.service';
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
}
