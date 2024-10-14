import { Component, inject, OnInit } from '@angular/core';
import { isUndefined } from 'lodash';
import { switchMap } from 'rxjs';
import { AdvertsService } from 'shared/api/services';
import { AuthService } from 'shared/api/services/auth.service';
import { Advert } from 'widgets/ad-card';

@Component({
  selector: 'app-user-adverts',
  standalone: true,
  imports: [],
  templateUrl: './user-adverts.component.html',
  styleUrl: './user-adverts.component.scss',
})
export class UserAdvertsComponent implements OnInit {
  authService = inject(AuthService);
  advertsService = inject(AdvertsService);
  userId?: string;
  adverts?: Advert[];

  ngOnInit(): void {
    this.authService.authState$
      .pipe(
        switchMap((state) => {
          this.userId = state.user?.id;
          if (!isUndefined(state.user?.id)) {
            return this.advertsService.getAdvertByUserID(state.user?.id);
          }
          else return [];
        })
      )
      .subscribe((adverts) => {
        this.adverts = adverts;
      });
  }
}
