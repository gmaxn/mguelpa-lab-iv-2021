import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentComponent } from './routes/enrollment/enrollment.component';
import { HomeComponent } from './routes/home/home.component';
import { SigninComponent } from './routes/signin/signin.component';
import { SignupComponent } from './routes/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'enrollment', component: EnrollmentComponent, data: { animation: 'EnrollmentPage' } },
  { path: 'patient', loadChildren: () => import('./patient/patient.module').then(m => m.PatientModule) },
  // { path: 'routes/patient/patient-appointment', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  // { path: 'appointment', loadChildren: () => import('./routes/appointment/appointment.module').then(m => m.AppointmentModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
