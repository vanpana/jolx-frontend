import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {User} from '../models/user';
import {CookiesService} from './cookies.service';
import {FileUpload} from '../models/file-upload';
import {UploaderService} from './uploader.service';

@Injectable()
export class AuthService {
  public isAuthenticated = false;
  public user: User;

  private loginUrl = 'login';
  private signupUrl = 'signup';

  public userAuthenticated: EventEmitter<User> = new EventEmitter<User>();
  public userLoggedOut: EventEmitter<void> = new EventEmitter<void>();

  constructor(private httpService: HttpService,
              private cookieService: CookiesService,
              private uploaderService: UploaderService) {
  }

  public constructAndPersistUser(data) {
    this.cookieService.saveUserCookie(data['user']);
    this.cookieService.saveJWTCookie(data['jwt']);
  }

  public login(identifier: string, password: string) {
    return this.httpService.post(this.loginUrl, {
      identifier: identifier,
      password: password
    });
  }

  public register(firstName: string, lastName: string, email: string, username: string, password: string, file: File, success, error) {
    // TODO Check if file not null
    this.uploaderService.upload(file).subscribe(success_data => {
        const file_data: FileUpload = success_data[0];

        return this.httpService.post(this.signupUrl, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: password,
          photo: file_data.id
        }).subscribe(success, error);
      },
      err_data => {
        // TODO Handle error
        console.log('ERR', err_data);
      });


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
}
