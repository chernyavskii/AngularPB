import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
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
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(6)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(9)]),
      firstName: new FormControl(this.user.firstName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
      middleName: new FormControl(this.user.middleName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
      lastName: new FormControl(this.user.lastName, [Validators.required, Validators.pattern("[А-ЯЁ][а-яё]+([-'][А-ЯЁа-яё]+)?")]),
      unp: new FormControl(this.user.unp, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
      organization: new FormControl(this.user.organization, [Validators.required]),
      position: new FormControl(this.user.position, [Validators.required]),
      address: new FormControl(this.user.address, [Validators.required]),
      rs: new FormControl(this.user.rs, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
      ks: new FormControl(this.user.ks, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(20), Validators.minLength(20)]),
      bank: new FormControl(this.user.bank, [Validators.required]),
      bik: new FormControl(this.user.bik, [Validators.required, Validators.pattern("\\d+"), Validators.maxLength(9), Validators.minLength(9)]),
      phone: new FormControl(this.user.phone, [Validators.required, Validators.pattern("(\\+375 (25|29|33|44) ([0-9]{3}( [0-9]{2}){2}))")]),
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
