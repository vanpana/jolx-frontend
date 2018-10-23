import { Injectable } from '@angular/core';
import {ResourceService} from './resource.service';
import {Skill} from '../models/skill';
import {HttpClient} from '@angular/common/http';
import {SkillSerializer} from '../serializers/skill-serializer';

@Injectable()
export class SkillService extends ResourceService<Skill> {

  constructor(httpClient: HttpClient) {
    super(
      httpClient,
      'http://localhost:1337',
      'skills',
      new SkillSerializer()
    );
  }
}

