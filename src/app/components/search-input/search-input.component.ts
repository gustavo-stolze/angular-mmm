import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent {
  inputText: string = '';
  @Output('inputChange') inputChangeEmitter = new EventEmitter<string>();

  inputOnChange(text: string) {
    this.inputChangeEmitter.emit(text);
    this.inputText = text;
  }
}
