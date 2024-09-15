import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss',
})
export class AdCardComponent {
  @Input() card: Card | undefined;
}

type Card = {
  title: string;
  image: string;
  amount: string;
  address: string;
  date: string;
};
