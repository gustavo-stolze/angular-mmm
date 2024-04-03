import { Directive } from '@angular/core';

@Directive({
  selector: '[appAddButton]',
  host: { class: 'cf-c-add-button' },
})
export class AddButtonDirective {}
