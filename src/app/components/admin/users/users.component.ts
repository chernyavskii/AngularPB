import {AfterViewInit, Component} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/User';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  displayedColumns = ['select', 'username', 'firstName', 'lastName', 'middleName', 'unp', 'role'];

  allUsers: User[];
  selectedUsers: User[];
  selectedUsersForDeleted: User[];

  dataSource = null;
  selection = new SelectionModel<User>(true, []);

  loadData = false;
  allSelect = false;
  createnewprop = false;

  constructor(private userService: UserService) {
    this.loadData = true;
    this.userService.getAllUsers()
      .then(result => {
        this.allUsers = result;
        this.dataSource = new MatTableDataSource<User>(result);
        this.loadData = false;
        console.log(this.dataSource);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngAfterViewInit(): void {
    this.userService.getAllUsers()
      .then(data => {
        if (data) {
          this.allUsers = data;
          this.dataSource = new MatTableDataSource<User>(data);
        }
      })
      .catch(err => {
        this.loadData = false;
        /* this.errorProp = true;
         this.error.code = err.error.code;
         this.error.message = err.error.message;
         this.error.status = err.error.status;*/
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
        this.allSelect = true;
      });
  }


  isSelect(raw: any) {
    this.selection.toggle(raw);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  editElements() {
    this.selectedUsers = this.selection.selected;
  }

  deleteElements() {
    this.selectedUsersForDeleted = this.selection.selected;
  }

  createNew() {
    this.createnewprop = true;
  }

  checkId(id: number): boolean {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        return true;
      }
    }
    return false;
  }

  onVoted(updateDataArray: any) {
    this.selection.clear();
    for (let i = 0; i < updateDataArray.length; i++) {
      this.dataSource.data.forEach(row => {
        if (row.id == updateDataArray[i].id) {
          this.selection.select(row);
        }
      });
    }

    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSource(updateDataArray[i].id, updateDataArray[i]);
      }
    }
  }

  newItem(event: any) {
    const result = typeof event;
    if (result == 'boolean') {
      this.createnewprop = false;
    } else {
      this.allUsers.push(event);
      this.dataSource = new MatTableDataSource<User>(this.allUsers);
    }
  }


  deleteArray(updateDataArray: any) {
    for (let i = 0; i < updateDataArray.length; i++) {
      const result = this.checkId(updateDataArray[i].id);
      if (result) {
        this.updateDataSourceAfterDeleted(updateDataArray[i].id);
      }
    }
    this.selectedUsers = null;
  }

  updateDataSourceAfterDeleted(id: number) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data.splice(i);
      }
    }
    this.selection.clear();
    this.ngAfterViewInit();
  }

  updateDataSource(id: number, data: User) {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (id === this.dataSource.data[i].id) {
        this.dataSource.data[i].firstName = data.firstName;
        this.dataSource.data[i].middleName = data.middleName;
        this.dataSource.data[i].lastName = data.lastName;
        this.dataSource.data[i].organization = data.organization;
        this.dataSource.data[i].unp = data.unp;
        this.dataSource.data[i].position = data.position;
        this.dataSource.data[i].address = data.address;
        this.dataSource.data[i].rs = data.rs;
        this.dataSource.data[i].ks = data.ks;
        this.dataSource.data[i].bank = data.bank;
        this.dataSource.data[i].bik = data.bik;
        this.dataSource.data[i].phone = data.phone;
      }
    }

  }

}
