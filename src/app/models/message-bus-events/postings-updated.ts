import {Posting} from '../posting';

export class PostingsUpdated {
  constructor(public postings: Posting[]= null) {}
}
