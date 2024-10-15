import { Component, inject } from '@angular/core';
import { AdCardComponent } from 'widgets/ad-card/ad-card.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, distinctUntilChanged, map, switchMap } from 'rxjs';
import { AdvertsService, CategoriesService } from 'shared/api/services';
import { Advert } from 'widgets/ad-card';
import { isNil } from 'lodash';
import { AsyncWrapperComponent } from 'shared/ui/async-wrapper/async-wrapper.component';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    AdCardComponent,
    CurrencyPipe,
    AsyncWrapperComponent,
    DropdownModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  private _activatedRoute = inject(ActivatedRoute);
  private _advertService = inject(AdvertsService);
  private _categoryService = inject(CategoriesService);
  cards: Advert[] | undefined;
  title: string = 'Рекомендации для вас';

  sortOptions = [
    { label: 'Дешевле', value: 'priceAsc' },
    { label: 'Дороже', value: 'priceDesc' },
    { label: 'Новые', value: 'dateDesc' },
    { label: 'Старые', value: 'dateAsc' },
  ];
  selectedSortOption: string = 'price';

  isLoading: boolean = false;
  error?: string;

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
    this.isLoading = true;
    this.error = undefined;

    this.idToFetch$
      .pipe(
        switchMap(({ id, type }) => {
          return this._categoryService.getCategoryById(id!);
        })
      )
      .subscribe({
        next: (category) => {
          if (category) {
            this.title = category.name;
          }
        },
        error: () => {},
      });

    this.idToFetch$
      .pipe(
        switchMap(({ id, type }) => {
          return this._advertService.getAdverts(type, id);
        })
      )
      .subscribe({
        next: (adverts) => {
          this.isLoading = false;
          if (adverts.length == 0) {
            this.error = 'Объявлений по данной категории не найдено';
          } else {
            this.cards = adverts;
          }
        },
        error: () => {
          this.isLoading = false;
          this.error = 'Что-то пошло не так';
        },
      });

  }

  sortCards(): void {
    if (this.cards) {
      switch (this.selectedSortOption) {
        case 'priceAsc':
          this.cards.sort((a, b) => Number(a.price) - Number(b.price));
          break;
        case 'priceDesc':
          this.cards.sort((a, b) => Number(b.price) - Number(a.price));
          break;
        case 'dateAsc':
          this.cards.sort(
            (a, b) =>
              dayjs(a.date, 'DD-MM-YYYY').valueOf() -
              dayjs(b.date, 'DD-MM-YYYY').valueOf()
          );
          break;
        case 'dateDesc':
          this.cards.sort(
            (a, b) =>
              dayjs(b.date, 'DD-MM-YYYY').valueOf() -
              dayjs(a.date, 'DD-MM-YYYY').valueOf()
          );
          break;
      }
    }
  }

  onSortChange(event: DropdownChangeEvent): void {
    this.selectedSortOption = event.value;
    this.sortCards();
  }
}
