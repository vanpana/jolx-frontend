import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {CookiesService} from './cookies.service';
import {ConfigService} from './config.service';

@Injectable()
export class HttpService {
  private readonly baseUrl: string;

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private cookieService: CookiesService) {
      this.baseUrl = this.configService.devApiURL;
  }

  public post(endpoint: string, item: any): Observable<any> {
    return this.httpClient
      .post(`${this.baseUrl}/${endpoint}`, item, this.options());
  }

  public update(endpoint: string, id: string, item: any): Observable<any> {
    return this.httpClient
      .put(`${this.baseUrl}/${endpoint}/${id}`, item, this.options());
  }

  public read(endpoint: string, id: string): Observable<any> {
    return this.httpClient
      .get(`${this.baseUrl}/${endpoint}/${id}`, this.options());
  }

  public list(endpoint: string): Observable<any> {
    return this.httpClient
      .get(`${this.baseUrl}/${endpoint}`, this.options());
  }

  public delete(endpoint: string, id: string) {
    return this.httpClient
      .delete(`${this.baseUrl}/${endpoint}/${id}`, this.options());
  }

  private options() {
    return {headers: this.headers()};
  }

  private headers(): HttpHeaders {
    let headers = new HttpHeaders();

    headers = headers.append('Content-Type', 'application/json');
    const bearer = this.cookieService.getJWTCookie();
    if (bearer !== '') {
      headers = headers.append('Authorization', `Bearer ${bearer}`);
    }
    console.log(headers);
    return headers;
  }
}
