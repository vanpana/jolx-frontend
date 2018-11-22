import {User} from './user';
import {Resource} from './resource';

export class Posting extends Resource {
  _id: string;
  name: string;
  description: string;
  price: number;
  user: User;
  startTime: Date;
  duration: number;
}
