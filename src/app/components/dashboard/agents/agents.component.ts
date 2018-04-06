import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/User';
import {MatTableDataSource} from '@angular/material';
import {AgentService} from '../../../services/agent/agent.service';
import {Agent} from '../../../models/Agent';
import {SelectionModel} from '@angular/cdk/collections';
import {Error} from '../../../models/Error';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements AfterViewInit {
  /*
    displayedColumns = ['select', 'unp', 'firstName', 'lastName', 'middleName', 'organization', 'position', 'address', 'phone', 'bank', 'rs', 'ks', 'bik'];
  */
  displayedColumns = ['select', 'unp', 'firstName', 'lastName', 'middleName'/*, 'options'*/];

  @Input()
  user = new User();
  allAgents: Agent[];
  selectedAgents: Agent[];
  selectedAgentsForDeleted: Agent[];
  error = new Error();

  loadData = false;
  allSelect = false;

  dataSource = null;
  selection = new SelectionModel<Agent>(true, []);

  createnewprop = false;
  errorProp = false;


  constructor(private agentService: AgentService,
              private ref: ChangeDetectorRef) {
    this.loadData = true;

    this.agentService.getAllAgents()
      .then(data => {
        if (data) {
          this.loadData = false;
          this.allAgents = data;
          this.dataSource = new MatTableDataSource<Agent>(data);
        }
      })
      .catch(err => {
        this.loadData = false;
        this.errorProp = true;
        this.error.code = err.error.code;
        this.error.message = err.error.message;
        this.error.status = err.error.status;
        console.log(err);
      });
  }

  ngAfterViewInit(): void {
    this.agentService.getAllAgents()
      .then(data => {
        if (data) {
          this.allAgents = data;
          this.dataSource = new MatTableDataSource<Agent>(data);
        }
      })
      .catch(err => {
        this.loadData = false;
        this.errorProp = true;
        this.error.code = err.error.code;
        this.error.message = err.error.message;
        this.error.status = err.error.status;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
        this.allSelect = true;
      });
  }

  isSelect(raw: any) {
    this.selection.toggle(raw);
  }

  editElements() {
    this.selectedAgents = this.selection.selected;
  }

  deleteElements() {
    this.selectedAgentsForDeleted = this.selection.selected;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  checkId(id: number): boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }
    return false;
  }

  testFindddddd(id: number) {
    for (let i = 0; i < this.selectedAgents.length; i++) {
      console.log(this.selectedAgents[i]);
      /*if (id !== this.selectedAgents[i].id) {
        this.selectedAgents.splice(i);
      }*/
    }
  }

  onVoted(updateDataArray: any) {
    /*  console.log('dA');
      console.log(updateDataArray);
      for (let i = 0; i < updateDataArray.length; i++) {
        const result = this.checkId(updateDataArray[i].id);
        console.log(result);
        if (result) {
          this.testFindddddd(updateDataArray[i].id);
        }
      }
      console.log('muc');
      console.log(this.selectedAgents);*/
    ////  НИЖЕ ИДЕТ РАБОЧИЙ КОД, Я ТЕСТИРУЮ ЗАКрЫТИЕ ВКлАДКИ РЕДАКТИРОВАНИЯ АГЕНТА И УМЕНЬШЕНИЕ СЧЕТЧИКА У АГЕНТОВ ( не items )
    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSource(updateDataArray[i].id, updateDataArray[i]);
      }
    }
  }

  newItem(event: any) {
    const result = typeof event;
    if (result == 'boolean') {
      this.createnewprop = false;
    } else {
      this.allAgents.push(event);
      this.dataSource = new MatTableDataSource<Agent>(this.allAgents);
    }
  }

  deleteArray(updateDataArray: any) {
    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSourceAfterDeleted(updateDataArray[i].id);
      }
    }
    this.selectedAgents = null;
  }

  updateDataSourceAfterDeleted(id: number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data.splice(i);
      }
    }
    this.selection.clear();
    this.ngAfterViewInit();
  }

  updateDataSource(id: number, data: Agent) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data[i].firstName = data.firstName;
        this.dataSource.data[i].middleName = data.middleName;
        this.dataSource.data[i].lastName = data.lastName;
        this.dataSource.data[i].unp = data.unp;
        this.dataSource.data[i].organization = data.organization;
        this.dataSource.data[i].position = data.position;
        this.dataSource.data[i].address = data.address;
        this.dataSource.data[i].rs = data.rs;
        this.dataSource.data[i].ks = data.ks;
        this.dataSource.data[i].bank = data.bank;
        this.dataSource.data[i].bik = data.bik;
        this.dataSource.data[i].phone = data.phone;
      }
    }
  }

  createNew() {
    this.createnewprop = true;
  }
}
