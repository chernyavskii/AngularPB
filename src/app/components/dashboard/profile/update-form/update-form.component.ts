import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  @Input()
  user = new User();
  firstFormGroup: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      id: this.user.id,
      username: this.user.username,
      password: this.user.password,
      firstName: this.user.firstName,
      middleName: this.user.middleName,
      lastName: this.user.lastName,
      unp: this.user.unp,
      organization: this.user.organization,
      position: this.user.position,
      address: this.user.address,
      rs: this.user.rs,
      ks: this.user.ks,
      bank: this.user.bank,
      bik: this.user.bik,
      phone: this.user.phone,
    });
  }


  updateProfile(user: User) {
    const updateUser: User = {
      id: this.firstFormGroup.value.id,
      username: this.firstFormGroup.value.username,
      password: this.firstFormGroup.value.password,
      firstName: this.firstFormGroup.value.firstName,
      middleName: this.firstFormGroup.value.middleName,
      lastName: this.firstFormGroup.value.lastName,
      unp: this.firstFormGroup.value.unp,
      organization: this.firstFormGroup.value.organization,
      position: this.firstFormGroup.value.position,
      address: this.firstFormGroup.value.address,
      rs: this.firstFormGroup.value.rs,
      ks: this.firstFormGroup.value.ks,
      bank: this.firstFormGroup.value.bank,
      bik: this.firstFormGroup.value.bik,
      phone: this.firstFormGroup.value.phone,
    };
    this.userService.updateById(updateUser)
      .then(res => {
        if (res) {
          this.snackBar.open('Профиль успешно изменён', 'Закрыть', {
            duration: 3000
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
