import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {HttpService} from './http.service';
import {User} from '../models/user';
import {CookiesService} from './cookies.service';
import {UploaderService} from './uploader.service';

@Injectable()
export class AuthService implements OnDestroy {
  public isAuthenticated = false;
  public user: User;

  private jsonUserKey = 'user';
  private baseUserUrl = 'users';
  private loginUrl = 'login';
  private signupUrl = 'signup';
  private meUrl = this.baseUserUrl + '/me';

  public userAuthenticated: EventEmitter<User> = new EventEmitter<User>();
  public userLoggedOut: EventEmitter<void> = new EventEmitter<void>();

  constructor(private httpService: HttpService,
              private cookieService: CookiesService,
              private uploaderService: UploaderService) {
    // Subscribe so the user updates if it's modified on the server
    httpService.userChangedOnServer.subscribe( () => {
      console.log('i\'m fetching the userrrrrrrr');
      this.fetchIfAuthenticated();
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the event when the AuthService is destroyed
    this.httpService.userChangedOnServer.unsubscribe();
  }

  public constructAndPersistUser(data) {
    this.cookieService.saveUserCookie(data[this.jsonUserKey]);
    this.cookieService.saveJWTCookie(data['jwt']);
  }

  public login(identifier: string, password: string) {
    return this.httpService.postNoEvent(this.loginUrl, {
      identifier: identifier,
      password: password
    });
  }


  public register(firstName: string, lastName: string, email: string, username: string, password: string, file: File, success, error) {
    // First POST and register the user
    const registrationPromise = this.httpService.postNoEvent(this.signupUrl, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    });

    // If no file was provided, call the success and error
    if (file == null) {
      registrationPromise.subscribe(success, error);
    } else {
      // If the file was provided, POST the file and bind it to the user
      registrationPromise.subscribe((success_data) => {
        this.authenticate(success_data);
        this.uploaderService.upload(file, this.user.id, this.uploaderService.userKey).subscribe((data) => {
          this.user.photo = data;
          this.cookieService.saveUserCookie(this.user);
        }, error);
      });
    }
  }

  public authenticate(successData: any): void {
    this.constructAndPersistUser(successData);
    this.isAuthenticated = true;
    this.user = this.cookieService.getUserCookie();
    this.userAuthenticated.next(this.cookieService.getUserCookie());
  }

  public broadcastIfAuthenicated(): void {
    if (this.cookieService.hasJWTCookie()) {
      this.isAuthenticated = true;
      this.user = this.cookieService.getUserCookie();
      this.userAuthenticated.next(this.cookieService.getUserCookie());
    }
  }

  public logout(): void {
    this.cookieService.clearCookies();
    this.isAuthenticated = false;
    this.user = null;
    this.userLoggedOut.next();
  }

  private fetchIfAuthenticated() {
    if (this.isAuthenticated) {
      this.httpService.readNoEvent(this.meUrl).subscribe((successData) => {
        this.cookieService.saveUserCookie(successData);
      });
    }
  }
}
