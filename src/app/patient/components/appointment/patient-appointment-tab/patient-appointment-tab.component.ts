import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserCredentials } from 'src/app/models/user/user-credentials';
import { PatientService } from 'src/app/patient/services/patient.service';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-patient-appointment-tab',
  templateUrl: './patient-appointment-tab.component.html',
  styleUrls: ['./patient-appointment-tab.component.css']
})
export class PatientAppointmentTabComponent implements OnInit {

  @Output() appointmentCancelation: EventEmitter<any> = new EventEmitter<any>();
  @Output() appointmentDetails: EventEmitter<any> = new EventEmitter<any>();

  private user: UserCredentials | any;

  @Input() public appointments: any;

  @Input() public filtered: any;

  public _filterTerm: string | any;

  get filterTerm(): string {
    return this._filterTerm;
  }

  set filterTerm(value: string) {
    this._filterTerm = value;
    this.filtered = this.filterTerm ? this.performFilter(this._filterTerm) : this.appointments;
  }

  constructor(
    private ps: PatientService,
    private auth:AuthenticationService
  ) { }
 
  ngOnInit(): void {
    this.user = this.auth.getCurrentUserCredentials();

    this.ps.getPatientAppointments(this.user.uid).subscribe({
      next: appointments => {
        this.appointments = appointments.filter(a => !a.isCancelled);
        this.filtered = appointments.filter(a => !a.isCancelled);
      }
    });
  }

  performFilter(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase();
    return this.appointments.filter(
      (a: any) =>  (
        `${a.specialist.firstname, a.specialist.lastname}`.toLocaleLowerCase().indexOf(filterBy) !== -1) || 
           a.specialist.speciality.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onCancelation(appointment:any) {
    this.appointmentCancelation.emit(appointment);
  }

  details(appointment:any) {
    this.appointmentDetails.emit(appointment);
  }
}