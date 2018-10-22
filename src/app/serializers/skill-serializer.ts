import {Serializer} from './serializer';
import {Skill} from '../models/skill';


export class SkillSerializer implements Serializer {
  fromJson(json: any): Skill {
    const skill = new Skill();
    skill.id = json.id;
    skill.name = json.name;
    skill.description = json.description;
    skill.tags = json.tags;
    return skill;
  }

  toJson(skill: Skill): any {
    return {
      id: skill.id,
      name: skill.name,
      desciption: skill.description,
      tags: skill.tags
    };
  }
}
