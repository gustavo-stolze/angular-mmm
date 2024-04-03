import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
})
export class FormatPricePipe implements PipeTransform {
  transform(value: number): string {
    let response = '-';
    response = value.toFixed(2);
    return `R$ ${response.replace('.', ',')}`;
  }
}
