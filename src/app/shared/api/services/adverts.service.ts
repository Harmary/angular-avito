import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertDTO } from '../dtos';
import { SubmitAdvertDTO } from '../dtos/SubmitAdvertDTO';
import { environment } from 'shared/environments/environments';
import { v4 } from 'uuid';
import { AuthService } from './auth.service';
import { User } from 'features/auth/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class AdvertsService {
  readonly http = inject(HttpClient);
  readonly auth = inject(AuthService);
  user?: User;
  private _apiUrl = `${environment.apiUrl}adverts`;

  constructor() {
    this.auth.authState$.pipe(takeUntilDestroyed()).subscribe((state) => {
      this.user = state.user;
    });
  }

  getAdverts(type: string, id?: string): Observable<AdvertDTO[]> {
    let params = new HttpParams();

    if (id !== undefined) {
      params = params.set(type, id);
    }

    return this.http.get<AdvertDTO[]>(this._apiUrl, {
      params,
    });
  }

  getAdvertByID(adId?: string): Observable<AdvertDTO[]> {
    let params = new HttpParams();

    if (adId !== undefined) {
      params = params.set('id', adId);
    }

    return this.http.get<AdvertDTO[]>(this._apiUrl, {
      params,
    });
  }

  getAdvertByUserID(userId?: string): Observable<AdvertDTO[]> {
    let params = new HttpParams();

    if (userId !== undefined) {
      params = params.set('userGuid', userId);
    }

    return this.http.get<AdvertDTO[]>(this._apiUrl, {
      params,
    });
  }

  deleteAdvertById(adId?: string): Observable<AdvertDTO[]> {
    return this.http.delete<AdvertDTO[]>(`${this._apiUrl}/${adId}`);
  }

  submitAdvert(data: SubmitAdvertDTO): Observable<AdvertDTO> {
    const payload = {
      ...data,
      price: String(data.price),
      date: dayjs().format('DD-MM-YYYY'),
      id: v4(),
      userGuid: this.user?.id,
      phone: this.user?.phone,
    };

    return this.http.post<AdvertDTO>(this._apiUrl, payload);
  }

  updateAdvert(data: AdvertDTO): Observable<AdvertDTO> {

    return this.http.put<AdvertDTO>(`${this._apiUrl}/${data.id}`, data);
  }
}
