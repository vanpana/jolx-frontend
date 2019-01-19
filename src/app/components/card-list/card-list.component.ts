import {Component, Input, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';
import {SearchPostingsService} from '../../services/search-postings.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  postings: Array<Posting>;
  maxPostingsPerRow = 4;

  constructor(
    private searchService: SearchPostingsService) {
  }

  ngOnInit(): void {
    this.getPostings();
    this.searchService.queryChanged.subscribe(() =>
      this.getPostings()
    );
  }

  getPostings() {
    this.searchService.search().subscribe(success_data => this.postings = success_data);
  }

  get openPostings(): Posting[] {
    if (this.postings !== undefined) {
      return this.postings.filter(posting => posting.status === 'open');
    } else {
      return undefined;
    }
  }

  nArray(n: number): any[] {
    return Array(n);
  }

}
