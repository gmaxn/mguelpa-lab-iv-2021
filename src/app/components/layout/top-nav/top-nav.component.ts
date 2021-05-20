import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserClaims } from 'src/app/models/user/user-claims';
import { TopNavService } from 'src/app/services/layout/top-nav.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  public logged:boolean = false;
  public user: UserClaims | any = null;


  constructor(
    private router: Router, 
    private eventService: TopNavService,
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.auth.logged$.subscribe(logged => {
      this.logged = logged;
      this.user = JSON.parse(localStorage.getItem('userCredentials')!);
    });
  }

  goToSigninPage() {
    this.router.navigate(['signin']);
    this.eventService.hide(false)
  }

  goToSignupPage() {
    this.router.navigate(['signup']);
    this.eventService.hide(false)
  }

  signout(){
    this.auth.signOut();
  }
}
