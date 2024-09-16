import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-ad-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RouterModule
  ],
  templateUrl: './ad-card.component.html',
  styleUrl: './ad-card.component.scss',
})
export class AdCardComponent {
  @Input() card: any;
}
