import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {finalize} from 'rxjs/operators';
import {PostingSerializer} from '../serializers/posting.serializer';
import {Posting} from '../models/posting';
import {ResourceService} from './resource.service';
import {MessageBus} from './message-bus';
import {UserMustUpdate} from '../models/message-bus-events/user-must-update';
import 'rxjs/add/operator/finally';
import {AuthService} from './auth.service';
import {PostingsUpdated} from 'app/models/message-bus-events/postings-updated';
import {UploaderService} from './uploader.service';

@Injectable()
export class PostingsService extends ResourceService<Posting> {
  private applyUrl = 'postings/apply';
  private unApplyUrl = 'postings/unapply';

  constructor(httpService: HttpService,
              private authService: AuthService,
              private uploaderService: UploaderService,
              private messageBus: MessageBus) {
    super(
      httpService,
      'postings',
      new PostingSerializer()
    );
  }

  createWithFile(posting: Posting, file: File, success, error) {
    // Create the promise
    const creationPromise = super.create(posting);

    if (file == null) {
      creationPromise.subscribe(success, error);
    } else {
      // If the file was provided, POST the file and bind it to the user
      creationPromise.subscribe((success_data) => {
        console.log('added posting', success_data);
        this.uploaderService.upload(file, success_data._id, this.uploaderService.postingKey).subscribe((data) => {
          console.log(data);
          posting.photo = data;
          success();
        }, error);
      });
    }
  }

  /**
   * Makes a request to mark the user as an applicant for the posting.
   * @param postingId - the posting id where the user applies to
   */
  userAppliesForPosting(postingId): Observable<any> {
    return this.httpService
      .post(this.applyUrl, {posting_id: postingId})
      .pipe(finalize(() => {
      this.messageBus.publish(new UserMustUpdate());
    }));
  }

  /**
   * Makes a request to mark delete the user from the applicant list for the posting.
   * @param postingId - the posting id where the user should be deleted from
   */
  userUnAppliesForPosting(postingId): Observable<any> {
    return this.httpService.post(this.unApplyUrl, {posting_id: postingId}).pipe(finalize(() => {
      this.messageBus.publish(new UserMustUpdate());
    }));
  }

  fetchPostings() {
    super.list().subscribe((success_data) => {
      console.log(success_data.length);
      this.messageBus.publish(new PostingsUpdated(success_data));
    });
  }
}
