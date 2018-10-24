import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CompsComponent} from './comps/comps.component';
import {CardComponent} from './card/card.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginService} from './services/login.service';
import {HttpService} from './services/http.service';
import {ReviewService} from './services/review.service';
import {SkillService} from './services/skill.service';

@NgModule({
  declarations: [
    AppComponent,
    CompsComponent,
    CardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService, LoginService, ReviewService, SkillService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
