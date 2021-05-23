import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './components/layout/top-nav/top-nav.component';
import { SideNavComponent } from './components/layout/side-nav/side-nav.component';
import { SigninComponent } from './routes/signin/signin.component';
import { HomeComponent } from './routes/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninFormComponent } from './components/user/signin-form/signin-form.component';
import { SignupComponent } from './routes/signup/signup.component';
import { AdminRegistrationFormComponent } from './components/user/admin-registration-form/admin-registration-form.component';
import { PatientRegistrationFormComponent } from './components/user/patient-registration-form/patient-registration-form.component';
import { SpecialistRegistrationFormComponent } from './components/user/specialist-registration-form/specialist-registration-form.component';
import { SpinnerComponent } from './components/layout/spinner/spinner.component';
import { PromptComponent } from './components/layout/prompt/prompt.component';
import { SpecialitySelectorComponent } from './components/shared/speciality-selector/speciality-selector.component';
import { UserManagerComponent } from './components/user/user-manager/user-manager.component';
import { EnrollmentComponent } from './routes/enrollment/enrollment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppSharedModule } from './app-shared.module';



@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavComponent,
    SigninComponent,
    HomeComponent,
    SigninFormComponent,
    SignupComponent,
    AdminRegistrationFormComponent,
    PatientRegistrationFormComponent,
    SpecialistRegistrationFormComponent,
    SpinnerComponent,
    PromptComponent,
    SpecialitySelectorComponent,
    UserManagerComponent,
    EnrollmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppSharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
