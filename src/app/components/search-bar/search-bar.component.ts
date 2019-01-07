import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  public query: string;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit() {
  }

  search() {
    this.searchService.changeQuery(this.query);
  }
}
