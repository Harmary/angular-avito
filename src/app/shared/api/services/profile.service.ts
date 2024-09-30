import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDTO } from '../dtos/UserDTO';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly http = inject(HttpClient);
  readonly authService = inject(AuthService);
  private _userUrl = 'http://localhost:8000/users';


  updateUser(user: UserDTO) {
    this.authService.updateUserState(user);
    return this.http.put<UserDTO>(`${this._userUrl}/${user.id}`, user);
  }
}
