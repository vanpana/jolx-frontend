import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../models/user';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input()
  user: User;

  constructor() {}

  ngOnInit() {
    console.log(this.user);
  }

  get serverRoute() {
    return AppComponent.serverRoute;
  }

}
