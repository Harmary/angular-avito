import { Component, inject } from '@angular/core';
import { AdCardComponent } from '../../widgets/ad-card/ad-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { AdvertsService } from '../../shared/api/services';
import { Advert } from '../../widgets/ad-card';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, AdCardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  private _activatedRoute = inject(ActivatedRoute);
  private _advertService = inject(AdvertsService);
  cards: Advert[] | undefined;
  title: string = 'Рекомендации для вас';

  readonly subcategoryId$ = this._activatedRoute.params.pipe(
    map((params) => params['subcategoryId'] as string | undefined)
  );

  ngOnInit(): void {
    this.subcategoryId$
      .pipe(
        switchMap((subcategoryId) => {
          if (subcategoryId) {
            this.title = subcategoryId;
          }
          return this._advertService.getAdverts(subcategoryId);
        })
      )
      .subscribe({
        next: (adverts) => {
          this.cards = adverts;
        },
        error: () => {},
      });
  }
}
