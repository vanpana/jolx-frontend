import {Skill} from './skill';
import {Review} from './review';
import {Resource} from './resource';

export class User extends Resource {
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
