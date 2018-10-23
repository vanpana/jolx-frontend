import {Serializer} from './serializer';
import {User} from '../models/user';

export class UserSerializer implements Serializer {
  fromJson(json: any): User {
    return {
      id: json.id,
      firstName: json.Firstname,
      lastName: json.Lastname,
      username: json.Username,
      dob: new Date(json.Dob),
      phone: json.Phone,
      skillIds: json.skills,
      reviewsGivenIds: json.reviewsGiven,
      reviewsReceivedIds: json.reviewsReceived
    };
  }

  toJson(user: User): any {
    return {};
  }
}
