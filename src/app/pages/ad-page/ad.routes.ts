import { Routes } from "@angular/router";
import { AdPageComponent } from "./ad-page.component";

export const adPageRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdPageComponent,
  },
];
