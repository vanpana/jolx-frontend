import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class UserService {
  httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }


}
