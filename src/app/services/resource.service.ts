import { Injectable } from '@angular/core';
import {Resource} from '../models/resource';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../serializers/serializer';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ResourceService<T extends Resource> {
  constructor(
    private httpClient: HttpClient,
    private url: string,
    private endpoint: string,
    private serializer: Serializer) {}

  public create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item));
  }

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${this.url}/${this.endpoint}/${item.id}`,
        this.serializer.toJson(item));
  }
  read(id: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.url}/${this.endpoint}/${id}`);
  }
  list(): Observable<Array<T>> {
    return this.httpClient
      .get<Array<T>>(`${this.url}/${this.endpoint}`);
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.url}/${this.endpoint}/${id}`);
  }
}
