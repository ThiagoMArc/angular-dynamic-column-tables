import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

/**
 * @title Table dynamically changing the columns displayed
 */
@Component({
  selector: 'table-dynamic-columns-example',
  styleUrls: ['table-dynamic-columns-example.css'],
  templateUrl: 'table-dynamic-columns-example.html',
})
export class TableDynamicColumnsExample {
  displayedColumns: string[] = ['name', 'position'];
  data: PeriodicElement[] = ELEMENT_DATA;

  notSelected: string[] = ['weight', 'symbol'];

  selected: string[] = [];

  addColumn() {
    const weightSelected = this.selected.indexOf('weight');
    const symbolSelected = this.selected.indexOf('symbol');

    if (
      this.displayedColumns.indexOf('weight') === -1 &&
      this.displayedColumns.indexOf('symbol') === -1 &&
      weightSelected !== -1 &&
      symbolSelected === -1
    ) {
      this.displayedColumns.splice(1, 0, 'weight');
    } else if (
      this.displayedColumns.indexOf('weight') === -1 &&
      this.displayedColumns.indexOf('symbol') === -1 &&
      weightSelected === -1 &&
      symbolSelected !== -1
    ) {
      this.displayedColumns.splice(1, 0, 'symbol');
    } else if (
      this.displayedColumns.indexOf('weight') !== -1 &&
      this.displayedColumns.indexOf('symbol') === -1 &&
      weightSelected !== -1 &&
      symbolSelected !== -1
    ) {
      this.displayedColumns.splice(2, 0, 'symbol');
    } else if (
      this.displayedColumns.indexOf('weight') === -1 &&
      this.displayedColumns.indexOf('symbol') !== -1 &&
      weightSelected !== -1 &&
      symbolSelected !== -1
    ) {
      this.displayedColumns.splice(2, 0, 'weight');
    }
  }

  removeColumn() {
    const weightNotSelected = this.notSelected.indexOf('weight');
    const symbolNotSelected = this.notSelected.indexOf('symbol');

    if (
      weightNotSelected !== -1 &&
      this.displayedColumns.indexOf('weight') !== -1
    ) {
      const weightToBeRemovedIndex = this.displayedColumns.indexOf('weight');
      this.displayedColumns.splice(weightToBeRemovedIndex, 1);
    } else if (
      symbolNotSelected !== -1 &&
      this.displayedColumns.indexOf('symbol') !== -1
    ) {
      const symbolToBeRemovedIndex = this.displayedColumns.indexOf('symbol');
      this.displayedColumns.splice(symbolToBeRemovedIndex, 1);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let selectedSizeBeforeTransfer = this.selected.length;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.addOrRemoveColumns(selectedSizeBeforeTransfer);
    }
  }

  addOrRemoveColumns(selectedSizeBeforeTransfer: number) {
    if (selectedSizeBeforeTransfer < this.selected.length) {
      this.addColumn();
    } else {
      this.removeColumn();
    }
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
