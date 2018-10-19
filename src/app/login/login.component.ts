import {Component, OnInit} from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider,
} from 'angular5-social-login';

declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor() {
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


  ngOnInit() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
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
