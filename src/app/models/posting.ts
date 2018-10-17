import {User} from './user';

export class Posting {
  name: string;
  description: string;
  price: number;
  user: User;
  startTime: Date;
  duration: number;
}
