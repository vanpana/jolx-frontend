import {User} from './user';

export class Review {
  fromUser: User;
  toUser: User;
  stars: number;
  description: string;
}
