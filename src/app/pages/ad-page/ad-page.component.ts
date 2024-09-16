import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { map, switchMap } from 'rxjs';
import { AdvertsService } from '../../shared/api/services';
import { Advert } from '../../widgets/ad-card';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-ad-page',
  standalone: true,
  imports: [ButtonModule, GalleriaModule],
  templateUrl: './ad-page.component.html',
  styleUrl: './ad-page.component.scss',
})
export class AdPageComponent {
  private _activatedRoute = inject(ActivatedRoute);
  private _advertService = inject(AdvertsService);
  advert: Advert | undefined;
  isPhoneOpened: boolean = false

  readonly adId$ = this._activatedRoute.params.pipe(
    map((params) => params['adId'] as string | undefined)
  );

  ngOnInit(): void {
    this.adId$
      .pipe(
        switchMap((adId) => {
          return this._advertService.getAdvertByID(adId);
        })
      )
      .subscribe({
        next: (adverts) => {
          [this.advert] = adverts;
        },
        error: () => {},
      });
  }

  openPhoneNumber () {
    this.isPhoneOpened = !this.isPhoneOpened;
  }
}
