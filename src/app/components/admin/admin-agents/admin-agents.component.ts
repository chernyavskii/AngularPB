import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Agent} from '../../../models/Agent';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin-agents',
  templateUrl: './admin-agents.component.html',
  styleUrls: ['./admin-agents.component.css']
})
export class AdminAgentsComponent implements OnChanges {

  @Input()
  users: any[] = [];

  displayedColumns = ['select', 'unp', 'firstName', 'lastName', 'middleName'];

  dataSource: any[] = [];
  selections: any[] = [];
  selection = new SelectionModel<Agent>(true, []);

  allSelect = false;

  selectedAgentsForUpdate: Agent[] = [];
  selectedAgentsForDeleted: Agent[] = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.users.firstChange) {
      for (let i = 0; i < this.users.length; i++) {
        this.selections.push(new SelectionModel<Agent>(true, []));
        this.dataSource.push(new MatTableDataSource<Agent>(this.users[i].agents));
      }
    } else {
      for (let i = 0; i < this.dataSource.length; i++) {
        this.dataSource.splice(i);
        this.selections.splice(i);
      }
      for (let i = 0; i < this.users.length; i++) {
        this.selections.push(new SelectionModel<Agent>(true, []));
        this.dataSource.push(new MatTableDataSource<Agent>(this.users[i].agents));
      }
    }
  }

  isSelect(raw: any, index: number) {
    this.selections[index].toggle(raw);
  }

  isAllSelected(index: number, choiceDS: MatTableDataSource<Agent>) {
    const numSelected = this.selections[index].selected.length;
    const numRows = choiceDS.data.length;

    return numSelected === numRows;
  }

  masterToggle(index: number, choiceDS: MatTableDataSource<Agent>) {
    this.isAllSelected(index, choiceDS) ?
      this.selections[index].clear() :
      choiceDS.data.forEach(row => {
        this.selections[index].select(row);
        this.allSelect = true;
      });
  }

  editElements() {
    const arrayAgents: Agent[] = [];

    for (let i = 0; i < this.selections.length; i++) {
      if (this.selections[i].selected.length > 0) {
        for (let k = 0; k < this.selections[i].selected.length; k++) {
          arrayAgents.push(this.selections[i].selected[k]);
        }
      }
    }
    this.selectedAgentsForUpdate = arrayAgents;
  }

  deleteElements() {
    const arrayAgents: Agent[] = [];

    for (let i = 0; i < this.selections.length; i++) {
      if (this.selections[i].selected.length > 0) {
        for (let k = 0; k < this.selections[i].selected.length; k++) {
          arrayAgents.push(this.selections[i].selected[k]);
        }
      }
    }
    this.selectedAgentsForDeleted = arrayAgents;
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

  checkEquals(arr: Agent[], id) {
    for (let i = 0; i < arr.length; i++) {
      if (id == arr[i].id) {
        return true;
      }
    }
    return false;
  }

  onVotedAgentsAdmin(updateDataArray: Agent[]) {
    if (updateDataArray.length === 0) {
      for (let i = 0; i < this.selectedAgentsForUpdate.length; i++) {
        this.selectedAgentsForUpdate.splice(i);
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

  updateDataSource(id: number, data: Agent) {
    this.dataSource.forEach(result => {
      result.data.forEach(raw => {
        if (id === raw.id) {
          raw.firstName = data.firstName;
          raw.middleName = data.middleName;
          raw.lastName = data.lastName;
          raw.unp = data.unp;
          raw.organization = data.organization;
          raw.position = data.position;
          raw.address = data.address;
          raw.rs = data.rs;
          raw.ks = data.ks;
          raw.bank = data.bank;
          raw.bik = data.bik;
          raw.phone = data.phone;
        }
      });
    });
  }

  deleteArray(updateDataArray: any) {
   /* this.selectedAgentsForUpdate.forEach((data, index) => {
      updateDataArray.forEach(updated => {
        if (updated.id == data.id) {
          this.selectedAgentsForUpdate.splice(index, 1);
        }
      });
    });*/
/*
    const arrayAgents: Agent[] = [];
*/

    for (let i = 0; i < this.selectedAgentsForUpdate.length; i++) {
      updateDataArray.forEach(updated => {
        if (updated.id == this.selectedAgentsForUpdate[i].id) {
          this.selectedAgentsForUpdate.splice(i, 1);
        } else {
/*
          arrayAgents.push(this.selectedAgentsForUpdate[i]);
*/
        }
      });
    }
/*
    console.log(arrayAgents);
*/
/*
    this.selectedAgentsForUpdate = arrayAgents;
*/
/*
    this.selectedAgentsForUpdate
*/
    console.log(this.selectedAgentsForUpdate);
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
      this.selections.push(new SelectionModel<Agent>(true, []));
      this.dataSource.push(new MatTableDataSource<Agent>(this.users[i].agents));
    }
  }
}
