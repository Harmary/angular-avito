import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { Form } from '../types';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ButtonModule, InputGroupModule, InputTextModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  @Output() changeForm =  new EventEmitter<Form>();

}
