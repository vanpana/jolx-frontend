import {Serializer} from './serializer';
import {UserSerializer} from './user.serializer';
import {Posting} from '../models/posting';

export class PostingSerializer extends Serializer<Posting> {
  private userSerializer: UserSerializer = new UserSerializer;

  fromJson(json: any): Posting {

    return {
      name: json.Name,
      description: json.Description,
      price: json.Price,
      user: json.User,
      startTime: new Date(json.StartTime),
      duration: json.Duration
    };
  }

}
