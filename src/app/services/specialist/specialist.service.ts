import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Speciality } from 'src/app/models/speciality';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BlobFile } from 'src/app/models/blob-flile';
import { ProfileInformation } from 'src/app/models/profile/profile-information';
import { Specialist } from 'src/app/models/specialist';
import { UserCredentials } from 'src/app/models/user/user-credentials';
import { UserRegistrationData } from 'src/app/models/user/user-registration-data';
import { LoggedEventService } from '../layout/logged-event.service';
import { BlobStorageService } from '../utils/blob-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialistService {

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private blob: BlobStorageService,
    private router: Router,
    private logged: LoggedEventService
  ) { }

  public getSpecialities() {
    return this.db.collection<Speciality>("specialities").valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public addSpeciality(speciality: Speciality) {
    return this.db.collection<Speciality>("specialities")
      	        	.doc(speciality.name)
                  .set(speciality);
  }

  public registerSpecialist(registrationData: UserRegistrationData<Specialist>, pictures: BlobFile[]) {
    return new Promise<string>((resolve, reject) => {
      this.createUserWithEmailAndPassword(registrationData.credentials).then(response => {
        registrationData.profile.claims.uid = response.user!.uid;
        const pics = this.setFileName(registrationData.profile.claims.uid, pictures);
        this.uploadProfilePictures(pics).then(imageUrls => {
          registrationData.profile.claims.photoUrls = imageUrls;
          this.uploadProfile(registrationData.profile);
          resolve(response.user!.uid);
        });
      });
    });
  }

  private createUserWithEmailAndPassword(credentials: UserCredentials) {
    return this.auth.createUserWithEmailAndPassword(credentials.username, credentials.password);
  }
  private setFileName(uid: string, pictures: BlobFile[]) : BlobFile[] {
    let i = 0;
    pictures.map(p => {
      p.filename = `users/${uid}_${Date.now()}_${i}.jpeg`;
      i++;
    });
    return pictures;
  }
  private uploadProfilePictures(pictures: BlobFile[]) {
    return this.blob.uploadFiles(pictures);
  }
  private uploadProfile(profile: ProfileInformation<Specialist>) {
    const docRef = this.db.collection("users").doc(profile.claims.uid);
    return docRef.set(profile).then(
      res => {
        console.log(res);
      },
      err => this.handleError(err)
    )
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error ocurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    return throwError(errorMessage);
  }
}
