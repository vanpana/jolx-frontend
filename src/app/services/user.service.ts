import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {User} from '../models/user';

@Injectable()
export class UserService {
  private usersUrl = 'users';

  constructor(private httpService: HttpService) {
  }

  update(user: User) {
    // Delete user email and username to avoid 400
    user.email = undefined;
    user.username = undefined;

    // PUT the user
    return this.httpService.update(this.usersUrl, user.id, user);
  }
}
