import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-applicants-list-item',
  templateUrl: './applicants-list-item.component.html',
  styleUrls: ['./applicants-list-item.component.css']
})
export class ApplicantsListItemComponent implements OnInit {

  @Input()
  user: User;

  constructor() { }

  ngOnInit() {
  }

}
