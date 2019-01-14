import {Serializer} from './serializer';
import {Resource} from '../models/resource';
import {User} from '../models/user';

export class UserSerializer extends Serializer<User> {
  fromJson(json: any): User {
    if (json == null) {
      return null;
    }

    const user = new User();
    user.id = json._id;
    user.firstName = json.firstName;
    user.lastName = json.lastName;
    user.username = json.username;
    user.email = json.email;
    user.password = json.password;
    user.dob = json.dob;
    user.phone = json.phone;
    user.photo = json.photo;
    user.skillIds = json.skills;
    user.reviewsGivenIds = json.reviewsGiven;
    user.reviewsReceivedIds = json.reviewsReceived;
    user.jobsPosted = json.jobsPosted;
    user.postingsAppliedFor = json.postingsAppliedFor;

    return user;
  }
}
