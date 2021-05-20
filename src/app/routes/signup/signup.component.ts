import { Component, OnInit } from '@angular/core';
import { UserClaims } from 'src/app/models/user/user-claims';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public logged = false;

  public user: UserClaims | any = null;

  public hasRoleAdmin: boolean = false;

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.user = (JSON.parse(localStorage.getItem('userCredentials')!));
    console.log(this.user);
  
    if (this.user) {
      this.logged = true;
    } else {
      this.user = null;
    }

    this.auth.logged$.subscribe(loggedin => {
      if (loggedin) {
        this.user = <UserClaims>(JSON.parse(localStorage.getItem('userCredentials')!));
        this.hasRoleAdmin = this.user.roles.includes('admin');
        this.logged = true;
      } else {
        this.logged = false;
        this.user = null;
      }
    })
  }
}
