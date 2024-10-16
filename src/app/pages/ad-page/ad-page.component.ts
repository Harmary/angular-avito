import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { map, switchMap } from 'rxjs';
import { AdvertsService, CategoriesService } from 'shared/api/services';
import { Advert } from 'widgets/ad-card';
import { GalleriaModule } from 'primeng/galleria';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import currencyFormatter, { CustomCurrencyPipe } from 'shared/lib/currency.pipe';
import { AsyncWrapperComponent } from "shared/ui/async-wrapper/async-wrapper.component";
import { PhoneFormatPipe } from "shared/lib/phone.pipe";

@Component({
  selector: 'app-ad-page',
  standalone: true,
  imports: [
    ButtonModule,
    GalleriaModule,
    RouterModule,
    BreadcrumbModule,
    CustomCurrencyPipe,
    AsyncWrapperComponent,
    PhoneFormatPipe,
  ],
  templateUrl: './ad-page.component.html',
  styleUrl: './ad-page.component.scss',
})
export class AdPageComponent {
  private _activatedRoute = inject(ActivatedRoute);
  private _advertService = inject(AdvertsService);
  private _categoriesService = inject(CategoriesService);
  advert: Advert | undefined;
  breadcrumbs: MenuItem[] | undefined;
  isPhoneOpened: boolean = false;
  fullscreen: boolean = false;
  displayBasic: boolean = false;
  currencyFormatter = currencyFormatter;
  isLoading: boolean = false;
  error?: string;

  readonly adId$ = this._activatedRoute.params.pipe(
    map((params) => params['adId'] as string | undefined)
  );

  ngOnInit(): void {
    this.isLoading = true;
    this.error = undefined;
    this.adId$
      .pipe(
        switchMap((adId) => {
          return this._advertService.getAdvertByID(adId).pipe(
            switchMap((adverts) => {
              [this.advert] = adverts;
              return this._categoriesService.getBreadcrumbs(
                this.advert.subcategory
              );
            })
          );
        })
      )
      .subscribe({
        next: (breadcrumbs) => {
          if (breadcrumbs) {
            this.breadcrumbs = [
              {
                label: breadcrumbs.category.name,
                route: `/${breadcrumbs.category.guid}`,
              },
              {
                label: breadcrumbs.section.name,
                route: `/${breadcrumbs.category.guid}/${breadcrumbs.section.guid}`,
              },
              {
                label: breadcrumbs.subcategory.name,
                route: `/${breadcrumbs.category.guid}/${breadcrumbs.section.guid}/${breadcrumbs.subcategory.guid}`,
              },
            ];
            this.isLoading = false;
          }
        },
        error: () => {
          this.error = 'Что-то пошло не так';
        },
      });
  }

  openPhoneNumber() {
    this.isPhoneOpened = !this.isPhoneOpened;
  }

  openFullScreen() {
    this.displayBasic = true;
  }
}
