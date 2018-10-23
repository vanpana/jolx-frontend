import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {HttpClient} from '@angular/common/http';
import {UserLogin} from '../models/user-login';
import {UserLoginSerializer} from '../serializers/user-login-serializer';

@Injectable()
export class LoginService extends ResourceService<UserLogin> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:1337',
      'login',
      new UserLoginSerializer()
    );
  }

  doLogin(identifier: string, password: string) {
      return this.create({identifier: identifier, password: password});
  }
}
