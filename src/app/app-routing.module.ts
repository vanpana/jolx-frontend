import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CompsComponent} from './comps/comps.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: 'comps', component: CompsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
