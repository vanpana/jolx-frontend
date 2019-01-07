import {Component, Input, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';
import {PostingsService} from '../../services/postings.service';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  postings: Array<Posting>;

  constructor(
    private searchService: SearchService, ) {}

  ngOnInit(): void {
    this.getPostings();
    this.searchService.queryChanged.subscribe( () =>
      this.getPostings()
    );
  }

  getPostings() {
    this.searchService.search().subscribe(success_data => this.postings = success_data);
  }
}
