import { Routes } from "@angular/router";
import { AdPageComponent } from "./ad-page.component";

export const adPageRoutes: Routes = [
  {
    path: ':adId',
    pathMatch: 'full',
    component: AdPageComponent,
  },
];
