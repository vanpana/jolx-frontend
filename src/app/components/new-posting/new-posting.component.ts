import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {PostingsService} from '../../services/postings.service';
import {AuthService} from '../../services/auth.service';
import {Posting} from '../../models/posting';
import {LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-new-posting',
  templateUrl: './new-posting.component.html',
  styleUrls: ['./new-posting.component.css']
})
export class NewPostingComponent implements OnInit {

  name: string;
  description: string;
  price: number;
  user: User;
  duration: number;

  constructor(
    private postingService: PostingsService,
    private authService: AuthService,
    private location: LocationStrategy,
  ) { }

  ngOnInit() {
  }

  public createPosting(startTime: string): void {
    const newPosting: Posting = {
      _id: undefined,
      name: this.name,
      description: this.description,
      price: this.price,
      user: this.authService.user,
      startTime: new Date(startTime),
      duration: this.duration,
      creatorUser: this.authService.user
    };

    this.postingService.create(newPosting).subscribe(
      success_data => {
        location.assign('/home');
      },

      error_data => {
        console.log(error_data);
      }
    );
  }

}
