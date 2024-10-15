import { Component, inject, OnInit } from '@angular/core';
import { isUndefined } from 'lodash';
import { switchMap } from 'rxjs';
import { AdvertsService } from 'shared/api/services';
import { AuthService } from 'shared/api/services/auth.service';
import currencyFormatter from 'shared/lib/currencyFormatter';
import { AsyncWrapperComponent } from 'shared/ui/async-wrapper/async-wrapper.component';
import { Advert } from 'widgets/ad-card';
import { AdCardComponent } from 'widgets/ad-card/ad-card.component';

@Component({
  selector: 'app-user-adverts',
  standalone: true,
  imports: [AdCardComponent, AsyncWrapperComponent],
  templateUrl: './user-adverts.component.html',
  styleUrl: './user-adverts.component.scss',
})
export class UserAdvertsComponent implements OnInit {
  authService = inject(AuthService);
  advertsService = inject(AdvertsService);
  userId?: string;
  adverts?: Advert[];
  isLoading: boolean = false;
  error?: string;

  ngOnInit(): void {
    this.isLoading = true;
    this.authService.authState$
      .pipe(
        switchMap((state) => {
          this.userId = state.user?.id;
          if (!isUndefined(state.user?.id)) {
            return this.advertsService.getAdvertByUserID(state.user?.id);
          } else return [];
        })
      )
      .subscribe({
        next: (adverts) => {
          this.isLoading = false;
          this.error = undefined;
          if (adverts.length == 0) {
            this.error = 'Вы еще не добавили объявления';
          } else {
            this.adverts = adverts
          }
        },
        error: () => {
          this.isLoading = false;
          this.error = 'Что-то пошло не так';
        },
      });
  }
}
