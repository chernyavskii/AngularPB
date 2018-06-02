import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {Agent} from '../../../models/Agent';
import {MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import {AgentService} from "../../../services/agent/agent.service";
import {DialogAgentComponent} from "../../dashboard/agents/dialog-agent/dialog-agent.component";

@Component({
  selector: 'app-admin-agents',
  templateUrl: './admin-agents.component.html',
  styleUrls: ['./admin-agents.component.css']
})
export class AdminAgentsComponent implements OnChanges {

  @Input()
  agents:Agent[] = [];
  selectedAgentForUpdate:Agent;
  selectedAgentsForDeleted: Agent[] = [];
  selectedAgentsForSharedDocuments:Document[] = [];
  
  sharedProp = false;

  displayedColumns = ['configuration', 'firstName', 'lastName', 'middleName', 'unp'];
  dataSource = null;

  constructor(private agentService:AgentService,
              public dialog: MatDialog,
              private snackBar:MatSnackBar) {
  }

  ngOnChanges(changes:SimpleChanges):void {
    this.sharedProp = false;
    this.selectedAgentForUpdate = null;
    this.selectedAgentsForSharedDocuments = [];
    this.dataSource = new MatTableDataSource<Agent>(this.agents);
  }

  updateAgent(agent:Agent) {
    this.sharedProp = false;
    this.selectedAgentsForSharedDocuments = [];
    this.selectedAgentForUpdate = agent;
  }

  sharedDocuments(agent:any) {
    this.sharedProp = true;
    this.selectedAgentForUpdate = null;
    this.selectedAgentsForSharedDocuments = agent.documents;
  }

  onVotedAgentsAdmin(updateDataArray: any) {
    if (updateDataArray === 'exit') {
      this.selectedAgentForUpdate = null;
    } else {
      const result = this.checkId(updateDataArray.id);
      if (result) {
        this.updateDataSource(updateDataArray.id, updateDataArray);
      }
    }
  }

  checkId(id:number):boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }
    return false;
  }

  updateDataSource(id:number, data:Agent) {
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

  deleteAgent(element: Agent) {
    const dialogRef = this.dialog.open(DialogAgentComponent, {
      data: {deleteAgent: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedAgentsForDeleted.push(element);
      }
    });
  }

  deleteArray(updateDataArray: any) {

    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSourceAfterDeleted(updateDataArray[i].id);
      }
    }
    this.selectedAgentsForDeleted = [];
    this.selectedAgentsForSharedDocuments = [];
    this.selectedAgentForUpdate = null;
    this.dataSource = new MatTableDataSource<Agent>(this.agents);
  }

  updateDataSourceAfterDeleted(id:number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data.splice(i,1);
      }
    }
  }

}
