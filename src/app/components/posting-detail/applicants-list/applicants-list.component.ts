import {Component, Input, OnInit} from '@angular/core';
import {Posting} from '../../../models/posting';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css']
})
export class ApplicantsListComponent implements OnInit {

  @Input()
  posting: Posting;

  constructor() { }

  ngOnInit() {
  }

}
