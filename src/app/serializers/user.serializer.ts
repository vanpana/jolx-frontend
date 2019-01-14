import {Serializer} from './serializer';
import {User} from '../models/user';

export class UserSerializer extends Serializer<User> {
  fromJson(json: any): User {
    if (json == null) {
      return null;
    }

    return {
      id: json._id,
      firstName: json.firstName,
      lastName: json.lastName,
      username: json.username,
      email: json.email,
      dob: json.dob,
      phone: json.phone,
      photo: json.photo,
      skillIds: json.skills,
      reviewsGivenIds: json.reviewsGiven,
      reviewsReceivedIds: json.reviewsReceived,
      jobsPosted: json.jobsPosted,
      postingsAppliedFor: json.postingsAppliedFor
    };
  }
}
