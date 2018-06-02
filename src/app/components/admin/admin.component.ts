import {AfterViewInit,OnInit, Component} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatDialog} from '@angular/material';
import {User} from "../../models/User";
import {UserService} from "../../services/user.service";
import {Agent} from "../../models/Agent";
import {Driver} from "../../models/Driver";
import {DialogUserComponent} from "./users/dialog-user/dialog-user.component";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  screenWidth:number;
  menuProp: boolean;

  constructor(private userService: UserService,
              public dialog: MatDialog) {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      /*data: {agentsDeleted: this.selection.selected}*/
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
       /* this.selectedAgentsForDeleted = this.selection.selected;*/
      }
    });
  }


}
