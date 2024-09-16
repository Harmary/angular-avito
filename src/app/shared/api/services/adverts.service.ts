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

  getAdverts(subcategoryId?: string): Observable<AdvertDTO[]> {
    let params = new HttpParams();

    if (subcategoryId !== undefined) {
      params = params.set('subcategory', subcategoryId);
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
