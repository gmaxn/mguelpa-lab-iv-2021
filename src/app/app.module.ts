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
    SpecialistRegistrationFormComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
