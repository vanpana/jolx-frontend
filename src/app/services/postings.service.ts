import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {ResourceService} from './resource.service';
import {Posting} from '../models/posting';
import {PostingSerializer} from '../serializers/posting.serializer';

@Injectable()
export class PostingsService extends ResourceService<Posting> {

  constructor(httpService: HttpService) {
    super(
      httpService,
      'postings',
      new PostingSerializer()
    );
  }
}
