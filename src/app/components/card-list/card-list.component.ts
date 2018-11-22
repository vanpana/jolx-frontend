import {Component, Input, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';
import {PostingsService} from '../../services/postings.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  postings: Array<Posting>;

  constructor(
    private postingsService: PostingsService ) {}

  ngOnInit(): void {
    this.getPostings();
  }

  getPostings() {
    this.postingsService.getAll().subscribe(success_data => this.postings = success_data);
  }
}
