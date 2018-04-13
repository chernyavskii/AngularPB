import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {User} from '../../../../models/User';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {MessageService} from '../../../../services/message/message.service';
import {typeOfRole} from '../../../../data/data';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnChanges {

  @Input()
  users: User[] = [];
  @Output() onVoted = new EventEmitter<User[]>();

  updateUserForm: FormGroup;
  onLoad = false;
  changes: SimpleChanges;
  typeOfRole = typeOfRole;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private messageService: MessageService) {

    this.updateUserForm = this.fb.group({
      items: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.users.currentValue[0].roles);
    this.changes = changes;
    if (changes.users.firstChange) {
      this.pushItem();
    } else {
      if (changes.users.currentValue.length > changes.users.previousValue.length) {
        for (let i = 0; i < changes.users.currentValue.length; i++) {
          const result = this.checkIdCurrent(changes.users.currentValue[i].id);
          if (!result) {
            this.removeItem(this.items);
            this.items.push(this.fb.group({
              id: changes.users.currentValue[i].id,
              username: changes.users.currentValue[i].username,
              password: changes.users.currentValue[i].password,
              firstName: changes.users.currentValue[i].firstName,
              middleName: changes.users.currentValue[i].middleName,
              lastName: changes.users.currentValue[i].lastName,
              address: changes.users.currentValue[i].address,
              bank: changes.users.currentValue[i].bank,
              bik: changes.users.currentValue[i].bik,
              ks: changes.users.currentValue[i].ks,
              organization: changes.users.currentValue[i].organization,
              phone: changes.users.currentValue[i].phone,
              position: changes.users.currentValue[i].position,
              unp: changes.users.currentValue[i].unp,
              rs: changes.users.currentValue[i].rs,
              role: changes.users.currentValue[i].roles[0].name
            }));
          } else {
            this.removeItem(this.items);
            this.items.push(this.fb.group({
              id: changes.users.currentValue[i].id,
              username: changes.users.currentValue[i].username,
              password: changes.users.currentValue[i].password,
              firstName: changes.users.currentValue[i].firstName,
              middleName: changes.users.currentValue[i].middleName,
              lastName: changes.users.currentValue[i].lastName,
              address: changes.users.currentValue[i].address,
              bank: changes.users.currentValue[i].bank,
              bik: changes.users.currentValue[i].bik,
              ks: changes.users.currentValue[i].ks,
              organization: changes.users.currentValue[i].organization,
              phone: changes.users.currentValue[i].phone,
              position: changes.users.currentValue[i].position,
              unp: changes.users.currentValue[i].unp,
              rs: changes.users.currentValue[i].rs,
              role: changes.users.currentValue[i].roles[0].name
            }));
          }
        }
      } else {
        for (let i = 0; i < changes.users.previousValue.length; i++) {
          const result = this.checkIdPrevious(changes.users.previousValue[i].id);
          if (!result) {
            for (let k = 0; k < this.items.length; k++) {
              if (this.items.at(k).value.id === changes.users.previousValue[i].id) {
                this.items.removeAt(k);
              }
            }
          } else {
            for (let k = 0; k < this.items.length; k++) {
              if (this.items.at(k).value.id === changes.users.previousValue[i].id) {
                this.items.removeAt(k);
              }
            }
          }
        }
        this.pushItem();
      }
    }
  }

  pushItem() {
    for (let i = 0; i < this.users.length; i++) {
      this.items.push(this.fb.group({
        id: this.users[i].id,
        username: this.users[i].username,
        password: this.users[i].password,
        firstName: this.users[i].firstName,
        middleName: this.users[i].middleName,
        lastName: this.users[i].lastName,
        address: this.users[i].address,
        bank: this.users[i].bank,
        bik: this.users[i].bik,
        ks: this.users[i].ks,
        organization: this.users[i].organization,
        phone: this.users[i].phone,
        position: this.users[i].position,
        unp: this.users[i].unp,
        rs: this.users[i].rs,
        role: this.changes.users.currentValue[i].roles[0].name
      }));
    }
  }

  checkIdCurrent(id: number): boolean {
    for (let i = 0; i < this.changes.users.previousValue.length; i++) {
      if (id === this.changes.users.previousValue[i].id) {
        return true;
      }
    }
    return false;
  }

  checkIdPrevious(id: number): boolean {
    for (let i = 0; i < this.changes.users.currentValue.length; i++) {
      if (id === this.changes.users.currentValue[i].id) {
        return true;
      }
    }
    return false;
  }

  removeItem(array: FormArray) {
    for (let i = 0; i < array.length; i++) {
      if (this.changes.users.currentValue[i].id !== array.at(i).value.id) {
        array.removeAt(i);
      }
    }
  }

  get items(): FormArray {
    return this.updateUserForm.get('items') as FormArray;
  }

  get role(): FormControl {
    return this.updateUserForm.get('role') as FormControl;
  }

  updateUser(formValue: FormGroup) {
    this.onLoad = true;
    console.log(formValue);
    const updateUser: User = {
      id: null,
      username: formValue.value.username,
      password: formValue.value.password,
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
    this.userService.updateUser(formValue.value.id, updateUser, formValue.value.role)
      .then(data => {
       // const array: User[] = [formValue.value];
      //  this.onVoted.emit(array);
        this.onVoted.emit(this.items.value);
        this.onLoad = false;
        this.messageService.add('test');
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateAllUsers() {
    this.onLoad = true;
    this.userService.updateAllUsers(this.items.value)
      .then(data => {
        this.onVoted.emit(this.items.value);
        this.onLoad = false;
      })
      .catch(err => {
        console.log(err);
      });
  }

  closeWindow(i: number) {
    this.items.removeAt(i);
    this.onVoted.emit(this.items.value);
  }

}
