import { Routes } from '@angular/router';
import { UserAdvertsComponent } from './user-adverts.component';
import { authGuard } from 'core/guards/auth.guard';

export const userAdvertsPageRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserAdvertsComponent,
    canActivate: [authGuard],
  },
];
