import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { IItem } from '../../interfaces/item.interface';
import { IsEditing } from '../../interfaces/isEditing.interface';
import { getZeroPrefix } from '../../utils/getZeroPrefix';
import { genKey } from '../../utils/genKey';
import { removeZeroPrefix } from '../../utils/removeZeroPrefix';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnChanges {
  @ViewChild('myModal') dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('myForm') form!: NgForm;
  @Input() categoryList: string[] | undefined;
  @Output('addItem') addItemEmitter = new EventEmitter<IItem>();
  @Output('editItem') editItemEmitter = new EventEmitter<IItem>();
  @Input({ required: true }) isEditing!: IsEditing;
  @Output('isEditingChange') isEditingEmitter = new EventEmitter<IsEditing>();

  expenseValue: string | undefined;
  categoryText: string = '';
  selectedCategory: string = '';
  dateValue: string = '';
  value: number = 0;
  // 2024-04-10

  isEditingMethod(value: boolean) {
    this.isEditing.status = value;
    this.isEditingEmitter.emit({ status: value, item: undefined });
    this.form.reset();
  }

  ngOnChanges() {
    if (!this.isEditing.status || this.isEditing.item === undefined) return;

    const { item } = this.isEditing;

    let categoryIndex = Number(this.categoryList!.indexOf(item.category) + 1);

    this.expenseValue = item.expense ? 'expense' : '!expense';
    this.selectedCategory = categoryIndex.toString();
    this.dateValue = `${item.date.getFullYear()}-${getZeroPrefix(
      item.date.getMonth() + 1
    )}-${getZeroPrefix(item.date.getDate())}`;
    this.value = item.value;
  }

  saveEdit() {
    if (!this.isEditing.item) return;
    let [year, month, day] = this.dateValue.split('-');
    let formatedDate = `${year}-${removeZeroPrefix(
      Number(month)
    )}-${removeZeroPrefix(Number(day))}`;
    this.editItemEmitter.emit({
      expense: this.expenseValue === 'expense' ? true : false,
      category: this.categoryList![Number(this.selectedCategory) - 1],
      date: new Date(formatedDate),
      value: this.value,
      id: this.isEditing.item.id,
    });
    this.isEditing.item = undefined;
    this.form.reset();
    this.isEditingEmitter.emit({ status: false, item: undefined });
  }

  addItem() {
    if (!this.categoryList || !this.expenseValue) return;
    let [year, month, day] = this.dateValue.split('-');
    let formatedDate = `${year}-${removeZeroPrefix(
      Number(month)
    )}-${removeZeroPrefix(Number(day))}`;
    let item: IItem = {
      category: this.categoryList[Number(this.selectedCategory) - 1],
      expense: this.expenseValue === 'expense' ? true : false,
      date: new Date(formatedDate),
      value: this.value,
      id: genKey(),
    };
    this.addItemEmitter.emit(item);
    this.form.reset();
  }

  onSelectChange(event: string) {
    if (event === '0') this.openModal();
    this.selectedCategory = event;
  }

  openModal() {
    this.dialog.nativeElement.showModal();
  }

  closeModal() {
    this.selectedCategory = '';
    this.categoryText = '';
  }

  addCategory() {
    this.categoryList?.push(this.categoryText);
  }

  deleteCategory(category: string) {
    let index = this.categoryList!.indexOf(category);
    this.categoryList?.splice(index, 1);
  }

  handleKeysSubmitForm(event: KeyboardEvent) {
    // prevent the user submit form by pressing enter ( would conflit with edit )
    return event.key !== 'Enter';
  }
}

