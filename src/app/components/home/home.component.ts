import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Posting} from '../../models/posting';
import {PostingsService} from '../../services/postings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  postings: Array<Posting>;

  constructor(public authService: AuthService,
              public postingsService: PostingsService) { }

  ngOnInit() {
    this.postingsService.list().subscribe(success_data => this.postings = success_data);
  }

}
