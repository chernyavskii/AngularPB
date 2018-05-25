import {Component, ChangeDetectorRef, ViewChild} from '@angular/core';
import {User} from '../../models/User';
import {MatDialog} from '@angular/material';
import {UtilsComponent} from '../utils/utils.component';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

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
              private cdRef:ChangeDetectorRef) {
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
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  sidenavToggle() {
    this.sidenav.toggle();
    this.viewProp = this.sidenav.opened;
  }
}
