import {Tag} from './tag';
import {Resource} from './resource';

export class Skill extends Resource {
  name: string;
  description: string;
  tags: Array<Tag>;
}
