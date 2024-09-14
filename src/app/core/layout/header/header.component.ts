import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AuthComponent } from "../../../features/auth/auth.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    AuthComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
}
