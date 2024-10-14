import { Routes } from '@angular/router';
import { UserAdvertsComponent } from './user-adverts.component';

export const userAdvertsPageRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserAdvertsComponent,
  },
];
