import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private db: AngularFirestore,
  ) { }

  public getPatientAppointments(uid:string) {
    return this.db.collection<any>("users").doc(uid).collection('appointments').valueChanges().pipe(
      catchError(this.handleError)
    );
  }

  public deleteAppointment(patientId: string, appointmentId: string, reazon: string) {
    return this.db.collection<any>("users").doc(patientId).collection('appointments').doc(appointmentId).update({ isCancelled: reazon, status: "Cancelado" });
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
