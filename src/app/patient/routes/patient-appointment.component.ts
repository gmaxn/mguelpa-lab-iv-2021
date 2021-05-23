import { Component, OnInit } from '@angular/core';
import { UserCredentials } from 'src/app/models/user/user-credentials';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-appointment',
  styles: [
  `:host {
     display: grid;
     grid-template-rows: 100px 600px auto;
     grid-template-columns: auto 800px auto;
   }
   #tab_container {
       grid-row: 2;
       grid-column: 2;
   }
   #header {
       grid-row: 1;
       grid-column: 2;
       margin:auto;
   }`
  ],
  template: 
  `<h2 id="header">Autogestión - Clinica OMED</h2>
   <div id="tab_container">
       <nav>
           <div class="nav nav-tabs" id="nav-tab" role="tablist">
               <button id="tab_patient" class="nav-link active" id="nav-patient-tab" data-bs-toggle="tab" data-bs-target="#nav-patient" type="button" role="tab" aria-controls="nav-patient" aria-selected="false">Mis Turnos</button>
           </div>
       </nav>
       <div class="tab-content" id="nav-tabContent">
           <div class="tab-pane fade show active" id="nav-patient" role="tabpanel" aria-labelledby="nav-patient-tab">
               <app-patient-appointment-tab (appointmentCancelation)="appointmentCancelation($event)" (appointmentDetails)="appointmentDetails($event)"></app-patient-appointment-tab>
           </div>
       </div>
   </div>
   <app-patient-appointment-modal *ngIf="displayModal" [item]="appointment" [mode]="modalMode" (response)="modalResponse($event)"></app-patient-appointment-modal>`
})
export class PatientAppointmentComponent implements OnInit {

  private user: UserCredentials | any;

  public appointment: any;

  public displayModal: boolean = false;

  public modalMode: string = "";

  constructor(
    private appointments: PatientService,
    private auth:AuthenticationService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getCurrentUserCredentials();
  }

  appointmentCancelation(appointment:any) {
      this.appointment = appointment;
      this.modalMode = 'cancel';
      this.displayModal = true;
  }

  appointmentDetails(appointment:any) {
    this.appointment = appointment;
    this.modalMode = 'details';
    this.displayModal = true;
  }

  modalResponse(response:any) {
      this.displayModal = !this.displayModal;
      this.modalMode = '';
      if(response.succeed) {
        this.appointments.deleteAppointment(this.user.uid, this.appointment.uid, response.data);
      }
  }
}
