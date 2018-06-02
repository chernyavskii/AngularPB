import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/User';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MatSnackBar, MatDialog} from '@angular/material';
import {UserService} from '../../../../services/user.service';
import {DialogProfileComponent} from "../dialog-profile/dialog-profile.component";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  @Input()
  user = new User();
  changePasswordGroup:FormGroup;
  hide:any;

  constructor(private fb:FormBuilder,
              private snackBar:MatSnackBar,
              private userService:UserService,
              public dialog:MatDialog) {
  }

  ngOnInit() {
    this.changePasswordGroup = this.fb.group({
      current_password: ['', Validators.required],
      passwords: this.fb.group({
        newPassword: ['', Validators.required],
        repeat_new_password: ['', Validators.required]
      }, {validator: this.areEqual})
    });

  }

  areEqual(control:FormControl):ValidationErrors {
    const keys:string[] = Object.keys(control.value);
    for (const i in keys) {
      if (i !== '0' && control.value[keys[+i - 1]] !== control.value[keys[i]]) {
        return {areEqual: true};
      }
    }
  }

  updatePassword() {
    const dialogRef = this.dialog.open(DialogProfileComponent, {
      data: {profile: false}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const passObject = {
          newPassword: this.changePasswordGroup.value.passwords.newPassword,
          oldPassword: this.changePasswordGroup.value.current_password
        };
        this.userService.changePassword(passObject)
          .then(data => {
            if (data) {
              this.snackBar.open('Пароль успешно изменён', 'Закрыть', {
                duration: 3000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
  }
}

