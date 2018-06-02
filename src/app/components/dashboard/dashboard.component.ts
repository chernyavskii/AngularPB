import {Component, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../../models/User';
import {MatDialog} from '@angular/material';
import {UtilsComponent} from '../utils/utils.component';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  selected = false;
  viewProp = false;

  currentUser: any;
  checkUser = false;
  screenWidth:number;

  @ViewChild('sidenav') sidenav:any;

  animal:string;
  name:string;

  constructor(public dialog:MatDialog,
              private router:Router,
              private cdRef:ChangeDetectorRef,
              private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.roles[0].name === 'ROLE_ADMIN') {
      this.checkUser = true;
    }
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  tested() {
    this.router.navigate(['admin']);
  }

  onSelect() {
    this.selected = true;
  }

  openDialog():void {
    let dialogRef = this.dialog.open(UtilsComponent, {
      width: '500px',
      data: {logout: true}
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result) {
       this.userService.logOut();
     }
    });
  }

  sidenavToggle() {
    this.sidenav.toggle();
    this.viewProp = this.sidenav.opened;
  }
}
