import {Resource} from './resource';

export class User extends Resource {
  firstName: string;
  lastName: string;
  username: string;
  dob: Date;
  phone: string;
  email: string;
  skillIds: Array<String>;
  reviewsGivenIds: Array<String>;
  reviewsReceivedIds: Array<String>;
}
