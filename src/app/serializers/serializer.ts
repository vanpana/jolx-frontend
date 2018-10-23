import {Resource} from '../models/resource';

export interface Serializer {
  fromJson(json: any): Resource;
  toJson(resource: Resource): any;
}
