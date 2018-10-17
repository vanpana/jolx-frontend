import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompsComponent } from './comps/comps.component';
import { CardComponent } from './card/card.component';
import { MenubarComponent } from './menubar/menubar.component';

@NgModule({
  declarations: [
    AppComponent,
    CompsComponent,
    CardComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
