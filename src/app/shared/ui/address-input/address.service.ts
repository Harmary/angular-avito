import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'shared/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private url =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  private token = environment.dadataToken;

  constructor(private http: HttpClient) {}

  searchAddress(query: string): Observable<any[]> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: 'Token ' + this.token,
      },
    };
    return this.http
      .post<any>(this.url, { query }, options)
      .pipe(map((response) => response.suggestions || []));
  }
}
