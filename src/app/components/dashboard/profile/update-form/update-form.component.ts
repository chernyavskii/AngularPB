
import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  @Input()
  user = new User();

  constructor(private authService: AuthService,
              private userService: UserService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit() { }


  updateProfile(user: User) {
    this.userService.updateById(user)
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
