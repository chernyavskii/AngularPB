import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Driver} from '../../../models/Driver';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-drivers',
  templateUrl: './admin-drivers.component.html',
  styleUrls: ['./admin-drivers.component.css']
})
export class AdminDriversComponent implements OnChanges {


  @Input()
  users: any[] = [];

  displayedColumns = ['select', 'carNumber', 'firstName', 'lastName', 'middleName'];

  dataSource: any[] = [];
  selections: any[] = [];
  selection = new SelectionModel<Driver>(true, []);

  allSelect = false;

  selectedDriversForUpdate: Driver[] = [];
  selectedDriversForDeleted: Driver[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.users.firstChange) {
      for (let i = 0; i < this.users.length; i++) {
        this.selections.push(new SelectionModel<Driver>(true, []));
        this.dataSource.push(new MatTableDataSource<Driver>(this.users[i].drivers));
      }
    } else {
      for (let i = 0; i < this.dataSource.length; i++) {
        this.dataSource.splice(i);
        this.selections.splice(i);
      }
      for (let i = 0; i < this.users.length; i++) {
        this.selections.push(new SelectionModel<Driver>(true, []));
        this.dataSource.push(new MatTableDataSource<Driver>(this.users[i].drivers));
      }
    }
  }

  isSelect(raw: any, index: number) {
    this.selections[index].toggle(raw);
  }

  isAllSelected(index: number, choiceDS: MatTableDataSource<Driver>) {
    const numSelected = this.selections[index].selected.length;
    const numRows = choiceDS.data.length;

    return numSelected === numRows;
  }

  masterToggle(index: number, choiceDS: MatTableDataSource<Driver>) {
    this.isAllSelected(index, choiceDS) ?
      this.selections[index].clear() :
      choiceDS.data.forEach(row => {
        this.selections[index].select(row);
        this.allSelect = true;
      });
  }

  editElements() {
    const arrayDrivers: Driver[] = [];

    for (let i = 0; i < this.selections.length; i++) {
      if (this.selections[i].selected.length > 0) {
        for (let k = 0; k < this.selections[i].selected.length; k++) {
          arrayDrivers.push(this.selections[i].selected[k]);
        }
      }
    }
    this.selectedDriversForUpdate = arrayDrivers;
  }

  deleteElements() {
    const arrayDrivers: Driver[] = [];

    for (let i = 0; i < this.selections.length; i++) {
      if (this.selections[i].selected.length > 0) {
        for (let k = 0; k < this.selections[i].selected.length; k++) {
          arrayDrivers.push(this.selections[i].selected[k]);
        }
      }
    }
    this.selectedDriversForDeleted = arrayDrivers;
  }

  checkId(id: number): boolean {
    for (let i = 0; i < this.dataSource.length; i++) {
      for (let k = 0; k < this.dataSource[i].data.length; k++) {
        if (id === this.dataSource[i].data[k].id) {
          return true;
        }
      }
    }
    return false;
  }

  checkEquals(arr: Driver[], id) {
    for (let i = 0; i < arr.length; i++) {
      if (id == arr[i].id) {
        return true;
      }
    }
    return false;
  }

  onVotedDriversAdmin(updateDataArray: Driver[]) {
    if (updateDataArray.length === 0) {
      for (let i = 0; i < this.selectedDriversForUpdate.length; i++) {
        this.selectedDriversForUpdate.splice(i);
      }
    }
    this.selections.forEach(select => {
      select.selected.forEach(sel => {
        const result = this.checkEquals(updateDataArray, sel.id);
        if (!result) {
          select.deselect(sel);
        }
      });
    });

    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSource(updateDataArray[i].id, updateDataArray[i]);
      }
    }
  }

  updateDataSource(id: number, data: Driver) {
    this.dataSource.forEach(result => {
      result.data.forEach(raw => {
        if (id === raw.id) {
          raw.firstName = data.firstName;
          raw.middleName = data.middleName;
          raw.lastName = data.lastName;
          raw.carModel = data.carModel;
          raw.carNumber = data.carNumber;
          raw.trailerModel = data.trailerModel;
          raw.trailerNumber = data.trailerNumber;
        }
      });
    });
  }

  deleteArray(updateDataArray: any) {
    /*for (let i = 0; i < this.selectedDriversForUpdate.length; i++) {
      updateDataArray.forEach(updated => {
        if (updated.id == this.selectedDriversForUpdate[i].id) {
          this.selectedDriversForUpdate.splice(i, 1);
        }
      });
    }*/
    /* выше код работает, выделенные к редактированию не удаляются, а остаются, но нету селекта после удаления других */
    /*Выше код тестинруется, когда выбрал несколько агентов - нажал редактировать - а потом удалить, они должны тоже удалиться*/

    for (let i = 0; i < updateDataArray.length; i++) {
      for (let j = 0; j < this.dataSource.length; j++) {
        for (let k = 0; k < this.dataSource[j].data.length; k++) {
          if (this.dataSource[j].data[k].id === updateDataArray[i].id) {
            this.dataSource[j].data.splice(k, 1);
          }
        }
      }
    }
    for (let i = 0; i < this.dataSource.length; i++) {
      this.dataSource.splice(i);
      this.selections.splice(i);
    }
    for (let i = 0; i < this.users.length; i++) {
      this.selections.push(new SelectionModel<Driver>(true, []));
      this.dataSource.push(new MatTableDataSource<Driver>(this.users[i].drivers));
    }
  }

}
