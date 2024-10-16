import { Routes } from "@angular/router";
import { EditAdvertPageComponent } from "./edit-advert-page.component";
import { authGuard } from "core/guards/auth.guard";

export const editAdvertPageRoutes: Routes = [
  {
    path: ':advertId',
    pathMatch: 'full',
    component: EditAdvertPageComponent,
    canActivate: [authGuard],
  },
];
