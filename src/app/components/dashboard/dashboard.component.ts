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

  currentUser: User;
  selected = false;
  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }

  ngOnInit() {
  }

 /* authenticated() {
    return this.authService.getAuth();
  }*/

  onSelect() {
    this.selected = true;
    console.log(this.selected);
  }

  testFunc() {
    this.userService.testFindAll();
  }

}
