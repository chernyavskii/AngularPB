import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {User} from '../../../../models/User';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {typeOfRole} from '../../../../data/data';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnChanges {
  @Input()
  user:any;
  @Output() onVotedAdmin = new EventEmitter<any>();
  updateUserForm:FormGroup;
  typeOfRole = typeOfRole;

  constructor(private _formBuilder:FormBuilder,
              private userService:UserService) {
  }

  ngOnChanges(changes:SimpleChanges) {
    this.updateUserForm = this._formBuilder.group({
      id: [this.user.id, Validators.nullValidator],
      username: [this.user.username, Validators.nullValidator],
      firstName: [this.user.firstName, Validators.required],
      middleName: [this.user.middleName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      unp: [this.user.unp, Validators.required],
      organization: [this.user.organization, Validators.required],
      position: [this.user.position, Validators.required],
      address: [this.user.address, Validators.required],
      rs: [this.user.rs, Validators.required],
      ks: [this.user.ks, Validators.required],
      bank: [this.user.bank, Validators.required],
      bik: [this.user.bik, Validators.required],
      phone: [this.user.phone, Validators.required],
      role: [this.user.roles[0].name, Validators.required]
    });
  }

  updateUser() {
    const updateUser: any = {
      id: null,
      username: this.user.username,
      firstName: this.updateUserForm.value.firstName,
      middleName: this.updateUserForm.value.middleName,
      lastName: this.updateUserForm.value.lastName,
      address: this.updateUserForm.value.address,
      bank: this.updateUserForm.value.bank,
      bik: this.updateUserForm.value.bik,
      ks: this.updateUserForm.value.ks,
      organization: this.updateUserForm.value.organization,
      phone: this.updateUserForm.value.phone,
      position: this.updateUserForm.value.position,
      unp: this.updateUserForm.value.unp,
      rs: this.updateUserForm.value.rs,
    };

    this.userService.updateUser(this.updateUserForm.value.id, updateUser, this.updateUserForm.value.role)
      .then(data => {
        this.onVotedAdmin.emit(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
