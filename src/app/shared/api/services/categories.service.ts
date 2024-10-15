import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { createFind } from 'rxjs/internal/operators/find';
import { environment } from 'shared/environments/environments';
import { BreadcrumbsDTO } from '../dtos/BreadcrumbsDTO';
import { Category } from 'widgets/categories-sidebar/types';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private _apiUrl = `${environment.apiUrl}categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(this._apiUrl);
  }

  getCategoryById(id: string): Observable<CategoryDTO> {
    return this.http.get<any>(this._apiUrl).pipe(
      map((data) => {
        for (let category of data) {
          if (category.guid === id) {
            return category;
          }
          for (let section of category.sections) {
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

  getBreadcrumbs(subcategoryId: string): Observable<BreadcrumbsDTO | undefined> {
    return this.http.get<Category[]>(this._apiUrl).pipe(
      map((data) => {
        for (let category of data) {
          for (let section of category.sections) {
            for (let subcategory of section.subcategories) {
              if (subcategory.guid === subcategoryId) {
                return {
                  category: {
                    name: category.name,
                    guid: category.guid,
                  },
                  section: {
                    name: section.name,
                    guid: section.guid,
                  },
                  subcategory,
                };
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
