import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';
import { IsEditing } from '../../interfaces/isEditing.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input({ required: true }) filteredList: IItem[] | undefined;
  @Input({ required: true }) isEditing!: IsEditing;
  @Output() isEditingChange = new EventEmitter<IsEditing>();
  @Output('deleteItem') deleteItemEmitter = new EventEmitter<number>();

  isEditingMethod(item: IItem) {
    (document.getElementById('formId') as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    this.isEditingChange.emit({ status: true, item: item });
  }

  handleDeleteClick(id: number) {
    this.deleteItemEmitter.emit(id);
  }
}
