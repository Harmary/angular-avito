import { Component, inject, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LoginFormComponent } from './login-form/login-form.component';
import { Form, User } from './types';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AuthModalService } from './auth-modal.service';
import { AuthService } from 'shared/api/services/auth.service';
import { RouterLink } from '@angular/router';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    DialogModule,
    LoginFormComponent,
    ButtonModule,
    RegistrationFormComponent,
    RouterLink,
    UserMenuComponent,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  @Input() visible: boolean = false;
  private authModalService = inject(AuthModalService);
  private authService = inject(AuthService);
  form: Form = 'login';
  user?: User = undefined;
  isLoading?: boolean = undefined;

  constructor() {
    this.authModalService.isOpen$
      .pipe(takeUntilDestroyed())
      .subscribe((isOpen) => {
        this.visible = isOpen;
      });

    this.authService.authState$
      .pipe(takeUntilDestroyed())
      .subscribe((state) => {
        this.user = state.user;
        this.isLoading = state.isLoading;
      });

    this.authService.isAuthorized();
  }

  changeForm(formType: Form) {
    this.form = formType;
  }

  onAuthButtonClick() {
    this.visible = true;
  }
}
