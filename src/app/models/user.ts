import {Resource} from './resource';
import {FileUpload} from './file-upload';

export class User extends Resource {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dob: Date;
  phone: string;
  photo: FileUpload;
  skillIds: Array<String>;
  reviewsGivenIds: Array<String>;
  reviewsReceivedIds: Array<String>;
  jobsPostedIds: Array<String>;
  postingsAppliedForIds: Array<String>;
}
