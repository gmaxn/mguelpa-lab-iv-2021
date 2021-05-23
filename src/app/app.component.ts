import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { sideNavAnimation, slideInAnimation } from './app-animations.module';
import { LoadingEventService } from './services/layout/loading-event.service';
import { RouteNameEventService } from './services/layout/route-name-event.service';
import { AuthenticationService } from './services/user/authentication.service';

@Component({
  selector: 'app-root',
  animations: [
    slideInAnimation,
    sideNavAnimation
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mguelpa-lab-iv-workspace';

  routeName = '';

  showTopNav = true;

  public enableSideNav = false;

  public loading = false;

  public logged = false;

  public isOpen = false;

  constructor(
    private _loading: LoadingEventService,
    private _auth:AuthenticationService,
    private _routeName: RouteNameEventService
  ) {
    _loading.changeEmitted$.subscribe(
      value => {
        this.loading = value;
      });
    _auth.logged$.subscribe(
      logged => {
        this.logged = logged;
        if(!this.logged) {
          this.onEnableSideNav(false);
        }
      });
    _routeName.changeEmitted$.subscribe(
      value => {
        this.routeName = value;
      });
  }

  onEnableSideNav(e: boolean) {
    this.enableSideNav = e;
    this.isOpen = e;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  onDeactivate(e:Event) {
    if(this.enableSideNav) {
      this.onEnableSideNav(false);
    }
  }
}
