import { Component, OnInit } from '@angular/core';
import {SearchUsersService} from '../../services/search-users.service';
import {User} from '../../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: Array<User>;

  constructor(
    private searchUseresService: SearchUsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUsersAndSetView();
    this.searchUseresService.queryChanged.subscribe(
      this.getUsers()
    );
  }

  getUsersAndSetView() {
    this.searchUseresService.search().subscribe(success_data => {
        this.users = success_data;
        this.viewUser(this.users[0].id);
      });
  }
  getUsers() {
    this.searchUseresService.search().subscribe(success_data => {
      this.users = success_data;
      console.log(success_data);
    });
  }

  viewUser(id) {
    this.router.navigate(['/job_seekers/' + id + '/profile']);
  }
}
