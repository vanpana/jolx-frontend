import {Skill} from './skill';
import {Review} from './review';

export class User {
  firstname: string;
  lastname: string;
  username: string;
  dob: Date;
  phone: string;
  password: string;
  skills: Array<Skill>;
  reviewsGiven: Array<Review>;
  reviewsReceived: Array<Review>;
}
