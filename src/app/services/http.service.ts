import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpService {
  private baseUrl = 'http://localhost:1337';
  constructor(
    private httpClient: HttpClient) {}

  public post(url: string, item: any): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/${url}`, item);
  }

  public update(url: string, id: string, item: any): Observable<any> {
    return this.httpClient
      .put(`${this.baseUrl}/${url}/${id}`, item);
  }

  read(url: string, id: string): Observable<any> {
    return this.httpClient
     .get(`${this.baseUrl}/${url}/${id}`);
  }

  list(url: string): Observable<any> {
    return this.httpClient
      .get(`${this.baseUrl}/${url}`);
  }

  delete(url: string, id: number) {
    return this.httpClient
      .delete(`${this.baseUrl}/${url}/${id}`);
  }
}
