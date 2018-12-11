import {User} from '../user';

export class UserHasUpdated {
  constructor(public user: User = null) {}
}
