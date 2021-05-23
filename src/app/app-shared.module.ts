import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomCaptchaComponent } from './components/shared/custom-captcha/custom-captcha.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    CustomCaptchaComponent
  ],
  exports: [
    CustomCaptchaComponent
  ]
})
export class AppSharedModule { }
