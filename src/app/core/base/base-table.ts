import {Directive, Input} from '@angular/core';

@Directive({})
export abstract class BaseTable<T> {
  public displayedColumns: Array<string>;
  public itemIdKey: keyof T;

  @Input() items: Array<T>;

  constructor(displayedColumns: Array<string>, itemIdKey: keyof T) {
    this.displayedColumns = displayedColumns;
    this.itemIdKey = itemIdKey;
  }

  trackByFn = (index: number, item: T) => {
    return item[this.itemIdKey];
  }
}
