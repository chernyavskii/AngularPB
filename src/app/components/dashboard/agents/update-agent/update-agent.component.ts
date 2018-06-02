import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Agent} from '../../../../models/Agent';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AgentService} from '../../../../services/agent/agent.service';
import {MatSnackBar, MatDialog} from '@angular/material';
import {DialogAgentComponent} from "../dialog-agent/dialog-agent.component";

@Component({
  selector: 'app-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.css']
})
export class UpdateAgentComponent implements OnChanges {

  @Input()
  agents:Agent[] = [];

  @Output() onVoted = new EventEmitter<Agent[]>();
  @Output() onVotedAgentsAdmin = new EventEmitter<Agent[]>();

  updateAgentForm:FormGroup;
  onLoad = false;
  changes:SimpleChanges;

  constructor(private fb:FormBuilder,
              private agentService:AgentService,
              private snackBar:MatSnackBar,
              public dialog:MatDialog) {
    this.updateAgentForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  pushItem() {
    for (let i = 0; i < this.agents.length; i++) {
      this.items.push(this.fb.group({
        id: this.agents[i].id,
        firstName: new FormControl(this.agents[i].firstName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
        middleName: new FormControl(this.agents[i].middleName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
        lastName: new FormControl(this.agents[i].lastName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
        address: new FormControl(this.agents[i].address, [Validators.required]),
        bank: new FormControl(this.agents[i].bank, [Validators.required]),
        bik: new FormControl(this.agents[i].bik, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
        ks: new FormControl(this.agents[i].ks, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
        organization: new FormControl(this.agents[i].organization, [Validators.required]),
        phone: new FormControl(this.agents[i].organization, [Validators.required, Validators.pattern("(\\+375 (25|29|33|44) ([0-9]{3}( [0-9]{2}){2}))")]),
        position: new FormControl(this.agents[i].position, [Validators.required]),
        unp: new FormControl(this.agents[i].unp, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
        rs: new FormControl(this.agents[i].rs, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)])
      }));
    }
  }

  checkIdCurrent(id:number):boolean {
    for (let i = 0; i < this.changes.agents.previousValue.length; i++) {
      if (id === this.changes.agents.previousValue[i].id) {
        return true;
      }
    }
    return false;
  }

  checkIdPrevious(id:number):boolean {
    for (let i = 0; i < this.changes.agents.currentValue.length; i++) {
      if (id === this.changes.agents.currentValue[i].id) {
        return true;
      }
    }
    return false;
  }

  removeItem(array:FormArray) {
    for (let i = 0; i < array.length; i++) {
      if (this.changes.agents.currentValue[i].id !== array.at(i).value.id) {
        array.removeAt(i);
      }
    }
  }

  ngOnChanges(changes:SimpleChanges) {
   /* for(let i=0; i< this.updateAgentForm.controls['items'].length; i++){
      console.log(this.updateAgentForm.controls['items'].controls[i]);

    }*/
    this.changes = changes;
    if (changes.agents.firstChange) {
      this.pushItem();
    } else {
      if (changes.agents.currentValue.length > changes.agents.previousValue.length) {
        for (let i = 0; i < changes.agents.currentValue.length; i++) {
          const result = this.checkIdCurrent(changes.agents.currentValue[i].id);
          if (!result) {
            this.removeItem(this.items);
            this.items.push(this.fb.group({
              id: changes.agents.currentValue[i].id,
              firstName: new FormControl(changes.agents.currentValue[i].firstName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
              middleName: new FormControl(changes.agents.currentValue[i].middleName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
              lastName: new FormControl(changes.agents.currentValue[i].lastName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
              address: new FormControl(changes.agents.currentValue[i].address, [Validators.required]),
              bank: new FormControl(changes.agents.currentValue[i].bank, [Validators.required]),
              bik: new FormControl(changes.agents.currentValue[i].bik, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
              ks: new FormControl(changes.agents.currentValue[i].ks, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
              organization: new FormControl(changes.agents.currentValue[i].organization, [Validators.required]),
              phone: new FormControl(changes.agents.currentValue[i].phone, [Validators.required, Validators.pattern("(\\+375 (25|29|33|44) ([0-9]{3}( [0-9]{2}){2}))")]),
              position: new FormControl(changes.agents.currentValue[i].position, [Validators.required]),
              unp: new FormControl(changes.agents.currentValue[i].unp, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
              rs: new FormControl(changes.agents.currentValue[i].rs, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
            }));
          } else {
            this.removeItem(this.items);
            this.items.push(this.fb.group({
              id: changes.agents.currentValue[i].id,
              firstName: new FormControl(changes.agents.currentValue[i].firstName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
              middleName: new FormControl(changes.agents.currentValue[i].middleName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
              lastName: new FormControl(changes.agents.currentValue[i].lastName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
              address: new FormControl(changes.agents.currentValue[i].address, [Validators.required]),
              bank: new FormControl(changes.agents.currentValue[i].bank, [Validators.required]),
              bik: new FormControl(changes.agents.currentValue[i].bik, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
              ks: new FormControl(changes.agents.currentValue[i].ks, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
              organization: new FormControl(changes.agents.currentValue[i].organization, [Validators.required]),
              phone: new FormControl(changes.agents.currentValue[i].phone, [Validators.required, Validators.pattern("(\\+375 (25|29|33|44) ([0-9]{3}( [0-9]{2}){2}))")]),
              position: new FormControl(changes.agents.currentValue[i].position, [Validators.required]),
              unp: new FormControl(changes.agents.currentValue[i].unp, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
              rs: new FormControl(changes.agents.currentValue[i].rs, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
            }));
          }
        }
      } else {
        for (let i = 0; i < changes.agents.previousValue.length; i++) {
          const result = this.checkIdPrevious(changes.agents.previousValue[i].id);
          if (!result) {
            for (let k = 0; k < this.items.length; k++) {
              if (this.items.at(k).value.id === changes.agents.previousValue[i].id) {
                this.items.removeAt(k);
              }
            }
          } else {
            for (let k = 0; k < this.items.length; k++) {
              if (this.items.at(k).value.id === changes.agents.previousValue[i].id) {
                this.items.removeAt(k);
              }
            }
          }
        }
        this.pushItem();
      }
    }
  }

  get items():FormArray {
    return this.updateAgentForm.get('items') as FormArray;
  }

  updateAgent(formValue:FormGroup) {
    const dialogRef = this.dialog.open(DialogAgentComponent, {
      data: {updateAgent: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onLoad = true;
        const updateAgent:Agent = {
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
            this.onVotedAgentsAdmin.emit(this.items.value);
            this.onLoad = false;
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

  updateAllAgents() {
    const dialogRef = this.dialog.open(DialogAgentComponent, {
      data: {updateAllAgents: this.agents}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onLoad = true;
        this.agentService.updateAllAgents(this.items.value)
          .then(data => {
            this.onVoted.emit(this.items.value);
            this.onVotedAgentsAdmin.emit(this.items.value)
            this.onLoad = false;
            this.snackBar.open('Обновление выбранных контрагентов успешно выполнено', 'Закрыть', {
              duration: 3000
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    });

  }

  closeWindow(i:number) {
    this.items.removeAt(i);
    this.onVoted.emit(this.items.value);
    this.onVotedAgentsAdmin.emit(this.items.value);
  }

  tested(element: any) {
    console.log(element);
  }
}
