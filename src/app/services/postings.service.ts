import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {PostingSerializer} from '../serializers/posting.serializer';

@Injectable()
export class PostingsService {
  private postingsUrl = 'postings';
  private applyUrl = this.postingsUrl + '/apply';
  private unApplyUrl = this.postingsUrl + '/unapply';

  constructor(private httpService: HttpService) {
    this.httpService = httpService;
  }

  /**
   * Makes a request to mark the user as an applicant for the posting.
   * @param postingId - the posting id where the user applies to
   */
  userAppliesForPosting(postingId): Observable<any> {
    return this.httpService.post(this.applyUrl, {posting_id: postingId});
  }

  /**
   * Makes a request to mark delete the user from the applicant list for the posting.
   * @param postingId - the posting id where the user should be deleted from
   */
  userUnAppliesForPosting(postingId): Observable<any> {
    return this.httpService.post(this.unApplyUrl, {posting_id: postingId});
  }

  public getAll(): Observable<any> {
    // TODO Nu prea e ce trebe
    return this.httpService.list(this.postingsUrl).pipe(map(data => data.map(item => new PostingSerializer().fromJson(item))));
  }
}
