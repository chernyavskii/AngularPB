import {OnInit, Component} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource, MatDialog, MatSnackBar} from '@angular/material';
import {Agent} from '../../../models/Agent';
import {Driver} from '../../../models/Driver';
import {Document} from '../../../models/Document';
import {DialogUserComponent} from "./dialog-user/dialog-user.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns = ['configuration', 'username', 'firstName', 'lastName', 'middleName', 'unp', 'role'];
  allUsers:User[] = [];
  dataSource = null;
  arrayOfAgents:Agent[] = [];
  arrayOfDrivers:Driver[] = [];
  arrayOfDocuments: Document[] = [];
  checkButton = false;
  choiceUser:User;
  currentUser:User;
  selectedUsersForDeleted:User[] = [];

  constructor(private userService:UserService,
              public dialog: MatDialog,
              private snackBar:MatSnackBar) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.userService.getAllUsers()
      .then(result => {
        for (let i = 0; i < result.length; i++) {
          if (result[i].id !== this.currentUser.id) {
            this.allUsers.push(result[i]);
            this.dataSource = new MatTableDataSource<any>(this.allUsers);
          }
        }
      }).catch(err => {
      console.log(err);
    })
  }

  ngOnInit() {
  }

  checkAgents(user:any) {
    this.choiceUser = user;
    this.checkButton = true;
    this.arrayOfAgents = user.agents;
    this.arrayOfDrivers = user.drivers;
    this.arrayOfDocuments = user.documents;
  }

  onVotedAdmin(updateDataArray: any) {
    const result = this.checkId(updateDataArray.id);
    if (result) {
      this.updateDataSource(updateDataArray.id, updateDataArray);
    }
  }

  checkId(id:number):boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }
    return false;
  }

  updateDataSource(id:number, data:any) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data[i].firstName = data.firstName;
        this.dataSource.data[i].middleName = data.middleName;
        this.dataSource.data[i].lastName = data.lastName;
        this.dataSource.data[i].unp = data.unp;
        this.dataSource.data[i].organization = data.organization;
        this.dataSource.data[i].position = data.position;
        this.dataSource.data[i].address = data.address;
        this.dataSource.data[i].rs = data.rs;
        this.dataSource.data[i].ks = data.ks;
        this.dataSource.data[i].bank = data.bank;
        this.dataSource.data[i].bik = data.bik;
        this.dataSource.data[i].phone = data.phone;
        this.dataSource.data[i].roles[0].name = data.roles[0].name;

      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: {newUser: true}
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result) {
       this.allUsers.push(result);
       this.dataSource = new MatTableDataSource<any>(this.allUsers);
     }
    });
  }

  deleteUser(element: User){
    const dialogRef = this.dialog.open(DialogUserComponent, {
      data: {deleteUser: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedUsersForDeleted.push(element);
      }
    });
  }

  deleteArray(updateDataArray: any) {
 /*   console.log('mmm');
    console.log(updateDataArray);
    if(updateDataArray) {
      console.log('rw');
    }*/
    for (let i = 0; i < this.selectedUsersForDeleted.length; i++) {
      const result = this.checkId(this.selectedUsersForDeleted[i].id);
      if (result) {
        this.updateDataSourceAfterDeleted(this.selectedUsersForDeleted[i].id);
      }
    }
    this.dataSource = new MatTableDataSource<any>(this.allUsers);

    this.selectedUsersForDeleted = [];
     this.choiceUser = null;
    this.checkButton = false;
     this.arrayOfAgents = [];
     this.arrayOfDrivers = [];
     this.arrayOfDocuments = [];
     this.dataSource = new MatTableDataSource<any>(this.allUsers);
  }

  updateDataSourceAfterDeleted(id:number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data.splice(i,1);
      }
    }
  }
}
