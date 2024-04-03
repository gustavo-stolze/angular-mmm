import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText',
})
export class ShortenTextPipe implements PipeTransform {
  transform(text: string): string {
    if (text.length <= 12) return text;
    return `${text.substring(0, 12)}...`;
  }
}
