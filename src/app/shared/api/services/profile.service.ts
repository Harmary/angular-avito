import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDTO } from '../dtos/UserDTO';
import { AuthService } from './auth.service';
import { environment } from 'shared/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly http = inject(HttpClient);
  readonly authService = inject(AuthService);
  private _userUrl = `${environment.apiUrl}users`;

  updateUser(user: UserDTO) {
    this.authService.updateUserState(user);
    return this.http.put<UserDTO>(`${this._userUrl}/${user.id}`, user);
  }
}
