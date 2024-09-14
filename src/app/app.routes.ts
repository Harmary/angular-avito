import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AdPageComponent } from './pages/ad-page/ad-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Main page',
    component: MainPageComponent,
  },
  {
    path: 'ad',
    title: 'Ad page',
    component: AdPageComponent,
  },
  {
    path: 'newad',
    title: 'New ad page',
    component: AdPageComponent,
  },
];
