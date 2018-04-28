import { Component, AfterViewChecked, ChangeDetectorRef  } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {UtilsComponent} from '../utils/utils.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  currentUser: User;
  selected = false;

  screenWidth: number;

  animal: string;
  name: string;

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private cdRef:ChangeDetectorRef) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  onSelect() {
    this.selected = true;
    console.log(this.selected);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(UtilsComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
