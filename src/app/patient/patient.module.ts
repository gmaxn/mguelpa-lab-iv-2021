import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientAppointmentGridComponent } from './components/appointment/patient-appointment-grid/patient-appointment-grid.component';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientAppointmentTabComponent } from './components/appointment/patient-appointment-tab/patient-appointment-tab.component';
import { PatientAppointmentComponent } from './routes/patient-appointment.component';
import { FormsModule } from '@angular/forms';
import { PatientAppointmentModalComponent } from './components/appointment/patient-appointment-modal/patient-appointment-modal.component';


@NgModule({
  declarations: [
    PatientAppointmentComponent,
    PatientAppointmentGridComponent,
    PatientAppointmentTabComponent,
    PatientAppointmentModalComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule
  ]
})
export class PatientModule { }
