import {EventEmitter, Injectable} from '@angular/core';
import {PostingsService} from './postings.service';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchPostingsService {
  private query: string;
  public queryChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private postingsService: PostingsService
  ) { }

  changeQuery(query: string) {
    this.query = query.toLowerCase();
    this.queryChanged.emit();
  }

  search() {
    if (this.query === '') {
      return this.postingsService.list();
    }

    return this.postingsService
      .list().pipe(map(postings => postings.filter(
        posting => posting.name.toLowerCase().search(this.query) !== -1
      )));
  }
}
