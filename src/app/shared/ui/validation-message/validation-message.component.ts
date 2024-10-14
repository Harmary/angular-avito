import { Component, ContentChild } from '@angular/core';
import { NgModel, NgControl } from '@angular/forms';
import { DefaultValidationMessages } from './validation-messages';
import validateInput from 'shared/lib/validateInput';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  imports: [],
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss',
})
export class ValidationMessageComponent {
  @ContentChild(NgModel) public control: NgControl;
  defaultValidationMessages = new DefaultValidationMessages();

  constructor(control: NgControl) {
    this.control = control;
  }

  public get errors() {
    console.log(this.control.errors);
    return this.control.errors;
  }
}
