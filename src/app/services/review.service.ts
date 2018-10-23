import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResourceService} from './resource.service';
import {Review} from '../models/review';
import {ReviewSerializer} from '../serializers/review-serializer';

@Injectable()
export class ReviewService extends ResourceService<Review> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:1337',
      'reviews',
      new ReviewSerializer()
    );
  }
}
