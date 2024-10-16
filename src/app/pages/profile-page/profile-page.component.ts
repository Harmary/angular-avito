import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from 'features/auth/types';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from 'shared/api/services/auth.service';
import { ProfileService } from 'shared/api/services/profile.service';
import validateInput from 'shared/lib/validateInput';
import { PhoneFormatPipe } from "../../shared/lib/phone.pipe";
import { AddressInputComponent } from "../../shared/ui/address-input/address-input.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    NgOptimizedImage,
    PhoneFormatPipe,
    AddressInputComponent
],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  readonly: boolean = true;
  readonly validateInput = validateInput;
  userForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(
          /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
        ),
      ],
    }),
    address: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });
  user?: User;
  formLabels: Record<string, string> = {
    name: 'Имя',
    address: 'Адрес',
    phone: 'Телефон',
  };
  formValidationMessages: Record<string, string | Record<string, string>> = {
    name: 'Введите имя',
    address: 'Введите адрес',
    phone: 'Введите номер телефона',
  };
  private authService = inject(AuthService);
  private profileService = inject(ProfileService);

  constructor() {
    this.authService.authState$.subscribe((state) => {
      this.userForm.setValue({
        name: state.user?.name || '',
        address: state.user?.address || '',
        phone: state.user?.phone || '',
      });

      this.user = state.user;
    });
  }

  editProfile() {
    this.readonly = false;
  }

  saveProfile() {
    if (this.userForm.invalid) {
      this.userForm.markAsTouched();
      return;
    }
    this.profileService
      .updateUser({
        ...this.user!,
        ...this.userForm.getRawValue(),
      })
      .subscribe();

    this.readonly = true;
  }

  arrayFromObject(obj: Record<string, FormControl<string>>) {
    return Object.entries(obj).map(([name, value]) => {
      return {
        name,
        value,
      };
    });
  }
}
