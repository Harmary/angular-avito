import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProfilePageComponent } from 'pages/profile-page/profile-page.component';
import { authGuard } from 'core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Main page',
    component: MainPageComponent,
  },
  {
    path: 'profile/:guid',
    title: 'Profile page',
    component: ProfilePageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'ad',
    title: 'Ad page',
    loadChildren: async () => (await import('./pages/ad-page')).adPageRoutes,
  },
  {
    path: ':subcategoryId',
    title: 'Main page',
    component: MainPageComponent,
  },
  {
    path: '**',
    title: 'Page 404',
    loadComponent: () =>
      import('./pages/error-page/error-page.component').then(
        (c) => c.ErrorPageComponent
      ),
  },
];
