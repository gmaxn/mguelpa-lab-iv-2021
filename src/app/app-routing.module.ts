import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { SigninComponent } from './routes/signin/signin.component';
import { SignupComponent } from './routes/signup/signup.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
