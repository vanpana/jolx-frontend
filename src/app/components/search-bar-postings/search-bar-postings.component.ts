import { Component, OnInit } from '@angular/core';
import {SearchPostingsService} from '../../services/search-postings.service';

@Component({
  selector: 'app-search-bar-postings',
  templateUrl: './search-bar-postings.component.html',
  styleUrls: ['./search-bar-postings.component.css']
})
export class SearchBarPostingsComponent implements OnInit {

  public query: string;

  constructor(
    private searchService: SearchPostingsService
  ) { }

  ngOnInit() {
  }

  search() {
    this.searchService.changeQuery(this.query);
  }
}
