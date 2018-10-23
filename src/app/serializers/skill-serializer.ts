import {Serializer} from './serializer';
import {Skill} from '../models/skill';
import {TagSerializer} from './tag-serializer';

export class SkillSerializer implements Serializer {

  private tagSerializer: TagSerializer = new TagSerializer();

  fromJson(json: any): Skill {
    return {
      id: json.id,
      name: json.Name,
      description: json.Description,
      tags: json.tags.map(tag => this.tagSerializer.fromJson(tag))
    };
  }

  toJson(skill: Skill): any {
    return {
      name: skill.name,
      description: skill.description,
      tags: skill.tags.map(tag => this.tagSerializer.toJson(tag))
    };
  }
}
