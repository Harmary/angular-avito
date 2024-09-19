import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { LoginDTO } from '../dtos';
import { LoginResponseDTO } from '../dtos/LoginDTO';
import { AUTH_TOKEN } from 'shared/consts/storageKeys';

export interface AuthorizationState {
  user?: LoginResponseDTO;
  isAuthorized: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly http = inject(HttpClient);
  private _apiUrl = 'http://localhost:8000/login';
  private _stateSubject = new ReplaySubject<AuthorizationState>(1);

  readonly authState$ = this._stateSubject.asObservable();

  readonly isAuthorized$ = this.authState$.pipe(
    map((state) => state.isAuthorized)
  );

  login(params: LoginDTO): Observable<LoginResponseDTO> {
    return this.http
      .post<LoginResponseDTO>(this._apiUrl, {
        ...params,
      })
      .pipe(tap((response) => {
         this._stateSubject.next({ isAuthorized: true, user: response });
      }));
  }

  logout(): void {
    this._stateSubject.next({ isAuthorized: false, user: undefined });
    localStorage.removeItem(AUTH_TOKEN);
  }
}
