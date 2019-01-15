import {Serializer} from './serializer';
import {Review} from '../models/review';
import {UserSerializer} from './user.serializer';
import {PostingSerializer} from './posting.serializer';

export class ReviewSerializer extends Serializer<Review> {
  private userSerializer: UserSerializer = new UserSerializer;
  private postingSerializer: PostingSerializer = new PostingSerializer();

  fromJson(json: any): Review {
    return {
      fromUser: this.userSerializer.fromJson(json.fromUser),
      toUser: this.userSerializer.fromJson(json.toUser),
      posting: this.postingSerializer.fromJson(json.posting),
      stars: json.stars,
      description: json.description
    };
  }

}
