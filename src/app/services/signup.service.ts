import {Injectable} from '@angular/core';
import {ResourceService} from './resource.service';
import {UserSignup} from '../models/user-signup';
import {HttpClient} from '@angular/common/http';
import {UserSignupSerializer} from '../serializers/user-signup-serializer';

@Injectable()
export class SignupService extends ResourceService<UserSignup> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:1337',
      'signup',
      new UserSignupSerializer()
    );
  }

  doSignup(username: string, email: string, password: string) {
    return this.create({username: username, email: email, password: password});
  }
}
