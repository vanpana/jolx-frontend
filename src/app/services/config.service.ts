import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  public devApiURL = 'http://localhost:1337';

  constructor() { }

}
