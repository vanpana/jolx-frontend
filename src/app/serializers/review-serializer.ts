import {Serializer} from './serializer';
import {Review} from '../models/review';
import {UserSerializer} from './user-serializer';

export class ReviewSerializer extends Serializer<Review> {
  private userSerializer: UserSerializer = new UserSerializer;

  fromJson(json: any): Review {
    return {
      fromUser: this.userSerializer.fromJson(json.fromUser),
      toUser: this.userSerializer.fromJson(json.toUser),
      stars: json.stars,
      description: json.description
    };
  }

}
