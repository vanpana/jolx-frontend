import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public static serverRoute = 'http://localhost:1337';
  title = 'app';

  constructor(private authService: AuthService) {
    this.authService.broadcastIfAuthenticated();
  }
}
