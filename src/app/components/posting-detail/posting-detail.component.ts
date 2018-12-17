import {Component, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';
import {ActivatedRoute} from '@angular/router';
import {PostingsService} from '../../services/postings.service';
import {MessageBus} from '../../services/message-bus';
import {PostingsUpdated} from '../../models/message-bus-events/postings-updated';

@Component({
  selector: 'app-posting-detail',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.css']
})
export class PostingDetailComponent implements OnInit {
  public id: string;
  posting: Posting;
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private postingsService: PostingsService,
              private messageBus: MessageBus) {
  }

  ngOnInit() {
    // Fetch the id from the route
    this.id = this.route.snapshot.paramMap.get('id');

    // Toggle loading indicator
    this.loading = true;

    // Start loading data
    this.postingsService.fetchPostings();

    // Listen for change
    this.messageBus.observe(new PostingsUpdated(), (postingsUpdated) => {
      postingsUpdated.postings.forEach((posting) => {
        if (posting._id === this.id) {
          // Disable loading and set the posting
          this.loading = false;
          this.posting = posting;
        }
      });
    });
  }

}
