import {Agent} from "../../../../models/Agent";
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AgentService} from "../../../../services/agent/agent.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogAgentComponent} from "../../../dashboard/agents/dialog-agent/dialog-agent.component";
import {MatSnackBar, MatDialog} from '@angular/material';

@Component({
  selector: 'app-admin-agents-update',
  templateUrl: './admin-agents-update.component.html',
  styleUrls: ['./admin-agents-update.component.css']
})
export class AdminAgentsUpdateComponent implements OnChanges {

  @Input()
  agent:Agent;
  @Output() onVotedAgentsAdmin = new EventEmitter<any>();
  updateAgentForm:FormGroup;

  constructor(private agentService:AgentService,
              private _formBuilder:FormBuilder,
              public dialog:MatDialog,
              private snackBar:MatSnackBar) {
  }


  ngOnChanges(changes:SimpleChanges):void {
    if(this.agent) {
      this.updateAgentForm = this._formBuilder.group({
        /*
         id: [this.agent.id, Validators.nullValidator],
         */
        firstName: [this.agent.firstName, Validators.required],
        middleName: [this.agent.middleName, Validators.required],
        lastName: [this.agent.lastName, Validators.required],
        unp: [this.agent.unp, Validators.required],
        organization: [this.agent.organization, Validators.required],
        position: [this.agent.position, Validators.required],
        address: [this.agent.address, Validators.required],
        rs: [this.agent.rs, Validators.required],
        ks: [this.agent.ks, Validators.required],
        bank: [this.agent.bank, Validators.required],
        bik: [this.agent.bik, Validators.required],
        phone: [this.agent.phone, Validators.required]
      });
    }
  }

  updateAgent(formValue:FormGroup) {
    const dialogRef = this.dialog.open(DialogAgentComponent, {
      data: {updateAgent: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updateAgent:Agent = {
          id: null,
          firstName: this.updateAgentForm.value.firstName,
          middleName: this.updateAgentForm.value.middleName,
          lastName: this.updateAgentForm.value.lastName,
          address: this.updateAgentForm.value.address,
          bank: this.updateAgentForm.value.bank,
          bik: this.updateAgentForm.value.bik,
          ks: this.updateAgentForm.value.ks,
          organization: this.updateAgentForm.value.organization,
          phone: this.updateAgentForm.value.phone,
          position: this.updateAgentForm.value.position,
          unp: this.updateAgentForm.value.unp,
          rs: this.updateAgentForm.value.rs,
        };
        this.agentService.updateAgent(this.agent.id, updateAgent)
          .then(data => {
            this.onVotedAgentsAdmin.emit(data);
            /*
             this.onLoad = false;
             */
            this.snackBar.open('Обновление контрагента успешно выполнено', 'Закрыть', {
             duration: 3000
             });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }

  closeWindow() {
    this.onVotedAgentsAdmin.emit('exit');
  }

}
