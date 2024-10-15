import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-async-wrapper',
  standalone: true,
  imports: [],
  templateUrl: './async-wrapper.component.html',
  styleUrl: './async-wrapper.component.scss',
})
export class AsyncWrapperComponent {
  @Input() isLoading: boolean = false;
  @Input() error: string | undefined = undefined;
}
