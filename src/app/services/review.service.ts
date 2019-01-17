import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ResourceService} from './resource.service';
import {Review} from '../models/review';
import {ReviewSerializer} from '../serializers/review.serializer';
import {User} from '../models/user';
import {Posting} from '../models/posting';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ReviewService extends ResourceService<Review> {
  constructor(httpService: HttpService) {
    super(
      httpService,
      'reviews',
      new ReviewSerializer()
    );
  }

  /**
   * Adds a review for an user with the specified description.
   * @param jobPosterId - the id of the user who posted the job
   * @param jobWorkerId - the id of the user who worked at the job posted
   * @param postingId - the id of the job posting
   * @param stars - the stars on a scale on 1 to 5 for the performance of the worker
   * @param reviewDescription - a description of the work performed
   */
  addReview(jobPosterId: string, jobWorkerId: string, postingId: string, stars: number, reviewDescription: string): Observable<any> {
    const jsonToBeSent = {
      fromUser: jobPosterId,
      toUser: jobWorkerId,
      posting: postingId,
      stars: stars,
      description: reviewDescription
    };

    // Return the promise
    return this.httpService.post('reviews', jsonToBeSent);
  }
}
