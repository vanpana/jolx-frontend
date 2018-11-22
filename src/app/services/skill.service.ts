import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class SkillService {
  private skillsUrl = 'skills';

  constructor(private httpService: HttpService) {
    this.httpService = httpService;
  }

  getAll() {
    return this.httpService.list(this.skillsUrl);
  }
}
