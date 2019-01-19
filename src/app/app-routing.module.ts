import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './components/signup/signup.component';
import {HomeComponent} from './components/home/home.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {ProfileComponent} from './components/profile/profile.component';
import {NewPostingComponent} from './components/new-posting/new-posting.component';
import {PostingDetailComponent} from './components/posting-detail/posting-detail.component';
import {JobSeekersComponent} from './components/job-seekers/job-seekers.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {RatingComponent} from './components/rating/rating.component';
import {UsersListComponent} from './components/users-list/users-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', loadChildren: './components/login/login.module#LoginModule' },
  { path: 'register', component: SignupComponent },
  { path: 'home', component: HomeComponent},
  { path: 'edit', component: EditProfileComponent},
  { path: 'new_posting', component: NewPostingComponent},
  { path: 'edit', component: EditProfileComponent},
  { path: 'postings/:id', component: PostingDetailComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'rating', component: RatingComponent},
  {
    path: 'job_seekers',
    component: JobSeekersComponent,
    children: [
      { path: ':userId/profile', component: UserProfileComponent },
      { path: ':userId/messages', component: UserProfileComponent }
    ]
  },
  { path: 'users/:id', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
