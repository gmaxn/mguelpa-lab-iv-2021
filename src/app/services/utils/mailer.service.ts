import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  constructor(private _http: HttpClient) { }

  sendMessage(body:any) {
    return this._http.post('https://mguelpa-lab-iv-tp-clinica.herokuapp.com:8080/mailer', body);
  }
}
