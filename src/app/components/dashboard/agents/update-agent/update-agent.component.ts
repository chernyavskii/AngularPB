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
  changes: SimpleChanges;

  constructor(private fb: FormBuilder,
              private agentService: AgentService) {
    this.updateAgentForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  testFind() {
    for (let i = 0; i < this.agents.length; i++) {
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

  checkId(id: number): boolean {
    for (let i = 0; i < this.changes.agents.previousValue.length; i++) {
      if (id === this.changes.agents.previousValue[i].id) {
        console.log('DS: ');
        return true;
      }
    }
    return false;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changes = changes;
    if (changes.agents.firstChange) {
      this.testFind();
    } else {
      for (let i = 0; i < changes.agents.currentValue.length; i++) {
        const result = this.checkId(changes.agents.currentValue[i].id);
        if (!result) {
          this.items.push(this.fb.group({
            id: changes.agents.currentValue[i].id,
            firstName: changes.agents.currentValue[i].firstName,
            middleName: changes.agents.currentValue[i].middleName,
            lastName: changes.agents.currentValue[i].lastName,
            address: changes.agents.currentValue[i].address,
            bank: changes.agents.currentValue[i].bank,
            bik: changes.agents.currentValue[i].bik,
            ks: changes.agents.currentValue[i].ks,
            organization: changes.agents.currentValue[i].organization,
            phone: changes.agents.currentValue[i].phone,
            position: changes.agents.currentValue[i].position,
            unp: changes.agents.currentValue[i].unp,
            rs: changes.agents.currentValue[i].rs,
          }));
        }
      }
    }
  }

  /*ngOnChanges(changes: SimpleChanges) {
    if (changes.agents.firstChange) {
      for (let i = 0; i < this.agents.length; i++) {
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
    if (!changes.agents.firstChange && changes.agents.currentValue.length === 0) {
      for (let i = 0; i < this.items.length; i++) {
        this.items.removeAt(i);
      }
    }

    if (changes.agents.currentValue && changes.agents.previousValue) {
      for (let i = 0; i < changes.agents.previousValue.length; i++) {
        for (let k = 0; k < changes.agents.currentValue.length; k++) {
          if (changes.agents.currentValue[k].id === changes.agents.previousValue[i].id) {
            console.log(this.items.length);
            for (let z = 0; z < this.items.length; z++) {
              if (this.items.at(z).value.id === changes.agents.currentValue[k].id) {
                console.log('qqq');
                this.items.removeAt(z);
              }
            }

          } else {
            this.items.push(this.fb.group({
              id: changes.agents.currentValue[k].id,
              firstName: changes.agents.currentValue[k].firstName,
              middleName: changes.agents.currentValue[k].middleName,
              lastName: changes.agents.currentValue[k].lastName,
              address: changes.agents.currentValue[k].address,
              bank: changes.agents.currentValue[k].bank,
              bik: changes.agents.currentValue[k].bik,
              ks: changes.agents.currentValue[k].ks,
              organization: changes.agents.currentValue[k].organization,
              phone: changes.agents.currentValue[k].phone,
              position: changes.agents.currentValue[k].position,
              unp: changes.agents.currentValue[k].unp,
              rs: changes.agents.currentValue[k].rs,
            }));
            console.log(changes.agents.currentValue[k]);
          }
        }
      }
    }
    console.log(changes);

  }*/


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
        const array: Agent[] = [formValue.value];
        console.log(array);
        this.onVoted.emit(array);
        this.onLoad = false;
      })
      .catch(err => {
        console.log(err);
      });
  }
}
