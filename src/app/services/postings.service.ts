import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import {PostingSerializer} from '../serializers/posting.serializer';
import {Posting} from '../models/posting';
import {ResourceService} from './resource.service';

@Injectable()
export class PostingsService extends ResourceService<Posting> {
  private applyUrl = 'postings/apply';
  private unApplyUrl = 'postings/unapply';

  constructor(httpService: HttpService) {
    super(
      httpService,
      'postings',
      new PostingSerializer()
    );
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

}
