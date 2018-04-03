import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AgentService} from '../../../../services/agent/agent.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Agent} from '../../../../models/Agent';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {

  addNewAgentGroup: FormGroup;

  @Output() newItem = new EventEmitter<Agent[]>();

  constructor(private agentService: AgentService,
              private fb: FormBuilder) {
    //// required
    this.addNewAgentGroup = this.fb.group({
      id: '',
      firstName: '',
      middleName: '',
      lastName: '',
      address: '',
      bank: '',
      bik: '',
      ks: '',
      organization: '',
      phone: '',
      position: '',
      unp: '',
      rs: '',
    });
  }

  ngOnInit() {
  }

  testFubn() {
    const newAgent: Agent = {
      id: null,
      firstName: this.addNewAgentGroup.value.firstName,
      middleName: this.addNewAgentGroup.value.middleName,
      lastName: this.addNewAgentGroup.value.lastName,
      address: this.addNewAgentGroup.value.address,
      bank: this.addNewAgentGroup.value.bank,
      bik: this.addNewAgentGroup.value.bik,
      ks: this.addNewAgentGroup.value.ks,
      organization: this.addNewAgentGroup.value.organization,
      phone: this.addNewAgentGroup.value.phone,
      position: this.addNewAgentGroup.value.position,
      unp: this.addNewAgentGroup.value.unp,
      rs: this.addNewAgentGroup.value.rs,
    };
    this.agentService.addAgent(newAgent)
      .then(data => {
        this.newItem.emit(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
