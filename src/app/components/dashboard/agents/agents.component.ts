import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import {MatTableDataSource} from '@angular/material';
import {AgentService} from '../../../services/agent/agent.service';
import {Agent} from '../../../models/Agent';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  displayedColumns = ['select', 'unp', 'firstName', 'lastName', 'middleName', 'organization', 'position', 'address', 'phone', 'bank', 'rs', 'ks', 'bik'];

  @Input()
  user = new User();
  allAgents: Agent[];
  dataSource = null;

  constructor(private agentService: AgentService) {
    this.agentService.getAllAgents()
      .then(data => {
        this.allAgents = data;
        this.dataSource = new MatTableDataSource(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
