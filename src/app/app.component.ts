import { Component } from '@angular/core';
import {SkillService} from './services/skill.service';
import {Skill} from './models/skill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private skillService: SkillService) {}
   getSkills() {
    this.skillService.read('5bcd81ddf0131f258cccfb5b').subscribe( e => {});
  }
}
