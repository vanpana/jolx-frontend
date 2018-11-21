import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CompsComponent} from './components/comps/comps.component';
import {CardComponent} from './components/card/card.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user.service';
import {HttpService} from './services/http.service';
import {ReviewService} from './services/review.service';
import {SkillService} from './services/skill.service';
import {CookiesService} from './services/cookies.service';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {ConfigService} from './services/config.service';
import {AuthService} from './services/auth.service';
import { HomeComponent } from './components/home/home.component';
import {UploaderService} from './services/uploader.service';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ProfileComponent } from './components/profile/profile.component';

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
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CookiesService,
    HttpService,
    UserService,
    ReviewService,
    SkillService,
    ConfigService,
    AuthService,
    UploaderService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
