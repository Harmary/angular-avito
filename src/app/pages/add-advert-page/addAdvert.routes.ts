import { Routes } from "@angular/router";
import { AddAdvertPageComponent } from "./add-advert-page.component";
import { authGuard } from "core/guards/auth.guard";

export const addAdvertPageRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AddAdvertPageComponent,
    canActivate: [authGuard],
  },
];
