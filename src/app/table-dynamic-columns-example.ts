import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PeriodicElement } from './models/periodic-element';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

/**
 * @title Table dynamically changing the columns displayed
 */
@Component({
  selector: 'table-dynamic-columns-example',
  styleUrls: ['table-dynamic-columns-example.css'],
  templateUrl: 'table-dynamic-columns-example.html',
})
export class TableDynamicColumnsExample implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'position'];
  //data: PeriodicElement[] = ELEMENT_DATA;
  data = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  // notSelected: string[] = ['weight', 'symbol'];
  // selected: string[] = [];

  // notSelected: string[] = [];
  // selected: string[] = ['weight', 'symbol'];

  // notSelected: string[] = ['weight'];
  // selected: string[] = ['symbol'];

  notSelected: string[] = ['symbol'];
  selected: string[] = ['weight'];

  pageSizeOptions = [5, 10, 20];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  ngOnInit(): void {
    this.initializeWeightOrSymbolColumns();
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  initializeWeightOrSymbolColumns() {
    const weightSelected = this.selected.indexOf('weight');
    const symbolSelected = this.selected.indexOf('symbol');
    const firstColumn = this.displayedColumns.indexOf(this.displayedColumns[0]);

    if (
      weightSelected !== -1 &&
      this.displayedColumns.indexOf('weight') === -1
    ) {
      this.displayedColumns.splice(firstColumn + 1, 0, 'weight');
    }

    if (
      symbolSelected !== -1 &&
      this.displayedColumns.indexOf('symbol') === -1
    ) {
      const symbolPosition =
        this.displayedColumns.indexOf('weight') === -1
          ? firstColumn + 1
          : firstColumn + 2;
      this.displayedColumns.splice(symbolPosition, 0, 'symbol');
    }
  }

  addWeightOrSymbolColumns() {
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

  removeWeightOrSymbolColumns() {
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

      this.addOrRemoveWeightOrSymbolColumns(selectedSizeBeforeTransfer);
    }
  }

  addOrRemoveWeightOrSymbolColumns(selectedSizeBeforeTransfer: number) {
    if (selectedSizeBeforeTransfer < this.selected.length) {
      this.addWeightOrSymbolColumns();
    } else {
      this.removeWeightOrSymbolColumns();
    }
  }
}

/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
