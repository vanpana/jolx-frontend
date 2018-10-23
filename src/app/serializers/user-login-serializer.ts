import {Serializer} from './serializer';
import {UserLogin} from '../models/user-login';

export class UserLoginSerializer implements Serializer {
  fromJson(json: any): any {
    // We don't really care about this
  }

  toJson(userLogin: UserLogin): any {
    return {
      identifier: userLogin.identifier,
      password: userLogin.password
    };
  }
}
