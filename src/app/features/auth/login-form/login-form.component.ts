import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import validateInput from 'shared/lib/validateInput';
import { Form } from '../types';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'shared/api/services/auth.service';
import { Router } from '@angular/router';
import { AUTH_TOKEN } from 'shared/consts/storageKeys';
import { AuthModalService } from '../auth-modal.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  @Output() changeForm = new EventEmitter<Form>();
  private authService = inject(AuthService);
  private authModalService = inject(AuthModalService);
  private router = inject(Router);
  isLoading = false;
  readonly validateInput = validateInput;
  loginForm = new FormGroup({
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  handleFormSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.setItem(AUTH_TOKEN, response.guid);
        this.router.navigate(['profile', response.guid]);
        this.authModalService.close();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
