import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { Form } from '../types';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import validateInput from 'shared/lib/validateInput';
import { AuthService } from 'shared/api/services/auth.service';
import { Router } from '@angular/router';
import { AuthModalService } from '../auth-modal.service';
import { AUTH_TOKEN } from 'shared/consts/storageKeys';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
  @Output() changeForm = new EventEmitter<Form>();
  private authService = inject(AuthService);
  private authModalService = inject(AuthModalService);
  private router = inject(Router);
  readonly validateInput = validateInput;
  destroyRef = inject(DestroyRef);
  isLoading = false;
  registrationForm = new FormGroup({
    phone: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        ),
      ],
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

  handleFormSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAsTouched();
      return;
    }

    this.isLoading = true;

    this.authService
      .registration(this.registrationForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          localStorage.setItem(AUTH_TOKEN, response.id);
          this.isLoading = false;
          this.authModalService.close();
          this.router.navigate(['profile', response.id]);
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
}
