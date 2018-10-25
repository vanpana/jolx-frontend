import {Resource} from '../models/resource';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {Serializer} from '../serializers/serializer';
import {map} from 'rxjs/operators';

export class ResourceService<T extends Resource> {
  constructor(
    private httpService: HttpService,
    private endpoint: string,
    private serializer: Serializer<T>) {}

  public create(item: T): Observable<T> {
    return this.httpService
      .post(this.endpoint, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public update(item: T): Observable<T> {
    return this.httpService
      .update(this.endpoint, item.id, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public read(id: string): Observable<T> {
    return this.httpService
      .read(this.endpoint, id)
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public list(): Observable<T[]> {
    return this.httpService
      .list(this.endpoint).pipe(map(data => this.convertData(data)));
  }
  public delete(id: string) {
    return this.httpService.delete(this.endpoint, id);
  }

  private convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }
}
