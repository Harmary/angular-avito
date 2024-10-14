import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { User } from '../types';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'shared/api/services/auth.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [ButtonModule, TieredMenuModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss',
})
export class UserMenuComponent {
  @Input() user?: User;
  private router = inject(Router);
  private authService = inject(AuthService);

  menuItems: MenuItem[] = [
    {
      label: 'Профиль',
      icon: 'pi pi-user',
      command: () => {
        this.router.navigate(['profile']);
      },
    },
    {
      separator: true,
    },
    {
      label: 'Мои Объявления',
      icon: 'pi pi-folder',
      command: () => {
        this.router.navigate(['adverts']);
      },
    },
    {
      separator: true,
    },
    {
      label: 'Выйти',
      icon: 'pi pi-sign-out',
      command: () => {
         this.authService.logout()
        this.router.navigate(['']);
      }
    },
  ];
}
