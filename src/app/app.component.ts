import { Component } from '@angular/core';
import { IItem } from './interfaces/item.interface';
import { itens } from './data/itens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  listItens: IItem[] = itens;
  filteredList: IItem[] = this.listItens;

  updateFilteredList(list: IItem[]) {
    this.filteredList = list;
  }
}
