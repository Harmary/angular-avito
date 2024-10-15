import { Routes } from "@angular/router";
import { EditAdvertPageComponent } from "./edit-advert-page.component";

export const editAdvertPageRoutes: Routes = [
  {
    path: ':advertId',
    pathMatch: 'full',
    component: EditAdvertPageComponent,
  },
];
