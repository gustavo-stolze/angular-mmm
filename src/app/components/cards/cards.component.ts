import { Component, Input } from '@angular/core';
import { IItem } from '../../interfaces/item.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  @Input() listItens!: IItem[];
  spent: number = 0;
  gain: number = 0;

  getSpent() {
    let spent = 0;
    this.listItens.reduce((total, item) => {
      if (!item.expense) return spent;
      return (spent = total + item.value);
    }, 0);
    this.spent = spent;
    return spent;
  }

  getGain() {
    let gain = 0;
    this.listItens.reduce((total, item) => {
      if (item.expense) return gain;
      return (gain = total + item.value);
    }, 0);
    this.gain = gain;
    return gain;
  }

  getBalance() {
    let balance = 0;
    this.listItens.reduce((total, item) => {
      if (item.expense) balance = total - item.value;
      if (!item.expense) balance = total + item.value;
      return balance;
    }, balance);
    return balance;
  }
}
