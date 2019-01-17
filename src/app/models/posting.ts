import {User} from './user';
import {Resource} from './resource';
import {FileUpload} from './file-upload';

export enum PostingStatus {
  Open = 'open',
  InProgress = 'inprogress',
  Done = 'done'
}

export class Posting extends Resource {
  _id: string;
  name: string;
  description: string;
  price: number;
  user: User;
  startTime: Date;
  duration: number;
  creatorUser: User;
  applicantUsers: User[];
  photo: FileUpload;
  status: PostingStatus;
}
