import {Component, Input, OnInit} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Agent} from '../../../models/Agent';
import {MatTableDataSource} from '@angular/material';

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

  testDS: MatTableDataSource<Agent>;

  constructor() {
  }

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

  editElements(index: number) {
    // this.selectedAgentsForUpdate = this.selections[index].selected;
 /*   this.selections.forEach(select => {
      this.selectedAgentsForUpdate.push(select.selected);
    });*/

   /* for (let i = 0; i < this.selections.length; i++) {
      this.selectedAgentsForUpdate.push(this.selections[i].selected);
    }*/
/* Я ИНДЕКС УБРАЛ, Т.е. КОНКрЕТНОГО ИНДЕКСА selection & DATASOURCE нету, просто все сразу перекидываем на компонент UpdateAgent, но что то пока что не идет
* потому что надо Один массив а тут получается больше чем один*/
    console.log(this.selectedAgentsForUpdate);
  }

  checkId(id: number): boolean {
    /* for (let i = 0; i < this.dataSource.data.length; i++) {
       if (id === this.dataSource.data[i].id) {
         return true;
       }
     }*/
    for (let i = 0; i < this.testDS.data.length; i++) {
      if (id === this.testDS.data[i].id) {
        return true;
      }
    }
    return false;
  }

  updateDataSource(id: number, data: Agent) {
    for (let i = 0; i < this.testDS.data.length; i++) {
      if (id === this.testDS.data[i].id) {
        this.testDS.data[i].firstName = data.firstName;
        this.testDS.data[i].middleName = data.middleName;
        this.testDS.data[i].lastName = data.lastName;
        this.testDS.data[i].unp = data.unp;
        this.testDS.data[i].organization = data.organization;
        this.testDS.data[i].position = data.position;
        this.testDS.data[i].address = data.address;
        this.testDS.data[i].rs = data.rs;
        this.testDS.data[i].ks = data.ks;
        this.testDS.data[i].bank = data.bank;
        this.testDS.data[i].bik = data.bik;
        this.testDS.data[i].phone = data.phone;
      }
    }
  }


  onVotedAgentsAdmin(updateDataArray: any, index: number, choiceDS) {
    this.testDS = choiceDS;
    this.selections[index].clear();
    for (let i = 0; i < updateDataArray.length; i++) {
      choiceDS.data.forEach(row => {
        if (row.id == updateDataArray[i].id) {
          this.selections[index].select(row);
        }
      });
    }
    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSource(updateDataArray[i].id, updateDataArray[i]);
      }
    }
  }
}
