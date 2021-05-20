import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user/user-credentials';
import { LoadingEventService } from 'src/app/services/layout/loading-event.service';
import { LoggedEventService } from 'src/app/services/layout/logged-event.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {

  public autoCompletarDatos = false;
  public form: FormGroup | any;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private login: LoggedEventService,
    private fb: FormBuilder,
    private _loading: LoadingEventService
  ) { }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  initForm() {
    // Profile Info Form Initialization
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  switch() {
    this.autoCompletarDatos = !this.autoCompletarDatos;
  }

  signin() {
    this._loading.emitChange(true);
    localStorage.removeItem('user');

    const credentials: UserCredentials = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };

    this.auth.signIn(credentials).then(
      (ok) => {
        this.router.navigate(['home']);
      },
      (err) => {
        alert(err);
        this.form.reset();
      }
    ).finally(() => { this._loading.emitChange(false) });
  }

  auto(role:string) {
    switch(role) {
      case 'admin':
        this.form.get('username')?.patchValue(`admin@user.com`);
        this.form.get('password')?.patchValue("123456Q!");
        break;
      case 'especialista':
        this.form.get('username')?.patchValue(`especialista@user.com`);
        this.form.get('password')?.patchValue("123456Q!");
        break;
      case 'paciente':
        this.form.get('username')?.patchValue(`paciente@user.com`);
        this.form.get('password')?.patchValue("123456Q!");
        break;
    }
  }
}
