import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AgentService} from '../../../../services/agent/agent.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Agent} from '../../../../models/Agent';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {

  addNewAgentGroup: FormGroup;

  @Output() newItem = new EventEmitter<Agent[]>();

  @Input()
  createnewprop: any;

  constructor(private agentService: AgentService,
              private fb: FormBuilder) {
    this.addNewAgentGroup = this.fb.group({
      id: ['', Validators.nullValidator],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      bank: ['', Validators.required],
      bik: ['', Validators.required],
      ks: ['', Validators.required],
      organization: ['', Validators.required],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      unp: ['', Validators.required],
      rs: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  addNewAgent() {
    if (this.addNewAgentGroup.status !== 'INVALID') {
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

  closeWindow() {
    this.createnewprop = false;
    this.newItem.emit(this.createnewprop);
  }

}
