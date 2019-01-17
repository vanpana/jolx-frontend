import {EventEmitter, Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {User} from '../models/user';
import {CookiesService} from './cookies.service';
import {UploaderService} from './uploader.service';
import {MessageBus} from './message-bus';
import {UserMustUpdate} from '../models/message-bus-events/user-must-update';
import {UserHasUpdated} from '../models/message-bus-events/user-has-updated';
import {PostingsUpdated} from '../models/message-bus-events/postings-updated';
import {UserPostingsUpdated} from '../models/message-bus-events/user-postings-updated';
import {Router} from '@angular/router';
import {UserSerializer} from '../serializers/user.serializer';
import {Observable} from 'rxjs/Observable';

enum Action {
  Add, Update
}

@Injectable()
export class AuthService {
  public isAuthenticated = false;

  private jsonUserKey = 'user';
  private baseUserUrl = 'users';
  private loginUrl = 'login';
  private signupUrl = 'signup';
  private meUrl = this.baseUserUrl + '/me';
  private userUrl = 'users';

  public userAuthenticated: EventEmitter<User> = new EventEmitter<User>();
  public userLoggedOut: EventEmitter<void> = new EventEmitter<void>();

  constructor(private httpService: HttpService,
              private cookieService: CookiesService,
              private uploaderService: UploaderService,
              private messageBus: MessageBus,
              private router: Router) {

    // Subscribe so the user updates if it's modified on the server
    messageBus.observe(new UserMustUpdate(), () => {
      this.fetchIfAuthenticated();
    });

    this.messageBus.observe(new PostingsUpdated(), (postingsUpdated) => {
      // console.log(postingsUpdated.postings);
      this.user.jobsPosted = postingsUpdated.postings.filter((posting) => {
        // console.log(posting);
        return posting.creatorUser.id === this.user.id;
      });
      this.messageBus.publish(new UserPostingsUpdated(this.user.jobsPosted));
    });
  }

  public constructAndPersistUser(data) {
    this.cookieService.saveUserCookie(data[this.jsonUserKey]);
    this.cookieService.saveJWTCookie(data['jwt']);
  }

  public login(identifier: string, password: string) {
    return this.httpService.post(this.loginUrl, {
      identifier: identifier,
      password: password
    });
  }

  public update(user: User, file: File, success, error) {
    // Clone the user
    const clonedUser = new UserSerializer().fromJson(user).clone();

    // Delete user email and username to avoid 400
    clonedUser.email = undefined;
    clonedUser.username = undefined;
    clonedUser.password = undefined;

    // PUT the user
    const updatePromise = this.httpService.update(this.userUrl, clonedUser.id, clonedUser);

    this.submitPromiseAndUploadFile(updatePromise, file, success, error, Action.Update);
  }

  public register(firstName: string, lastName: string, email: string, username: string, password: string, file: File, success, error) {
    // First POST and register the user
    const registrationPromise = this.httpService.post(this.signupUrl, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: username,
      password: password,
    });

    this.submitPromiseAndUploadFile(registrationPromise, file, success, error, Action.Add);
  }

  private submitPromiseAndUploadFile(promise, file, success, error, action) {
    // If no file was provided, call the success and error
    if (file == null) {
      promise.subscribe(success, error);
    } else {
      promise.subscribe((success_data) => {
        let uploaderPromise: Observable<any>;
        // If the user if being added, POST the file and bind it to the user
        if (action === Action.Add) {
          this.authenticate(success_data);
          uploaderPromise = this.uploaderService.upload(file, this.user.id, this.uploaderService.userKey);
          uploaderPromise.subscribe((data) => {
            this.user.photo = data;
            this.cookieService.saveUserCookie(this.user);
          }, error);
        } else {  // If the user is being updated, only save the photo in the cookies
          uploaderPromise = this.uploaderService.upload(file, this.user.id, this.uploaderService.userKey);
          uploaderPromise.subscribe((data) => {
            this.user.photo = data;
            success();
          }, error);
        }
      });
    }
  }

  public authenticate(successData: any): void {
    this.constructAndPersistUser(successData);
    this.isAuthenticated = true;
    this.userAuthenticated.next(this.cookieService.getUserCookie());
  }

  public broadcastIfAuthenticated(): void {
    if (this.cookieService.hasJWTCookie()) {
      this.isAuthenticated = true;
      this.userAuthenticated.next(this.cookieService.getUserCookie());
    }
  }

  public logout(): void {
    this.cookieService.clearCookies();
    this.isAuthenticated = false;
    this.userLoggedOut.next();
    this.router.navigate(['/login']);
  }

  get user() {
    return this.cookieService.getUserCookie();
  }

  private fetchIfAuthenticated() {
    if (this.isAuthenticated) {
      this.httpService.read(this.meUrl).subscribe((successData) => {
        this.cookieService.saveUserCookie(successData);


        // Publish event on message bus
        this.messageBus.publish(new UserHasUpdated(this.user));
      });
    }
  }
}
