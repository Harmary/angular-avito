import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AdPageComponent } from './pages/ad-page/ad-page.component';

export const routes: Routes = [
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
    path: '',
    title: 'Main page',
    component: MainPageComponent,
  },
];
