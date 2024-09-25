import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { LoginDTO } from '../dtos';
import { LoginResponseDTO } from '../dtos/LoginDTO';
import { AUTH_TOKEN } from 'shared/consts/storageKeys';

export interface AuthorizationState {
  user?: LoginResponseDTO;
  isAuthorized: boolean;
  isLoading?: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly http = inject(HttpClient);
  private _loginUrl = 'http://localhost:8000/login';
  private _selectUserUrl = 'http://localhost:8000/users';
  private _stateSubject = new ReplaySubject<AuthorizationState>(1);

  readonly authState$ = this._stateSubject.asObservable();

  readonly isAuthorized$ = this.authState$.pipe(
    map((state) => state.isAuthorized)
  );

  login(params: LoginDTO): Observable<LoginResponseDTO> {
    this._stateSubject.next({
      isAuthorized: true,
      user: undefined,
      isLoading: true,
    });

    return this.http
      .post<LoginResponseDTO>(this._loginUrl, {
        ...params,
      })
      .pipe(
        tap((response) => {
          this._stateSubject.next({
            isAuthorized: true,
            user: response,
            isLoading: false,
          });
        })
      );
  }

  logout(): void {
    this._stateSubject.next({ isAuthorized: false, user: undefined });
    localStorage.removeItem(AUTH_TOKEN);
  }

  isAuthorized(): void {
    const token = localStorage.getItem(AUTH_TOKEN);

    if (token) {
      let params = new HttpParams();

      params = params.set('guid', token);

      this._stateSubject.next({
        isAuthorized: true,
        user: undefined,
        isLoading: true,
      });

      this.http
        .get<LoginResponseDTO[]>(this._selectUserUrl, {
          params,
        })
        .pipe(
          tap((response) => {
            this._stateSubject.next({
              isAuthorized: true,
              user: response[0],
              isLoading: false,
            });
          })
        )
        .subscribe();
    }
  }
}
