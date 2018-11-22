import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Error} from '../../models/error';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

declare var window: any;
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(private authService: AuthService,
              private router: Router) {

    this.initFb();
  }

  ngOnInit() {
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    this.authService.userAuthenticated.subscribe(() => {
        this.router.navigateByUrl('/home');
      }
    );
  }

  public initFb() {
    (function (d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    window.fbAsyncInit = () => {

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

  public loginWithCredentials() {
    this.authService.login(this.email, this.password).subscribe(
      successData => {
        console.log('Success data in login', successData);
        this.authService.authenticate(successData);
      },
      errorData => {
        const error: Error = errorData['error'];
        alert(error.message);
      }
    );
  }

  public keyDownEvent(event: any) {
    if (event.keyCode === 13) {
      this.loginWithCredentials();
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
