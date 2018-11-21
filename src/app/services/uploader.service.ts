import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class UploaderService {
  private httpService: HttpService;
  private uploaderUrl = 'upload';
  private fileKey = 'files';
  private refIdKey = 'refId';
  private refKey = 'ref';
  private fieldKey = 'field';
  private sourceKey = 'source';

  private sourceValue = 'users-permissions';
  public userKey = 'user';
  private userFieldValue = 'photo';
  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  upload(file, entityId, key) {
    const formData: FormData = new FormData();
    formData.append(this.fileKey, file, file.name);
    formData.append(this.refIdKey, entityId);
    formData.append(this.refKey, key);
    if (key === this.userKey) {
      formData.append(this.fieldKey, this.userFieldValue);
    }
    formData.append(this.sourceKey, this.sourceValue);
    return this.httpService.post(this.uploaderUrl, formData, true);
  }

}
