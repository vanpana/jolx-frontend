import {User} from './user';
import {Posting} from './posting';
import {Resource} from './resource';

export class Review extends Resource {
  fromUser: User;
  toUser: User;
  stars: number;
  description: string;
}
