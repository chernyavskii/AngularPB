import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Agent} from '../../../models/Agent';
import {MatInput, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-agents',
  templateUrl: './admin-agents.component.html',
  styleUrls: ['./admin-agents.component.css']
})
export class AdminAgentsComponent implements OnInit {

  @Input()
  users: any[] = [];

  displayedColumns = ['select', 'unp', 'firstName', 'lastName', 'middleName'];

  dataSource: any[] = [];
  selections: any[] = [];
  selection = new SelectionModel<Agent>(true, []);

  allSelect = false;

  selectedAgentsForUpdate: Agent[] = [];

  fG: FormGroup;

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.users.length; i++) {
      this.selections.push(new SelectionModel<Agent>(true, []));
      this.dataSource.push(new MatTableDataSource<Agent>(this.users[i].agents));
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
}
