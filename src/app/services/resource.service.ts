import { Injectable } from '@angular/core';
import {Resource} from '../models/resource';
import {HttpClient} from '@angular/common/http';
import {Serializer} from '../serializers/serializer';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

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
     .get(`${this.url}/${this.endpoint}/${id}`)
      .pipe(map(json => this.serializer.fromJson(json) as T));
  }

  list(): Observable<T[]> {
    return this.httpClient
      .get(`${this.url}/${this.endpoint}`)
      .pipe(map((data => this.convertData(data))));
  }

  delete(id: number) {
    return this.httpClient
      .delete(`${this.url}/${this.endpoint}/${id}`);
  }

  protected convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }
}
