import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user = new User();
  selected = false;
  constructor(private authService: AuthService,
              private userService: UserService) {

  }

  ngOnInit() {
    this.userService.findById(this.authService.getUserId()).then(res => {
      this.user = res;
    });
  }

 /* authenticated() {
    return this.authService.getAuth();
  }*/

  onSelect() {
    this.selected = true;
    console.log(this.selected);
  }

  qqwerty() {
    this.userService.testFindAll();
  }
}
