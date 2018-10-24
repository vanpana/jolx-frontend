import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {LoginService} from '../services/login.service';
import {User} from '../models/user';
import {CookiesService} from '../services/cookies.service';

declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private loginService: LoginService,
              private cookieService: CookiesService) {

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
    this.loginService.doLogin(this.email, this.password).subscribe(
      success_data => {
        // Deserialize user and jwt
        const user: User = success_data['user'];
        const jwt: string = success_data['jwt'];

        // Persist user and jwt
        this.cookieService.saveUser(user);
        this.cookieService.setCookie(this.cookieService.jwtKey, jwt);

        console.log('===');
        console.log('JWT', this.cookieService.getCookie(this.cookieService.jwtKey));
      },
      err_data => {
        console.log('ERR', err_data);
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
