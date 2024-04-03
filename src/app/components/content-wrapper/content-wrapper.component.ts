import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { IsEditing } from '../../interfaces/isEditing.interface';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Component({
  selector: 'app-content-wrapper',
  templateUrl: './content-wrapper.component.html',
  styleUrl: './content-wrapper.component.scss',
})
export class ContentWrapperComponent {
  @Input({ required: true }) listItens!: IItem[];
  categoryList: string[] = ['Alimento', 'Lazer', 'Investimentos'];
  @Input({ required: true }) filteredList!: IItem[];
  @Output('filteredListChange') filteredListChangeEmitter = new EventEmitter<
    IItem[]
  >();
  isEditing: IsEditing = { status: false, item: undefined };

  onAddItem(item: IItem) {
    console.log(item);
    this.listItens.push(item);
  }

  onEditItem(item: IItem) {
    let wantedItem = this.listItens.filter((i) => i.id === item.id);
    let index = this.listItens.indexOf(wantedItem[0]);
    this.listItens[index] = { ...item };
  }

  onDeleteItem(id: number) {
    let wantedItem = this.listItens.filter((i) => i.id === id);
    let index = this.listItens.indexOf(wantedItem[0]);
    this.listItens.splice(index, 1);
  }

  onSearchChange(event: string) {
    let changeFilteredList = this.listItens.filter((item) => {
      return (
        item.category.toLowerCase().includes(event.toLowerCase()) ||
        item.value.toString().includes(event.toLowerCase()) ||
        months[item.date.getMonth()]
          .toLowerCase()
          .includes(event.toLocaleLowerCase()) ||
        item.date.getFullYear().toString().includes(event.toLowerCase())
      );
    });
    this.filteredList = changeFilteredList;
    this.filteredListChangeEmitter.emit(changeFilteredList);
  }
}
