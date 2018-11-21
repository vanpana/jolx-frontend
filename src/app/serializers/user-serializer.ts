import {Serializer} from './serializer';
import {Resource} from '../models/resource';
import {User} from '../models/user';

export class UserSerializer extends Serializer<User> {
  fromJson(json: any): User {
    return {
      firstName: json.firstName,
      lastName: json.lastName,
      username: json.username,
      dob: json.dob,
      phone: json.phone,
      email: json.email,
      skillIds: json.skills,
      reviewsGivenIds: json.reviewsGiven,
      reviewsReceivedIds: json.reviewsReceived
    };
  }
}
