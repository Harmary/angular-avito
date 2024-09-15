import { Component, EventEmitter, Output } from '@angular/core';
import { Form } from '../types';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ButtonModule, InputGroupModule, InputTextModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
  @Output() changeForm = new EventEmitter<Form>();
}
