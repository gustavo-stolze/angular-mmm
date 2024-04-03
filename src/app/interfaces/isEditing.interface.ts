import { IItem } from './item.interface';

export interface IsEditing {
  status: boolean;
  item: IItem | undefined;
}
