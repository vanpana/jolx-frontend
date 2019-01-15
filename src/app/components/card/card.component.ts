// import {Component, Input, OnInit} from '@angular/core';
// import {Posting} from '../../models/posting';
// import {AuthService} from '../../services/auth.service';
// import {PostingsService} from '../../services/postings.service';
//
// @Component({
//   selector: 'app-card',
//   templateUrl: './card.component.html',
//   styleUrls: ['./card.component.css']
// })
// export class CardComponent implements OnInit {
//
//   @Input()
//   posting: Posting;
//
//   hasUserApplied: Boolean;
//
//   constructor(private authService: AuthService,
//               private postingService: PostingsService) {
//   }
//
//   ngOnInit(): void {
//   }
//
//   apply() {
//     if (!this.authService.isAuthenticated) {
//       alert('You are not authenticated');
//       return;
//     }
//     this.postingService.userAppliesForPosting(this.posting._id).subscribe(() => {
//       console.log('APPLY', 'has clickd apply');
//       return;
//     });
//   }
//
//   unapply() {
//     this.postingService.userUnAppliesForPosting(this.posting._id).subscribe((s) => {
//       console.log(s);
//     }, (e) => {
//       console.log(e);
//     });
//   }
//
//   /**
//    * Returns whether the user has applied for the current posting.
//    */
//   userApplied(): Boolean {
//     if (!this.authService.isAuthenticated) {
//       return false;
//     }
//
//     if (this.authService.user.postingsAppliedFor == null) {
//       return false;
//     }
//
//     return this.authService.user.postingsAppliedFor.map((posting) => posting._id).indexOf(this.posting._id) > -1;
//   }
// }

import {Component, Input, OnInit} from '@angular/core';
import {Posting} from '../../models/posting';
import {AuthService} from '../../services/auth.service';
import {PostingsService} from '../../services/postings.service';
import {MessageBus} from '../../services/message-bus';
import {UserHasUpdated} from '../../models/message-bus-events/user-has-updated';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  posting: Posting;
  isUserPosting: Boolean;
  hasUserApplied: Boolean;

  constructor(private authService: AuthService,
              private postingService: PostingsService,
              private messageBus: MessageBus) {
  }

  ngOnInit(): void {
    this.checkPropertiesOnObserve();
    this.messageBus.observe(new UserHasUpdated(), () => {
      this.checkPropertiesOnObserve();
    });

    // this.posting.description = this.postingdescription[primele 4 propozitii ] TODO What?
  }

  checkPropertiesOnObserve() {
    this.checkIfUserPosting();

    if (!this.isUserPosting) {
      this.checkIfUserApplied();
    }
  }

  apply() {
    if (!this.authService.isAuthenticated) {
      alert('You are not authenticated');
      return;
    }
    this.postingService.userAppliesForPosting(this.posting._id).subscribe(() => {
      console.log('APPLY', 'has clickd apply');
      return;
    });
  }

  unapply() {
    this.postingService.userUnAppliesForPosting(this.posting._id).subscribe((s) => {
      console.log(s);
    }, (e) => {
      console.log(e);
    });
  }

  /**
   * Returns whether the user has applied for the current posting.
   */
  checkIfUserApplied() {
    if (!this.authService.isAuthenticated) {
      this.hasUserApplied = false;
      return;
    }

    if (this.authService.user.postingsAppliedFor == null) {
      this.hasUserApplied = false;
      return;
    }

    this.hasUserApplied = this.authService.user.postingsAppliedFor.map((posting) => posting._id).indexOf(this.posting._id) > -1;
  }

  checkIfUserPosting() {
    if (!this.authService.isAuthenticated) {
      this.isUserPosting = false;
      return;
    }

    if (this.authService.user.jobsPosted == null) {
      this.isUserPosting = false;
      return;
    }

    this.isUserPosting = this.authService.user.jobsPosted.map((posting) => posting._id).indexOf(this.posting._id) > -1;
  }
}
