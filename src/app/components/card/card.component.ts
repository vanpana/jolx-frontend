import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  posting: Posting;

  constructor() {}

  ngOnInit(): void {
  }
}
