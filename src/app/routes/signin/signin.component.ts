import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{

  @Input() prompt:any = {
    show: false
  };
  public message:string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onPrompt(error:any) {
    this.prompt.show = true;
    this.prompt.message = error;
    this.prompt.buttons = ['Ok'];
  }

  onResponse(response:any) {
    this.prompt = response;
  }
}
