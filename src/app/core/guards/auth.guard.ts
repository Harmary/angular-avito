import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthModalService } from 'features/auth/auth-modal.service';
import { AUTH_TOKEN } from 'shared/consts/storageKeys';

export const authGuard: CanActivateFn = (route, state) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const modalService = inject(AuthModalService);

  if (authToken) {
    return true;
  }

  modalService.open();
  return false;
};
