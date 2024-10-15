import { Component, inject } from '@angular/core';
import { AdCardComponent } from '../../widgets/ad-card/ad-card.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, distinctUntilChanged, map, switchMap } from 'rxjs';
import { AdvertsService, CategoriesService } from '../../shared/api/services';
import { Advert } from '../../widgets/ad-card';
import { isNil } from 'lodash';
import currencyFormatter from 'shared/lib/currencyFormatter';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, AdCardComponent, CurrencyPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  private _activatedRoute = inject(ActivatedRoute);
  private _advertService = inject(AdvertsService);
  private _categoryService = inject(CategoriesService);
  cards: Advert[] | undefined;
  title: string = 'Рекомендации для вас';

  readonly categoryId$ = this._activatedRoute.params.pipe(
    map((params) => params['categoryId'] as string | undefined),
    distinctUntilChanged()
  );
  readonly sectionId$ = this._activatedRoute.params.pipe(
    map((params) => params['sectionId'] as string | undefined),
    distinctUntilChanged()
  );
  readonly subcategoryId$ = this._activatedRoute.params.pipe(
    map((params) => params['subcategoryId'] as string | undefined),
    distinctUntilChanged()
  );

  readonly idToFetch$ = combineLatest([
    this.categoryId$,
    this.sectionId$,
    this.subcategoryId$,
  ]).pipe(
    map(([categoryId, sectionId, subcategoryId]) => {
      if (!isNil(subcategoryId))
        return {
          id: subcategoryId,
          type: 'subcategory',
        };

      if (!isNil(sectionId))
        return {
          id: sectionId,
          type: 'section',
        };

      return {
        id: categoryId,
        type: 'category',
      };
    })
  );

  ngOnInit(): void {
    this.idToFetch$
      .pipe(
        switchMap(({ id, type }) => {
          return this._advertService.getAdverts(type, id);
        })
      )
      .subscribe({
        next: (adverts) => {
          this.cards = adverts.map((advert) => ({
            ...advert,
            price: currencyFormatter.format(Number(advert.price)),
          }));
        },
        error: () => {},
      });

    this.idToFetch$
      .pipe(
        switchMap(({ id, type }) => {
          return this._categoryService.getCategoryById(id!);
        })
      )
      .subscribe({
        next: (category) => {
          this.title = category.name;
        },
        error: () => {},
      });
  }
}
