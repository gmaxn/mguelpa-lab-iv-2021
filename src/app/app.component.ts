import { Component } from '@angular/core';
import { LoadingEventService } from './services/layout/loading-event.service';
import { LoggedEventService } from './services/layout/logged-event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mguelpa-lab-iv-workspace';

  showTopNav = true;

  public enableSideNav = false;

  public loading = false;

  public logged = false;

  public isOpen = false;

  constructor(
    private _loading: LoadingEventService,
    private _logged: LoggedEventService
  ) {
    _loading.changeEmitted$.subscribe(
      value => {
        this.loading = value;
      });
    _logged.changeEmitted$.subscribe(
      value => {
        this.logged = value;
      });
  }

  onEnableSideNav(e: boolean) {
    this.enableSideNav = e;
    this.isOpen = e;
  }
}
