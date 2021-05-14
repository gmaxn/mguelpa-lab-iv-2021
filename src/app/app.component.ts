import { trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { TopNavService } from './services/layout/top-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mguelpa-lab-iv-workspace';
  showTopNav = true;
  
  constructor() { }
}
