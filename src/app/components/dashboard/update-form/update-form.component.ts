
import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/User';
import {UserService} from '../../../services/user.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  constructor(private authService: AuthService,
              private userService: UserService) { }

  @Input()
  user: User;

  ngOnInit() { }


  /*updateProfile(user: User) {
      this.userService.updateById(this.authService.getUserId(), user)
        .then(res => { console.log(res); })
        .catch(err => { console.log(err); });
  }*/

}
