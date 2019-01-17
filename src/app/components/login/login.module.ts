import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    LoginComponent,
  ],
  bootstrap: [
    LoginComponent
  ]
})
export class LoginModule { }
