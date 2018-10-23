import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompsComponent } from './comps/comps.component';
import { CardComponent } from './card/card.component';
import {SkillService} from './services/skill.service';
import {HttpClientModule} from '@angular/common/http';
import {ReviewService} from './services/review.service';

@NgModule({
  declarations: [
    AppComponent,
    CompsComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SkillService, ReviewService],
  bootstrap: [AppComponent]
})
export class AppModule { }
