import {Serializer} from './serializer';
import {Review} from '../models/review';
import {UserSerializer} from './user-serializer';

export class ReviewSerializer implements Serializer {

  userSerializer: UserSerializer = new UserSerializer();
  fromJson(json: any): Review {
    return {
      id: json.id,
      fromUser: this.userSerializer.fromJson(json.fromUser),
      toUser: this.userSerializer.fromJson(json.toUser),
      description: json.Description,
      stars: json.Stars
    };
  }

  toJson(review: Review): any {
    return {
      fromUser: review.fromUser,
      toUser: review.toUser,
      description: review.description,
      stars: review.stars
    };
  }
}
