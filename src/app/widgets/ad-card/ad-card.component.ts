import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Advert } from './types';
import { AdvertsService } from 'shared/api/services';
import { MessageService } from 'primeng/api';
import { CustomCurrencyPipe } from 'shared/lib/currency.pipe';
import { ShortenPipe } from "../../shared/lib/shorten.pipe";

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterModule, CustomCurrencyPipe, ShortenPipe],
  providers: [MessageService],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss',
})
export class AdCardComponent {
  @Input() card?: Advert;
  @Input() readonly: boolean = true;
  private _advertService = inject(AdvertsService);
  private messageService = inject(MessageService);

  onEditClick(event: MouseEvent) {
    event.stopPropagation();
  }

  deleteAdvert(cardId?: string) {
    this._advertService.deleteAdvertById(cardId).subscribe({
      next: () => {
        this._advertService.getAdvertByUserID(this.card?.userGuid).subscribe({
          next: (adverts) => {
            console.log('Available adverts:', adverts);
          },
          error: (error) => {
            console.error('Error fetching adverts:', error);
          },
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Удаление успешно',
          detail: 'Объявление было успешно удалено',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ошибка удаления',
          detail: 'Не удалось удалить объявление',
        });
        console.error('Error deleting advert:', error);
      },
    });
  }
}
