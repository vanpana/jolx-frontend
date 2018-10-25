import {Resource} from '../models/resource';

export class Serializer<T extends Resource> {
  fromJson(json: any): T {
    return json;
  }

  toJson(resource: T): any {
    return resource;
  }
}
