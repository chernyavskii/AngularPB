import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';
import {User} from '../../../../models/User';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {

  user = new User();

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.findById(this.authService.getUserId()).then(res => {
      this.user = res;
    });
  }

}
