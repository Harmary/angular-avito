import { Component } from '@angular/core';
import { AdCardComponent } from '../../widgets/ad-card/ad-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, AdCardComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  cards = [
    {
      title: 'Продажа квартиры',
      image:
        'https://cdn.theatlantic.com/thumbor/tO5tLGl38cH3MjWz3PypY1dPHX4=/0x62:2000x1187/960x540/media/img/mt/2018/03/AP_325360162607/original.jpg',
      amount: '5000000',
      address: 'ул. Ленина, д. 10, кв. 5, Севастополь',
      date: '2024-08-20',
    },
    {
      title: 'Аренда офиса',
      image:
        'https://cdn.theatlantic.com/thumbor/tO5tLGl38cH3MjWz3PypY1dPHX4=/0x62:2000x1187/960x540/media/img/mt/2018/03/AP_325360162607/original.jpg',
      amount: '150000',
      address: 'пр. Нахимова, д. 15, Севастополь',
      date: '2024-08-22',
    },
    {
      title: 'Продажа автомобиля',
      image:
        'https://st2.depositphotos.com/5482604/8042/i/450/depositphotos_80421568-Funny-cats-driving-a-moped.jpg',
      amount: '1200000',
      address: 'ул. Гагарина, д. 3, Севастополь',
      date: '2024-08-23',
    },
    {
      title: 'Продажа автомобиля',
      image:
        'https://cdn.theatlantic.com/thumbor/tO5tLGl38cH3MjWz3PypY1dPHX4=/0x62:2000x1187/960x540/media/img/mt/2018/03/AP_325360162607/original.jpg',
      amount: '1200000',
      address: 'ул. Гагарина, д. 3, Севастополь',
      date: '2024-08-23',
    },
    {
      title: 'Продажа квартиры',
      image:
        'https://cdn.theatlantic.com/thumbor/tO5tLGl38cH3MjWz3PypY1dPHX4=/0x62:2000x1187/960x540/media/img/mt/2018/03/AP_325360162607/original.jpg',
      amount: '5000000',
      address: 'ул. Ленина, д. 10, кв. 5, Севастополь',
      date: '2024-08-20',
    },
    {
      title: 'Аренда офиса',
      image:
        'https://cdn.theatlantic.com/thumbor/tO5tLGl38cH3MjWz3PypY1dPHX4=/0x62:2000x1187/960x540/media/img/mt/2018/03/AP_325360162607/original.jpg',
      amount: '150000',
      address: 'пр. Нахимова, д. 15, Севастополь',
      date: '2024-08-22',
    },
    {
      title: 'Продажа автомобиля',
      image:
        'https://cdn.theatlantic.com/thumbor/tO5tLGl38cH3MjWz3PypY1dPHX4=/0x62:2000x1187/960x540/media/img/mt/2018/03/AP_325360162607/original.jpg',
      amount: '1200000',
      address: 'ул. Гагарина, д. 3, Севастополь',
      date: '2024-08-23',
    },
    {
      title: 'Продажа автомобиля',
      image:
        'https://cdn.theatlantic.com/thumbor/tO5tLGl38cH3MjWz3PypY1dPHX4=/0x62:2000x1187/960x540/media/img/mt/2018/03/AP_325360162607/original.jpg',
      amount: '1200000',
      address: 'ул. Гагарина, д. 3, Севастополь',
      date: '2024-08-23',
    },
  ];
}
