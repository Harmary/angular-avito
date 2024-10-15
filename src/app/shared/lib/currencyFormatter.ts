import { Pipe, PipeTransform } from '@angular/core';

const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

@Pipe({
  standalone: true,
  name: 'customCurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value?: string): string | null {
    if (value == null) {
      return '';
    }

    return currencyFormatter.format(Number(value));
  }
}

export default currencyFormatter;
