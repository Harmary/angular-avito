import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { map, switchMap } from 'rxjs';
import { AdvertsService, CategoriesService } from 'shared/api/services';
import { Advert } from 'widgets/ad-card';
import { GalleriaModule } from 'primeng/galleria';
import { BreadcrumbsDTO } from 'shared/api/dtos/BreadcrumbsDTO';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ad-page',
  standalone: true,
  imports: [ButtonModule, GalleriaModule, RouterModule, BreadcrumbModule],
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

  readonly adId$ = this._activatedRoute.params.pipe(
    map((params) => params['adId'] as string | undefined)
  );

  ngOnInit(): void {
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
        }},
        error: () => {},
      });
  }

  openPhoneNumber() {
    this.isPhoneOpened = !this.isPhoneOpened;
  }
}
