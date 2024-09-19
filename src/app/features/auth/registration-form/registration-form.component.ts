import { Component, EventEmitter, Output } from '@angular/core';
import { Form } from '../types';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import validateInput from 'shared/lib/validateInput';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ButtonModule, InputGroupModule, InputTextModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
  @Output() changeForm = new EventEmitter<Form>();
  readonly validateInput = validateInput;
  loginForm = new FormGroup({
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
}
