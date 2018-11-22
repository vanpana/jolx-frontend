import {Component, Input, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  @Input()
  postings: Array<Posting>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
