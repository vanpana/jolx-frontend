import {Serializer} from './serializer';
import {Review} from '../models/review';
import {UserSerializer} from './user.serializer';
import {PostingSerializer} from './posting.serializer';

export class ReviewSerializer extends Serializer<Review> {
  private userSerializer: UserSerializer = new UserSerializer;
  private postingSerializer: PostingSerializer = new PostingSerializer();

  fromJson(json: any): Review {
    const review = new Review();
    review.id = json.id;
    review.description = json.description;
    review.fromUser = this.userSerializer.fromJson(json.fromUser);
    review.toUser = this.userSerializer.fromJson(json.toUser);
    review.posting = this.postingSerializer.fromJson(json.posting);
    review.stars = json.stars;
    return review;
  }

}
