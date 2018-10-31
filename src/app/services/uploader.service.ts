import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class UploaderService {
  private httpService: HttpService;
  private uploaderUrl = 'upload';
  private fileKey = 'files';

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  upload(file) {
    const formData: FormData = new FormData();
    formData.append(this.fileKey, file, file.name);
    return this.httpService.post(this.uploaderUrl, formData, true);
  }

}
