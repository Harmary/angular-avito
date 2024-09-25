import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _apiUrl = 'http://localhost:8000/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(this._apiUrl);
  }

  getCategoryById(id: string): Observable<CategoryDTO> {

    return this.http
      .get<any>(this._apiUrl)
      .pipe(
        map((data) => {
          for (let category of data) {
            if (category.guid === id) {
              return category;
            }
            for(let section of category.sections) {
             if (section.guid === id) {
               return section;
             }
             for (let subcategory of section.subcategories) {
               if (subcategory.guid === id) {
                 return subcategory;
               }
             }
            }
          }

          return undefined;
        })
      );
  }
}

interface CategoryDTO {
  guid: string;
  name: string;
}
