import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CompsComponent} from './components/comps/comps.component';
import {CardComponent} from './components/card-list/card/card.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './services/http.service';
import {ReviewService} from './services/review.service';
import {SkillService} from './services/skill.service';
import {CookiesService} from './services/cookies.service';
import {SignupComponent} from './components/signup/signup.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {ConfigService} from './services/config.service';
import {AuthService} from './services/auth.service';
import {HomeComponent} from './components/home/home.component';
import {UploaderService} from './services/uploader.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import {CardListComponent} from './components/card-list/card-list.component';
import {PostingsService} from './services/postings.service';
import {NewPostingComponent } from './components/new-posting/new-posting.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { SearchBarPostingsComponent } from './components/search-bar-postings/search-bar-postings.component';
import {SearchPostingsService} from './services/search-postings.service';
import { JobSeekersComponent } from './components/job-seekers/job-seekers.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import {
  MatButtonModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatMenuModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatGridListModule,
  MatStepperModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MatTableModule,
  MatTooltipModule,
  MatProgressBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonToggleModule, MatChipsModule, MatExpansionModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from './services/user.service';
import {SearchUsersService} from './services/search-users.service';
import { UserListItemComponent } from './components/users-list/user-list-item/user-list-item.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    CompsComponent,
    CardComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    EditProfileComponent,
    CardComponent,
    CardListComponent,
    NewPostingComponent,
    ProfileComponent,
    SearchBarPostingsComponent,
    JobSeekersComponent,
    UsersListComponent,
    UserListItemComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // angular material modules
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
    //
  ],
  providers: [
    CookiesService,
    HttpService,
    ReviewService,
    SkillService,
    ConfigService,
    AuthService,
    UploaderService,
    PostingsService,
    SearchPostingsService,
    Location,
    UserService,
    SearchUsersService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
