import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class ReviewService {
  private httpService: HttpService;
  private reviewsUrl = 'reviews';

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  getAll() {
    return this.httpService.list(this.reviewsUrl);
  }
}
