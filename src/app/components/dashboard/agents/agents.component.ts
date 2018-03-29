import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../../models/User';
import {MatTableDataSource} from '@angular/material';
import {AgentService} from '../../../services/agent/agent.service';
import {Agent} from '../../../models/Agent';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnChanges {
  /*
    displayedColumns = ['select', 'unp', 'firstName', 'lastName', 'middleName', 'organization', 'position', 'address', 'phone', 'bank', 'rs', 'ks', 'bik'];
  */
  displayedColumns = ['select', 'unp', 'firstName', 'lastName', 'middleName', 'options'];

  @Input()
  user = new User();
  allAgents: Agent[];
  selectedAgents: Agent[];

  loadData = false;
  allSelect = false;

  dataSource = null;
  selection = new SelectionModel<Agent>(true, []);


  ////
  agreed = 0;
  disagreed = 0;
  voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];

  constructor(private agentService: AgentService) {
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
        console.log(err);
      });
  }

  ngOnChanges() {
    console.log('misha');
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
    this.selectedAgents = this.selection.selected;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  proverkaId(id: number): boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }
    return false;
  }

  onVoted(updateDataArray: any) {
    /*
        console.log(this.dataSource.data);
    */
    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.proverkaId(updateDataArray[i].id);
      if (result) {
        console.log('win');
        всё правильно, доделай только, чтоб this.dataSource перезаписывалась
      }
    }
    /* for (let i = 0; i < this.dataSource.data.length; i++) {
       /!*if(this.dataSource.data[i].id === updateDataArray[i].id)*!/
       console.log(this.dataSource.data[i].id);
     }*/

    /*
            this.dataSource.data[i].firstName = 'aaaa';
    */
    /* console.log('m');
     console.log(updateDataArray[i].id);
     console.log('a');
     console.l
     og(this.dataSource.data[i].id);*/


  }
}
