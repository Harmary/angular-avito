import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvertDTO } from '../dtos';

@Injectable({
  providedIn: 'root',
})
export class AdvertsService {
  readonly http = inject(HttpClient);
  private _apiUrl = 'http://localhost:8000/adverts';

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
      params = params.set('guid', adId);
    }

    return this.http.get<AdvertDTO[]>(this._apiUrl, {
      params,
    });
  }
}
