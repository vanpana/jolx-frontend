import {Skill} from './skill';
import {Resource} from './resource';

export class Tag extends Resource {
  name: string;
  skill: Skill;
}
