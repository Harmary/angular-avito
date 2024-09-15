import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AdPageComponent } from './pages/ad-page/ad-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Main page',
    component: MainPageComponent,
    children: [
      {
        path: ':category',
        component: MainPageComponent,
      },
    ],
  },
  {
    path: 'ad',
    title: 'Ad page',
    component: AdPageComponent,
  },
];
