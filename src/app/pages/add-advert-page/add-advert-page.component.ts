import { Component } from '@angular/core';

import { AdvertFormComponent } from "../../widgets/advert-form/advert-form.component";

@Component({
  selector: 'app-add-advert-page',
  standalone: true,
  imports: [
    AdvertFormComponent
],
  templateUrl: './add-advert-page.component.html',
  styleUrl: './add-advert-page.component.scss',
})
export class AddAdvertPageComponent {

}
