import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  @Input() visible: boolean = false;

  onAuthButtonClick() {
    this.visible = true;
  }
}
