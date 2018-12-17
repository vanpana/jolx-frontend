import {Posting} from '../posting';

export class UserPostingsUpdated {
  constructor(public postings: Posting[]= null) {}
}
