import { Routes } from "@angular/router";
import { AddAdvertPageComponent } from "./add-advert-page.component";

export const addAdvertPageRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AddAdvertPageComponent,
  },
];
