import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-captcha',
  templateUrl: './custom-captcha.component.html',
  styleUrls: ['./custom-captcha.component.css']
})
export class CustomCaptchaComponent implements OnInit {

  public input: string = '';

  private rdmKey:string = '';

  public src = '';

  public valid = false;

  @Output() captchaValidation: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {

    this.refreshCaptcha();


  }

  validateCaptcha() {
    if(this.input === this.rdmKey) {
      this.valid = true;
    }
    else {
      this.valid = false;
    }
    this.captchaValidation.emit(this.valid)
  }

  refreshCaptcha() {

    this.input = '';
    
    this.src = '';

    this.valid = false;

    this.captchaValidation.emit(this.valid)

    this.rdmKey = this.randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

    this.generateCaptcha(this.rdmKey);
  }

  private randomString(length:number, chars:string) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  private generateCaptcha(random:string) {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    ctx!.font = "60px 'Londrina Sketch'";
    ctx!.fillStyle = "red";
    ctx!.fillText(random, 100, 100);
    ctx!.fillRect(200, 150, 150, 75);

    const dataUri = canvas.toDataURL();

    this.src = dataUri;
  }
}
