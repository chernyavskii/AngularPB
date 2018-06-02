import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AgentService} from '../../../../services/agent/agent.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Agent} from '../../../../models/Agent';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {

  addNewAgentGroup: FormGroup;

  @Output() newItem = new EventEmitter<Agent[]>();
  @Output() newAgentFromDocuments = new EventEmitter<Agent[]>();
  @Input()
  createnewprop: any;

  @Input()
  newAgentProp: any;

  constructor(private agentService: AgentService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    this.addNewAgentGroup = this.fb.group({
      id: ['', Validators.nullValidator],
      firstName: new FormControl('', [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
      middleName: new FormControl('', [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
      lastName: new FormControl('', [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
      address: new FormControl('', [Validators.required]),
      bank: new FormControl('', [Validators.required]),
      bik: new FormControl('', [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
      ks: new FormControl('', [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
      organization: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern("(\\+375 (25|29|33|44) ([0-9]{3}( [0-9]{2}){2}))")]),
      position: new FormControl('', [Validators.required]),
      unp: new FormControl('', [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
      rs: new FormControl('', [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
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
          if (data) {
            this.newItem.emit(data);
            this.newAgentFromDocuments.emit(data);
            this.snackBar.open('Новый контрагент успешно добавлен', 'Закрыть', {
              duration: 3000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  closeWindow() {
    this.createnewprop = false;
    this.newAgentProp = false;
    this.newItem.emit(this.createnewprop);
    this.newAgentFromDocuments.emit(this.newAgentProp);
  }

}
