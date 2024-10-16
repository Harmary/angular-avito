import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string = '', maxLength: number = 40): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength - 3) + '...';
    }
    return value;
  }
}
