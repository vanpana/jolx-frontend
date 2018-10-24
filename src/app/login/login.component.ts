import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {LoginService} from '../services/login.service';

declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  private loginService: LoginService;
  public email: string;
  public password: string;

  constructor(loginService: LoginService) {
    this.loginService = loginService;

    this.initFb();
  }


  ngOnInit() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }

  initFb() {
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    window.fbAsyncInit = () => {
      console.log('fbasyncinit');

      FB.init({
        appId: '306354349965234',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
      // This is where we do most of our code dealing with the FB variable like adding an observer to check when the user signs in

      FB.Event.subscribe('auth.statusChange', (response => {
        if (response.status === 'connected') {
          // use the response variable to get any information about the user and to see the tokens about the users session
        }
      }));
    };
  }

  loginWithCredentials() {
    console.log(this.email);
    this.loginService.doLogin(this.email, this.password).subscribe(
      success => {
        console.log('SUC', success);
      },
      err => {
        console.log('ERR', err);
      }
    );
  }

// public socialSignIn(socialPlatform: string) {
//   let socialPlatformProvider;
//   if (socialPlatform === 'facebook') {
//     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
//   }
//
//   this.socialAuthService.signIn(socialPlatformProvider).then(
//     (userData) => {
//       console.log(socialPlatform + ' sign in data : ', userData);
//       // TODO Sign-in with userData
//     }
//   );
// }

}
