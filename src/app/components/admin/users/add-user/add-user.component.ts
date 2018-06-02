import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../models/User';
import {MatSnackBar, MatDialog} from '@angular/material';
import {UserService} from '../../../../services/user.service';
import {typeOfRole} from '../../../../data/data';
import {DialogUserComponent} from "../dialog-user/dialog-user.component";


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addNewUserGroup: FormGroup;

  @Output() newItem = new EventEmitter<User[]>();
  @Input() createnewprop: any;
  @Input() newUserProp: any;
  @Output() createdItem = new EventEmitter<any>();

  typeOfRole = typeOfRole;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
    this.addNewUserGroup = this.fb.group({
      id: ['', Validators.nullValidator],
      username: ['', Validators.required],
      password: ['', Validators.required],
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
      role: ['', Validators.required]
    });
  }

  addNewUser() {
    if (this.addNewUserGroup.status !== 'INVALID') {
      const newUser: any = {
        id: null,
        username: this.addNewUserGroup.value.username,
        password: this.addNewUserGroup.value.password,
        confirmPassword: this.addNewUserGroup.value.password,
        firstName: this.addNewUserGroup.value.firstName,
        middleName: this.addNewUserGroup.value.middleName,
        lastName: this.addNewUserGroup.value.lastName,
        address: this.addNewUserGroup.value.address,
        bank: this.addNewUserGroup.value.bank,
        bik: this.addNewUserGroup.value.bik,
        ks: this.addNewUserGroup.value.ks,
        organization: this.addNewUserGroup.value.organization,
        phone: this.addNewUserGroup.value.phone,
        position: this.addNewUserGroup.value.position,
        unp: this.addNewUserGroup.value.unp,
        rs: this.addNewUserGroup.value.rs,
      };

      const role: string = this.addNewUserGroup.value.role;
      this.userService.addUser(newUser, role)
        .then(data => {
          if (data) {
            const newEmit: any = {
              id: data.id,
              username: this.addNewUserGroup.value.username,
              password: this.addNewUserGroup.value.password,
              firstName: this.addNewUserGroup.value.firstName,
              middleName: this.addNewUserGroup.value.middleName,
              lastName: this.addNewUserGroup.value.lastName,
              address: this.addNewUserGroup.value.address,
              bank: this.addNewUserGroup.value.bank,
              bik: this.addNewUserGroup.value.bik,
              ks: this.addNewUserGroup.value.ks,
              organization: this.addNewUserGroup.value.organization,
              phone: this.addNewUserGroup.value.phone,
              position: this.addNewUserGroup.value.position,
              unp: this.addNewUserGroup.value.unp,
              rs: this.addNewUserGroup.value.rs,
              roles: [{
                id: null,
                name: this.addNewUserGroup.value.role
              }],
              documents: [],
              agents: [],
              drivers: []
            };
            this.newItem.emit(newEmit);
            this.createdItem.emit(newEmit);
            this.snackBar.open('Новый пользователь успешно добавлен', 'Закрыть', {
              duration: 3000
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  ngOnInit() {

  }

  closeWindow() {
    this.createnewprop = false;
    this.newUserProp = false;
    this.newItem.emit(this.createnewprop);
  }

}
