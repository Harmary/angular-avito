import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserDTO } from '../dtos/UserDTO';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  readonly http = inject(HttpClient);
  private _userUrl = 'http://localhost:8000/users';

  updateUser(user: UserDTO) {
    return this.http.put<UserDTO>(`${this._userUrl}/${user.id}`, user);
  }
}
