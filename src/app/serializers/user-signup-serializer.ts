import {Serializer} from './serializer';
import {User} from '../models/user';
import {UserSignup} from '../models/user-signup';

export class UserSignupSerializer implements Serializer {
  fromJson(json: any): any {
    // We don't really care about this
  }

  toJson(userSignup: UserSignup): any {
    return {
      username: userSignup.username,
      email: userSignup.email,
      password: userSignup.password
    };
  }
}
