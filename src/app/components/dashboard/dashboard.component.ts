import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  enable = true;
  currentUser: User;
  selected = false;
  sel = false;
  constructor(private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }

  selwe() {
    this.sel = true;
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
