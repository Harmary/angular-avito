import { Component } from '@angular/core';
import { AdvertFormComponent } from "../../widgets/advert-form/advert-form.component";

@Component({
  selector: 'app-edit-advert-page',
  standalone: true,
  imports: [AdvertFormComponent],
  templateUrl: './edit-advert-page.component.html',
  styleUrl: './edit-advert-page.component.scss'
})
export class EditAdvertPageComponent {

}
