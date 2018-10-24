import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class SkillService {
  private httpService: HttpService;
  private skillsUrl = 'skills';

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  getAll() {
    return this.httpService.list(this.skillsUrl);
  }
}
