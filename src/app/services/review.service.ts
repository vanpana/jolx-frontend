import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ResourceService} from './resource.service';
import {Review} from '../models/review';
import {ReviewSerializer} from '../serializers/review-serializer';

@Injectable()
export class ReviewService extends ResourceService< Review> {
  constructor(httpService: HttpService) {
    super(
      httpService,
      'reviews',
      new ReviewSerializer()
    );
  }
}
