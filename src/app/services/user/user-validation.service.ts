import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ControlStateObject, ErrorState, ErrorStateObject } from 'src/app/models/error-state';

@Injectable({
  providedIn: 'root'
})
export class UserValidationService {

  public errors:ErrorStateObject = {
    pattern: {
      message: "La clave ingresada no cumple con los requisitos de seguridad.",
      class: "INVALID"
    },
    confirm: {
      message: "Las claves no coinciden.",
      class: "INVALID"
    },
    required: {
      message: "Campo requerido.",
      class: "INVALID"
    },
    email: {
      message: "Este campo debe ser un email válido.",
      class: "INVALID",
    }
  };

  getValidationState(errorName:string): ErrorState {
    return this.errors[errorName];
  }

  setState(controlStates:ControlStateObject, controlName: string, errorState: ErrorState) {
    let name = controlName.replace(/^.+[.]/, '');
    controlStates[name].message = errorState.message;
    controlStates[name].class = errorState.class;
  }

  setMessage(controlStates:ControlStateObject, c: AbstractControl, controlName: string) {
    this.clearState(controlStates, controlName);
    if (c.errors && (c.touched || c.dirty)) {
      let errorName = Object.keys(c.errors)[0];    
      this.setState(controlStates, controlName, this.getValidationState(errorName));
    }
  }

  clearState(controlStates:ControlStateObject, controlName: string) {
    let name = controlName.replace(/^.+[.]/, '');
    controlStates[name].message = '';
    controlStates[name].class = '';
  }

  resetStates(controlStates:ControlStateObject, ...controlNames: string[]) {
    controlNames.map(name => {
      this.clearState(controlStates, name);
    });
  }

  constructor() { }

  passwordCheck(c: AbstractControl): ValidationErrors | null {
    const pass = c.get('password');
    const confirm = c.get('confirm');

    if(pass !== null && confirm !== null) {
      if (pass.dirty && confirm.dirty && confirm.value === "") {
        return { 'required': true };
      }
      if (pass.dirty && confirm!.dirty && confirm.value !== pass.value) {
        return { 'confirm': true };
      }
    }
    return null;
  }
}
