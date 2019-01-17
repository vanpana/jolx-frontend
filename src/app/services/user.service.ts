import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {ResourceService} from './resource.service';
import {User} from '../models/user';
import {UserSerializer} from '../serializers/user.serializer';

@Injectable()
export class UserService extends ResourceService<User> {

  constructor(httpService: HttpService) {
    super(
      httpService,
      'users',
      new UserSerializer()
    );
  }
}

