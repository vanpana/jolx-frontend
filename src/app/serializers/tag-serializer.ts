import {Serializer} from './serializer';
import {Tag} from '../models/tag';

export class TagSerializer implements Serializer {
  fromJson(json: any): Tag {
    return {
      id: json.id,
      name: json.Name,
      skillIds: json.skills
    };
  }

  toJson(tag: Tag): any {
    return {
      name: tag.name,
      skills: tag.skillIds
    };
  }
}
