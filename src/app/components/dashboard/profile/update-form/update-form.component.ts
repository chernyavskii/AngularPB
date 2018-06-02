import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatDialog} from '@angular/material';
import {DialogProfileComponent} from "../dialog-profile/dialog-profile.component";

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  /*@Input()
   user = new User();*/
  user:any;
  firstFormGroup:FormGroup;

  constructor(private userService:UserService,
              private snackBar:MatSnackBar,
              private _formBuilder:FormBuilder,
              public dialog:MatDialog) {
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = currentUser;

    this.firstFormGroup = this._formBuilder.group({
      id: [this.user.id, Validators.required],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
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
    });
  }


  updateProfile(user:User) {
    const dialogRef = this.dialog.open(DialogProfileComponent, {
       data: {profile: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updateUser:any = {
          id: null,
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
        this.userService.updateUser(this.firstFormGroup.value.id, updateUser, this.user.roles[0].name)
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
    });

  }

}
