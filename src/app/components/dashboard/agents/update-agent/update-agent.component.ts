import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Agent} from '../../../../models/Agent';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {AgentService} from '../../../../services/agent/agent.service';

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent implements OnChanges {

  @Input()
  agents: Agent[] = [];

  @Output() onVoted = new EventEmitter<Agent[]>();

  updateAgentForm: FormGroup;
  onLoad = false;

  ///
  voted = false;


  constructor(private fb: FormBuilder,
              private agentService: AgentService) {
    this.updateAgentForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.items.length > 0) {
      this.updateAgentForm.removeControl('items');
      this.updateAgentForm.addControl('items', new FormArray([]));
    }
    for (let i = 0; i < changes.agents.currentValue.length; i++) {
      this.items.push(this.fb.group({
        id: this.agents[i].id,
        firstName: this.agents[i].firstName,
        middleName: this.agents[i].middleName,
        lastName: this.agents[i].lastName,
        address: this.agents[i].address,
        bank: this.agents[i].bank,
        bik: this.agents[i].bik,
        ks: this.agents[i].ks,
        organization: this.agents[i].organization,
        phone: this.agents[i].phone,
        position: this.agents[i].position,
        unp: this.agents[i].unp,
        rs: this.agents[i].rs,
      }));
    }
  }

  get items(): FormArray {
    return this.updateAgentForm.get('items') as FormArray;
  }

  updateAgent(formValue: FormGroup) {
    this.onLoad = true;
    const updateAgent: Agent = {
      id: null,
      firstName: formValue.value.firstName,
      middleName: formValue.value.middleName,
      lastName: formValue.value.lastName,
      address: formValue.value.address,
      bank: formValue.value.bank,
      bik: formValue.value.bik,
      ks: formValue.value.ks,
      organization: formValue.value.organization,
      phone: formValue.value.phone,
      position: formValue.value.position,
      unp: formValue.value.unp,
      rs: formValue.value.rs,
    };
    this.agentService.updateAgent(formValue.value.id, updateAgent)
      .then(data => {
        this.onVoted.emit(this.items.value);
        this.onLoad = false;
      })
      .catch(err => {
        console.log(err);
      });
  }


 /* vote(agreed: boolean) {
    this.onVoted.emit(agreed);
    this.voted = true;
  }*/
}
