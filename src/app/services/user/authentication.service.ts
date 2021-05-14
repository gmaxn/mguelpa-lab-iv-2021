import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { User, UserCredentials } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private logged = new BehaviorSubject(false);
  logged$ = this.logged.asObservable();

  
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) { }

  public async signIn(user: UserCredentials) {
    return new Promise<any>((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(user.username, user.password).then(response => {
        // 1. get user profile info
        this.db.collection<any>("users").doc(response.user?.uid).valueChanges().subscribe(data => {
          // 2. set local storage
          const credentials = {
            uid: data.uid,
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.email,
            roles: data.roles
          };
          localStorage.setItem('userCredentials', JSON.stringify(credentials));
          this.logged.next(true);
          resolve(credentials);
        });
      }).catch(err => reject(err.message));
    });
  }

  public async signUp(user: User) {
    return new Promise<any>((resolve, reject) => {

      this.auth.createUserWithEmailAndPassword(user.credentials.username, user.credentials.password).then(response => {
        // 1. persist profile info
        this.db.collection<any>("users").doc(response.user?.uid).set(user.toProfile(response.user?.uid)).then(() => {
          // 2. get last inserted user
          this.db.collection<any>("users").doc(response.user?.uid).valueChanges().subscribe(data => {
            // 3. set local storage
            const credentials = {
              uid: data.uid,
              firstname: data.firstname,
              lastname: data.lastname,
              username: data.email,
              roles: data.roles
            };
            localStorage.setItem('userCredentials', JSON.stringify(credentials));
            this.logged.next(true);
            resolve(credentials)
          });
        });
      }).catch(error => reject(error));

    });
  }

  public async signOut() {
    this.logged.next(false);
    localStorage.removeItem('userCredentials');
    //this.auth.signOut();
    this.router.navigate(['/home']);
  }

  public isLogged() {
    const item = localStorage.getItem('userCredentials');
    return (item !== null) ? true : false;
  }

  public getCurrentUser() {
    const item = localStorage.getItem('userCredentials');
    const user = !item ? item : JSON.parse(item);
    return user?.email;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    //console.log(errorMessage);
    return throwError(errorMessage);
  }
}
