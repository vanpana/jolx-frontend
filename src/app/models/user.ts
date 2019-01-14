import {Resource} from './resource';
import {FileUpload} from './file-upload';
import {Posting} from './posting';

export class User extends Resource {
  public id: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public password: string;
  public dob: Date;
  public phone: string;
  public photo: FileUpload;
  public skillIds: Array<String>;
  public reviewsGivenIds: Array<String>;
  public reviewsReceivedIds: Array<String>;
  public jobsPosted: Array<Posting>;
  public postingsAppliedFor: Array<Posting>;

  clone(): User {
    const newUser = new User();
    newUser.id = this.id;
    newUser.firstName = this.firstName;
    newUser.lastName = this.lastName;
    newUser.username = this.username;
    newUser.email = this.email;
    newUser.password = this.password;
    newUser.dob = this.dob;
    newUser.phone = this.phone;
    newUser.photo = this.photo;
    newUser.skillIds = this.skillIds;
    // TODO more if needed
    return newUser;
  }
}
