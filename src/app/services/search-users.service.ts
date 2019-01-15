import {EventEmitter, Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable()
export class SearchUsersService {
  private query: string;
  public queryChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(private userService: UserService) { }

  changeQuery(query: string) {
    this.query = query;
    this.queryChanged.emit();
  }

  search() {
    if (this.query === '') {
      return this.userService.list();
    }

    return this.userService
      .list().pipe(map(users => users.filter(
        user => user.username.search(this.query) !== -1
      )));
  }
}
