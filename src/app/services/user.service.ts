import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class UserService {
  httpService: HttpService;
  private loginUrl = 'login';
  private signupUrl = 'signup';

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  doLogin(identifier: string, password: string) {
    return this.httpService.post(this.loginUrl, {identifier: identifier, password: password});
  }

  doSignup(firstName: string, lastName: string, email: string, username: string, password: string) {
    return this.httpService.post(this.signupUrl, {
      firstName: firstName, lastName: lastName, email: email, username: username,
      password: password
    });
  }
}
