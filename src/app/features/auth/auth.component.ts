import { Component, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { Form } from './types';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    DialogModule,
    LoginFormComponent,
    ButtonModule,
    RegistrationFormComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  @Input() visible: boolean = false;
  form: Form = 'login';

  changeForm(formType: Form) {
    this.form = formType;
  }

  onAuthButtonClick() {
    this.visible = true;
  }
}
