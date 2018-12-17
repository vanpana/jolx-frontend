import {Serializer} from './serializer';
import {UserSerializer} from './user.serializer';
import {Posting} from '../models/posting';

export class PostingSerializer extends Serializer<Posting> {
  private userSerializer: UserSerializer = new UserSerializer;

  fromJson(json: any): Posting {
    return {
      _id: json._id,
      name: json.name,
      description: json.description,
      price: json.price,
      user: json.user,
      startTime: new Date(json.startTime),
      duration: json.duration,
      creatorUser: json.creatorUser,
      applicantUsers: json.applicantUsers
    };
  }

  toJson(posting: Posting): any {
    return {
      name: posting.name,
      description: posting.description,
      price: posting.price,
      user: this.userSerializer.toJson(posting.user),
      startTime: posting.startTime.toISOString(),
      duration: posting.duration
    };
  }

}
